import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      default: 'Chennai',
      trim: true,
    },
    source: {
      type: String,
      default: 'Website',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'VIP', 'New'],
      default: 'Active',
    },
    notes: {
      type: String,
      default: '',
    },
    totalVisits: {
      type: Number,
      default: 1,
    },
    lastVisit: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
