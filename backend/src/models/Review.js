import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      default: 'Verified Patient',
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
      default: 5,
    },
    treatment: {
      type: String,
      default: 'General Wellness',
      trim: true,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
