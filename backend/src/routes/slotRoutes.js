import express from 'express';
import { getAvailableSlots } from '../controllers/slotController.js';

const router = express.Router();

router.route('/')
  .get(getAvailableSlots);

export default router;
