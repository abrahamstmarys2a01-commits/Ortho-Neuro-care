import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';

// Default standard slots if doctor schedule is standard
const defaultDaySlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM',
];

// @desc    Get live available time slots for a given date and doctor
// @route   GET /api/slots?date=YYYY-MM-DD&doctorId=...
// @access  Public
export const getAvailableSlots = async (req, res) => {
  try {
    const { date, doctorId } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: 'Please provide a date query parameter (YYYY-MM-DD)' });
    }

    let bookedSlots = [];

    if (mongoose.connection.readyState === 1) {
      const filter = { date, status: { $nin: ['Cancelled'] } };
      if (doctorId) filter.doctorId = doctorId;
      const appointments = await Appointment.find(filter).select('timeSlot');
      bookedSlots = appointments.map((a) => a.timeSlot);
    }

    // Map through slots to mark available / booked status
    const slots = defaultDaySlots.map((slot) => ({
      time: slot,
      isAvailable: !bookedSlots.includes(slot),
    }));

    return res.status(200).json({
      success: true,
      date,
      totalSlots: slots.length,
      availableCount: slots.filter((s) => s.isAvailable).length,
      slots,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
