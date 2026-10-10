import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    appointmentCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    patient: {
      name: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true,
      },
      phone: {
        type: String,
        required: [true, 'Patient phone is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Patient email is required'],
        trim: true,
        lowercase: true,
      },
      age: Number,
      gender: String,
    },
    treatmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
    },
    treatmentName: {
      type: String,
      required: [true, 'Treatment is required'],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    doctorName: {
      type: String,
      default: 'Any Therapist',
    },
    date: {
      type: String,
      required: [true, 'Appointment date is required (YYYY-MM-DD)'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Appointment time slot is required'],
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'In-Progress', 'Completed', 'Cancelled', 'Rescheduled'],
      default: 'Pending',
    },
    source: {
      type: String,
      enum: ['Website', 'ERP Admin', 'Walk-in', 'Phone'],
      default: 'Website',
    },
    erpSyncStatus: {
      type: String,
      enum: ['Synced', 'Pending'],
      default: 'Synced',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate human-readable appointmentCode (e.g., APT-2026-1001)
appointmentSchema.pre('save', function (next) {
  if (!this.appointmentCode) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.appointmentCode = `APT-${new Date().getFullYear()}-${randomSuffix}`;
  }
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
