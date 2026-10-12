import dns from 'node:dns';

// Configure public DNS resolvers for reliable MongoDB Atlas SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if unsupported
}

import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load .env
dotenv.config();

// Connect Database (MongoDB Atlas)
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🌿 Ortho Neuro Care & Ayurvedic ERP API running on http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 API Documentation: http://localhost:${PORT}/\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} busy, retrying in 1.5 seconds...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1500);
  } else {
    console.error('❌ Server startup error:', err);
  }
});
