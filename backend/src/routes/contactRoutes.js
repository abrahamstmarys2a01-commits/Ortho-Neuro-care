import express from 'express';
import { submitContact, getContacts, updateContactStatus } from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .post(submitContact)
  .get(getContacts);

router.route('/:id/status')
  .patch(updateContactStatus);

export default router;
