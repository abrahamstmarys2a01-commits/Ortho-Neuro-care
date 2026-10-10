# Ortho Neuro Care - Backend API

Node.js & Express.js REST API with MongoDB & .env configuration.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Edit [backend/.env](file:///e:/MWT/Ortho%20Neuro%20Care/backend/.env):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ortho_neuro_care
FRONTEND_URL=http://localhost:5173
```

### 3. Run Backend Server
```bash
# Development mode (auto-reload on code change)
npm run dev

# Or Production mode
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API Root & Status |
| `GET` | `/api/health` | Health Check |
| `POST` | `/api/appointments` | Book an Appointment |
| `GET` | `/api/appointments` | List all Appointments |
| `POST` | `/api/contact` | Submit Contact Form |
| `POST` | `/api/newsletter` | Newsletter Subscription |
