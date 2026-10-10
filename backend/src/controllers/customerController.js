import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import Appointment from '../models/Appointment.js';

// Sync / ensure customers exist from real appointments
export const syncCustomersFromAppointments = async () => {
  if (mongoose.connection.readyState !== 1) return;
  try {
    const appointments = await Appointment.find();
    for (const apt of appointments) {
      const name = apt.patient?.name;
      const phone = apt.patient?.phone;
      if (!name || !phone) continue;

      const cleanPhone = phone.replace(/\D/g, '');
      const existing = await Customer.findOne({
        $or: [
          { mobile: phone },
          { mobile: { $regex: cleanPhone ? cleanPhone.slice(-10) : 'none' } },
        ],
      });

      if (!existing) {
        await Customer.create({
          name,
          mobile: phone,
          email: apt.patient?.email || '',
          source: apt.source || 'Website',
          status: 'Active',
          city: 'Chennai',
          notes: `Appointment: ${apt.treatmentName} on ${apt.date}`,
          totalVisits: 1,
          lastVisit: apt.date,
        });
      }
    }
  } catch (err) {
    console.warn('Customer auto-sync note:', err.message);
  }
};

export const getCustomers = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await syncCustomersFromAppointments();
      const customers = await Customer.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: customers.length, data: customers });
    } else {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, mobile, email, city, source, status, notes } = req.body;
    if (!name || !mobile) {
      return res.status(400).json({ success: false, message: 'Name and mobile are required.' });
    }

    if (mongoose.connection.readyState === 1) {
      const customer = await Customer.create({
        name: name.trim(),
        mobile: mobile.trim(),
        email: email ? email.trim() : '',
        city: city || 'Chennai',
        source: source || 'Direct Walk-in',
        status: status || 'Active',
        notes: notes || '',
        totalVisits: 1,
        lastVisit: new Date().toISOString().split('T')[0],
      });
      return res.status(201).json({ success: true, data: customer });
    } else {
      return res.status(500).json({ success: false, message: 'Database disconnected' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
      if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
      return res.status(200).json({ success: true, data: customer });
    } else {
      return res.status(500).json({ success: false, message: 'Database disconnected' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const customer = await Customer.findByIdAndDelete(id);
      if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
      return res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Database disconnected' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
