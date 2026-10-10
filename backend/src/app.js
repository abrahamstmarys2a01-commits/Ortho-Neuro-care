import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import appointmentRoutes from './routes/appointmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import treatmentRoutes from './routes/treatmentRoutes.js';
import slotRoutes from './routes/slotRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import { notFoundHandler, globalErrorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root Info & Health Check
app.get('/', (req, res) => {
  res.json({
    project: 'Ortho Neuro Care & Ayurvedic ERP API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      treatments: '/api/treatments',
      doctors: '/api/doctors',
      slots: '/api/slots?date=YYYY-MM-DD',
      appointments: '/api/appointments',
      customers: '/api/customers',
      contact: '/api/contact',
      newsletter: '/api/newsletter',
      reviews: '/api/reviews',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Register API Routes
app.use('/api/treatments', treatmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/reviews', reviewRoutes);

// Fallback Handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
