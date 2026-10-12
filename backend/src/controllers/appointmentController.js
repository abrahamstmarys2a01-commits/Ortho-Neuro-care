import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Customer from '../models/Customer.js';

let fallbackAppointments = [];

const isValidObjectId = (id) => id && mongoose.Types.ObjectId.isValid(id) && typeof id === 'string' && id.length === 24;

// @desc    Book a new appointment (from Website or ERP)
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      treatment,
      treatmentId,
      therapist,
      doctorId,
      date,
      time,
      timeSlot,
      message,
      source,
      price,
    } = req.body;

    const patientName = name || req.body.patient?.name;
    const patientPhone = phone || req.body.patient?.phone;
    const patientEmail = email || req.body.patient?.email || '';
    const treatmentName = treatment || req.body.treatmentName;
    const selectedTime = time || timeSlot;
    const aptPrice = Number(price) || 1500;
    const cleanPhone = (patientPhone || '').replace(/\D/g, '').slice(-10);

    if (!patientName || !patientPhone || !treatmentName || !date || !selectedTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, phone, treatment, date, and time.',
      });
    }

    const patientCity = req.body.city || req.body.patient?.city || 'Chennai';

    if (mongoose.connection.readyState === 1) {
      // Check if duplicate appointment already exists for this patient, treatment, and date
      const existingApt = await Appointment.findOne({
        $or: [
          { 'patient.phone': patientPhone },
          ...(cleanPhone ? [{ 'patient.phone': { $regex: cleanPhone } }] : [])
        ],
        treatmentName,
        date,
        status: { $ne: 'Cancelled' }
      });

      if (existingApt) {
        return res.status(200).json({
          success: true,
          isDuplicate: true,
          message: `Appointment is already booked (#${existingApt.appointmentCode}).`,
          appointmentCode: existingApt.appointmentCode,
          data: existingApt,
        });
      }

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const appointmentCode = `APT-${new Date().getFullYear()}-${randomSuffix}`;

      const appointmentPayload = {
        appointmentCode,
        patient: {
          name: patientName,
          phone: cleanPhone || patientPhone,
          email: patientEmail,
          city: patientCity,
        },
        treatmentId: isValidObjectId(treatmentId) ? treatmentId : undefined,
        treatmentName,
        doctorId: isValidObjectId(doctorId) ? doctorId : undefined,
        doctorName: therapist || 'Any Therapist',
        date,
        timeSlot: selectedTime,
        price: aptPrice,
        message: message || '',
        status: 'Pending',
        source: source || 'Website',
        erpSyncStatus: 'Synced',
      };

      const appointment = await Appointment.create(appointmentPayload);

      // Auto-sync customer to ERP Customers list uniquely
      try {
        await Customer.findOneAndUpdate(
          {
            $or: [
              { mobile: patientPhone },
              { mobile: cleanPhone },
              ...(cleanPhone ? [{ mobile: { $regex: cleanPhone } }] : [])
            ]
          },
          {
            name: patientName,
            mobile: cleanPhone || patientPhone,
            email: patientEmail,
            city: patientCity,
            source: source || 'Website',
            lastVisit: date,
            $inc: { totalVisits: 1 },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (custErr) {
        console.warn('Customer auto-sync note:', custErr.message);
      }

      return res.status(201).json({
        success: true,
        message: 'Appointment booked successfully!',
        appointmentCode: appointment.appointmentCode,
        data: appointment,
      });
    } else {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const appointmentCode = `APT-${new Date().getFullYear()}-${randomSuffix}`;

      const mockAppointment = {
        _id: 'mock_' + Date.now(),
        appointmentCode,
        patient: {
          name: patientName,
          phone: cleanPhone || patientPhone,
          email: patientEmail,
        },
        treatmentName,
        doctorName: therapist || 'Any Therapist',
        date,
        timeSlot: selectedTime,
        price: aptPrice,
        message: message || '',
        status: 'Pending',
        source: source || 'Website',
        erpSyncStatus: 'Synced',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      fallbackAppointments.unshift(mockAppointment);

      return res.status(201).json({
        success: true,
        message: 'Appointment booked successfully! (Saved in local session)',
        appointmentCode: mockAppointment.appointmentCode,
        data: mockAppointment,
      });
    }
  } catch (error) {
    console.error('Error in createAppointment:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all appointments (for ERP Admin Dashboard)
// @route   GET /api/appointments?status=...&date=...&source=...
// @access  Admin / ERP
export const getAppointments = async (req, res) => {
  try {
    const { status, date, source, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (status) filter.status = status;
      if (date) filter.date = date;
      if (source) filter.source = source;
      if (search) {
        filter.$or = [
          { appointmentCode: { $regex: search, $options: 'i' } },
          { 'patient.name': { $regex: search, $options: 'i' } },
          { 'patient.phone': { $regex: search, $options: 'i' } },
        ];
      }

      const rawAppointments = await Appointment.find(filter).sort({ createdAt: -1 });

      // Deduplicate: Keep only original unique records
      const seenCodes = new Set();
      const seenComposite = new Set();
      const appointments = [];

      for (const apt of rawAppointments) {
        const code = (apt.appointmentCode || apt._id.toString()).trim();
        const p = (apt.patient?.phone || '').replace(/\D/g, '').slice(-10);
        const composite = `${p}_${apt.date}_${(apt.treatmentName || '').toLowerCase()}`;

        if (seenCodes.has(code)) continue;
        if (p && seenComposite.has(composite)) continue;

        seenCodes.add(code);
        if (p) seenComposite.add(composite);
        appointments.push(apt);
      }

      return res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments,
      });
    } else {

      let results = [...fallbackAppointments];
      if (status) results = results.filter((a) => a.status === status);
      if (date) results = results.filter((a) => a.date === date);
      if (source) results = results.filter((a) => a.source === source);
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(
          (a) =>
            a.appointmentCode?.toLowerCase().includes(q) ||
            a.patient?.name?.toLowerCase().includes(q) ||
            a.patient?.phone?.includes(q)
        );
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update appointment status / assignment (from ERP Admin)
// @route   PATCH /api/appointments/:id/status
// @access  Admin / ERP
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, doctorId, doctorName, date, timeSlot, notes } = req.body;

    if (mongoose.connection.readyState === 1) {
      const filter = (mongoose.Types.ObjectId.isValid(id) && id.length === 24) ? { _id: id } : { appointmentCode: id };
      const appointment = await Appointment.findOne(filter);
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      if (status) appointment.status = status;
      if (doctorId) appointment.doctorId = isValidObjectId(doctorId) ? doctorId : undefined;
      if (doctorName) appointment.doctorName = doctorName;
      if (date) appointment.date = date;
      if (timeSlot) appointment.timeSlot = timeSlot;
      if (notes) appointment.message = notes;

      await appointment.save();
      return res.status(200).json({
        success: true,
        message: `Appointment updated to ${appointment.status}`,
        data: appointment,
      });
    } else {
      const appointment = fallbackAppointments.find((a) => a._id === id || a.appointmentCode === id);
      if (!appointment) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }

      if (status) appointment.status = status;
      if (doctorId) appointment.doctorId = doctorId;
      if (doctorName) appointment.doctorName = doctorName;
      if (date) appointment.date = date;
      if (timeSlot) appointment.timeSlot = timeSlot;
      appointment.updatedAt = new Date();

      return res.status(200).json({
        success: true,
        message: `Appointment updated to ${appointment.status}`,
        data: appointment,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete appointment (from ERP Admin)
// @route   DELETE /api/appointments/:id
// @access  Admin / ERP
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const filter = (mongoose.Types.ObjectId.isValid(id) && id.length === 24) ? { _id: id } : { appointmentCode: id };
      const deleted = await Appointment.findOneAndDelete(filter);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
      return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } else {
      fallbackAppointments = fallbackAppointments.filter((a) => a._id !== id && a.appointmentCode !== id);
      return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
