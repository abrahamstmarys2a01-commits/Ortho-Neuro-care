import mongoose from 'mongoose';
import Contact from '../models/Contact.js';

let fallbackContacts = [];

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, service } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.create({
        name,
        email,
        phone: phone || '',
        subject: subject || (service ? `Enquiry for ${service}` : 'General Inquiry'),
        message,
      });
      return res.status(201).json({ success: true, message: 'Message received! We will contact you soon.', data: contact });
    } else {
      const mockContact = {
        _id: 'mock_msg_' + Date.now(),
        name,
        email,
        phone: phone || '',
        subject: subject || (service ? `Enquiry for ${service}` : 'General Inquiry'),
        message,
        createdAt: new Date(),
      };
      fallbackContacts.unshift(mockContact);
      return res.status(201).json({ success: true, message: 'Message received! (Session saved)', data: mockContact });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } else {
      return res.status(200).json({ success: true, count: fallbackContacts.length, data: fallbackContacts });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
      if (!contact) return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
      return res.status(200).json({ success: true, data: contact });
    } else {
      const item = fallbackContacts.find(c => c._id === id);
      if (item) {
        item.status = status;
        return res.status(200).json({ success: true, data: item });
      }
      return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
