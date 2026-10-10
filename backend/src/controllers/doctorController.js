import mongoose from 'mongoose';
import Doctor from '../models/Doctor.js';
import { initialDoctors } from '../data/seedData.js';

let fallbackDoctors = [...initialDoctors.map((d, idx) => ({ ...d, _id: 'doc_' + (idx + 1) }))];

// @desc    Get all doctors / therapists
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res) => {
  try {
    const { active, gender, role } = req.query;
    const filter = {};
    if (active !== undefined) filter.isActive = active === 'true';
    if (gender) filter.gender = gender;
    if (role) filter.role = role;

    if (mongoose.connection.readyState === 1) {
      let doctors = await Doctor.find(filter).sort({ name: 1 });
      if (doctors.length === 0) {
        await Doctor.insertMany(initialDoctors);
        doctors = await Doctor.find(filter).sort({ name: 1 });
      }
      return res.status(200).json({ success: true, count: doctors.length, data: doctors });
    } else {
      let data = fallbackDoctors;
      if (active === 'true') data = data.filter((d) => d.isActive);
      if (gender) data = data.filter((d) => d.gender === gender || d.gender === 'Any');
      if (role) data = data.filter((d) => d.role === role);
      return res.status(200).json({ success: true, count: data.length, data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new doctor/therapist profile (from ERP Admin)
// @route   POST /api/doctors
// @access  Admin / ERP
export const createDoctor = async (req, res) => {
  try {
    const { name, role, specialization, gender, availableDays, workingHours } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Doctor/Therapist name is required' });
    }

    if (mongoose.connection.readyState === 1) {
      const doc = await Doctor.create(req.body);
      return res.status(201).json({ success: true, message: 'Doctor profile created', data: doc });
    } else {
      const newDoc = {
        _id: 'doc_' + Date.now(),
        name,
        role: role || 'Ayurvedic Specialist',
        specialization: specialization || 'General Therapy',
        gender: gender || 'Any',
        availableDays: availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        workingHours: workingHours || { start: '09:00', end: '18:00' },
        isActive: true,
      };
      fallbackDoctors.push(newDoc);
      return res.status(201).json({ success: true, message: 'Doctor profile created (Session storage)', data: newDoc });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
