import mongoose from 'mongoose';
import Review from '../models/Review.js';

let fallbackReviews = [];

export const getReviews = async (req, res) => {
  try {
    const { all } = req.query; // If all=true (for ERP admin), fetch all regardless of isApproved
    const filter = all === 'true' ? {} : { isApproved: true };

    if (mongoose.connection.readyState === 1) {
      const reviews = await Review.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } else {
      const data = all === 'true' ? fallbackReviews : fallbackReviews.filter((r) => r.isApproved !== false);
      return res.status(200).json({ success: true, count: data.length, data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { name, rating, comment, treatment, role, isApproved } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Name, star rating, and review comments are required.',
      });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5.',
      });
    }

    const newReviewData = {
      name: name.trim(),
      role: role ? role.trim() : 'Verified Patient',
      rating: ratingNum,
      treatment: treatment ? treatment.trim() : 'Ayurvedic Care',
      comment: comment.trim(),
      isApproved: isApproved !== undefined ? Boolean(isApproved) : true,
      createdAt: new Date(),
    };

    if (mongoose.connection.readyState === 1) {
      const review = await Review.create(newReviewData);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Review has been submitted successfully.',
        data: review,
      });
    } else {
      const mockReview = {
        _id: 'rev_' + Date.now(),
        ...newReviewData,
      };
      fallbackReviews.unshift(mockReview);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Review has been submitted successfully.',
        data: mockReview,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    if (mongoose.connection.readyState === 1) {
      const review = await Review.findByIdAndUpdate(
        id,
        { isApproved: Boolean(isApproved) },
        { new: true }
      );
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
      return res.status(200).json({ success: true, message: 'Review status updated', data: review });
    } else {
      const idx = fallbackReviews.findIndex((r) => r._id === id);
      if (idx !== -1) {
        fallbackReviews[idx].isApproved = Boolean(isApproved);
        return res.status(200).json({ success: true, message: 'Review status updated', data: fallbackReviews[idx] });
      }
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
      return res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } else {
      fallbackReviews = fallbackReviews.filter((r) => r._id !== id);
      return res.status(200).json({ success: true, message: 'Review deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
