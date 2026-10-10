import mongoose from 'mongoose';
import dns from 'node:dns';
import Treatment from '../models/Treatment.js';
import Doctor from '../models/Doctor.js';
import Review from '../models/Review.js';
import { initialTreatments, initialDoctors } from '../data/seedData.js';

export const connectDB = async () => {
  try {
    // Set reliable public DNS servers for MongoDB Atlas SRV record lookups
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    } catch (dnsErr) {
      // Ignore if not supported in environment
    }

    const mongoUri =
      process.env.MONGO_URI ||
      'mongodb+srv://abrahamstmarys2a01_db_user:ortho123@cluster0.5bhmffy.mongodb.net/ortho_neuro_care?retryWrites=true&w=majority&appName=Cluster0';

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} | DB: ${conn.connection.name}`);

    // Seed default treatments if database collection is empty
    const treatmentCount = await Treatment.countDocuments();
    if (treatmentCount === 0) {
      await Treatment.insertMany(initialTreatments);
      console.log(`🌿 Initialized ${initialTreatments.length} Ayurvedic treatments in MongoDB.`);
    }

    // Seed default doctors if database collection is empty
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0) {
      await Doctor.insertMany(initialDoctors);
      console.log(`👨‍⚕️ Initialized ${initialDoctors.length} doctors & therapists in MongoDB.`);
    }

    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB connection notice: ${error.message}`);
    console.warn(`ℹ️  Backend is running in resilient fallback mode. Please verify .env MONGO_URI.`);
    return false;
  }
};
