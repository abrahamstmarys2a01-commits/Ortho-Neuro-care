import mongoose from 'mongoose';
import Treatment from '../models/Treatment.js';
import { initialTreatments } from '../data/seedData.js';

let fallbackTreatments = [...initialTreatments.map((t, idx) => ({ ...t, _id: 'treat_' + (idx + 1) }))];

// @desc    Get all active treatments
// @route   GET /api/treatments
// @access  Public
export const getTreatments = async (req, res) => {
  try {
    const { category, active } = req.query;
    const filter = {};
    if (active !== undefined) filter.isActive = active === 'true';
    if (category) filter.category = category;

    if (mongoose.connection.readyState === 1) {
      let treatments = await Treatment.find(filter).sort({ title: 1 });
      // If DB is empty, auto-seed
      if (treatments.length === 0) {
        await Treatment.insertMany(initialTreatments);
        treatments = await Treatment.find(filter).sort({ title: 1 });
      }
      return res.status(200).json({ success: true, count: treatments.length, data: treatments });
    } else {
      let data = fallbackTreatments;
      if (active === 'true') data = data.filter((t) => t.isActive);
      if (category) data = data.filter((t) => t.category === category);
      return res.status(200).json({ success: true, count: data.length, data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new treatment (from ERP Admin)
// @route   POST /api/treatments
// @access  Admin / ERP
export const createTreatment = async (req, res) => {
  try {
    const { title, category, durationMinutes, price, description, benefits } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Treatment title is required' });
    }

    if (mongoose.connection.readyState === 1) {
      const treatment = await Treatment.create(req.body);
      return res.status(201).json({ success: true, message: 'Treatment created successfully', data: treatment });
    } else {
      const newTreatment = {
        _id: 'treat_' + Date.now(),
        title,
        category: category || 'Ayurveda',
        durationMinutes: Number(durationMinutes) || 60,
        price: Number(price) || 0,
        description: description || '',
        benefits: benefits || [],
        isActive: true,
      };
      fallbackTreatments.push(newTreatment);
      return res.status(201).json({ success: true, message: 'Treatment created (Session storage)', data: newTreatment });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
