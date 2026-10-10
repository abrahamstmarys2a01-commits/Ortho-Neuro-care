import mongoose from 'mongoose';

const treatmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Treatment title is required'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: ['Ayurveda', 'Neurology', 'Orthopedics', 'Wellness'],
      default: 'Ayurveda',
    },
    durationMinutes: {
      type: Number,
      default: 60,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    benefits: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Treatment = mongoose.model('Treatment', treatmentSchema);
export default Treatment;
