import dns from 'node:dns';

// Configure public DNS resolvers for reliable MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if unsupported
}

import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load .env
dotenv.config();

// Connect Database (MongoDB Atlas)
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🌿 Ortho Neuro Care & Ayurvedic ERP API running on http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 API Documentation: http://localhost:${PORT}/\n`);
});
