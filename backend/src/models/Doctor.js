import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor or Therapist name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['Doctor', 'Senior Therapist', 'Physiotherapist', 'Ayurvedic Specialist'],
      default: 'Ayurvedic Specialist',
    },
    specialization: {
      type: String,
      default: 'General Therapy',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Any'],
      default: 'Any',
    },
    availableDays: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    workingHours: {
      start: { type: String, default: '09:00' },
      end: { type: String, default: '19:00' },
    },
    slotIntervalMinutes: {
      type: Number,
      default: 30,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
