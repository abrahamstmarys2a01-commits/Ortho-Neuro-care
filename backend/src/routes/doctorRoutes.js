import express from 'express';
import { getDoctors, createDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.route('/')
  .get(getDoctors)
  .post(createDoctor);

export default router;
