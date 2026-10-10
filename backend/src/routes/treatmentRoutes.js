import express from 'express';
import { getTreatments, createTreatment } from '../controllers/treatmentController.js';

const router = express.Router();

router.route('/')
  .get(getTreatments)
  .post(createTreatment);

export default router;
