import mongoose from 'mongoose';
import Newsletter from '../models/Newsletter.js';

let fallbackNewsletters = [];

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email.' });
    }

    if (mongoose.connection.readyState === 1) {
      const exists = await Newsletter.findOne({ email });
      if (exists) {
        return res.status(200).json({ success: true, message: 'You are already subscribed!' });
      }
      const item = await Newsletter.create({ email });
      return res.status(201).json({ success: true, message: 'Subscribed successfully!', data: item });
    } else {
      if (fallbackNewsletters.some((n) => n.email === email)) {
        return res.status(200).json({ success: true, message: 'You are already subscribed!' });
      }
      const item = { _id: 'mock_sub_' + Date.now(), email, subscribedAt: new Date() };
      fallbackNewsletters.push(item);
      return res.status(201).json({ success: true, message: 'Subscribed successfully! (Session saved)', data: item });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
