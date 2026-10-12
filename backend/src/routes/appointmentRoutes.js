import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id/status')
  .patch(updateAppointmentStatus);

router.route('/:id')
  .delete(deleteAppointment);

export default router;
