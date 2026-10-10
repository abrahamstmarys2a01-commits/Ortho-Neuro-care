# 🌿 Auir Vethik - Ayurveda & Wellness ERP

A modern, high-performance ERP and Patient Appointment Management System built with **React** for **Auir Vethik Ayurveda & Wellness**, with direct live booking integration with **https://ortho-neuro-care.vercel.app/**.

---

## 📁 Project Structure (`frontend/`)

```
auir vethik ERP/
└── frontend/
    ├── public/
    │   └── images/
    │       ├── ayurveda_banner.jpg          # Ayurvedic Herbs Banner
    │       └── ayurveda_bowl.jpg            # Botanical Bowl
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── appointments/
    │   │   │   └── AppointmentsList.jsx      # Filter, reschedule, WhatsApp, status
    │   │   ├── common/
    │   │   │   └── ToastContainer.jsx        # Notification chimes & alerts
    │   │   ├── customers/
    │   │   │   └── CustomersList.jsx          # Customer directory & health history
    │   │   ├── dashboard/
    │   │   │   ├── AppointmentStatusChart.jsx # Donut status breakdown (128 Total)
    │   │   │   ├── DashboardView.jsx          # Main ERP dashboard view
    │   │   │   ├── MonthlyAppointmentsChart.jsx # Interactive monthly trend SVG
    │   │   │   ├── PromoBanner.jsx            # Ayurvedic essentials promo
    │   │   │   ├── QuickActions.jsx           # Add customer, add service, sync
    │   │   │   ├── StatsGrid.jsx              # 4 Stat cards
    │   │   │   └── UpcomingAppointments.jsx   # Priority queue with online source badges
    │   │   ├── enquiries/
    │   │   │   └── EnquiriesList.jsx          # Live leads & 1-click appointment conversion
    │   │   ├── layout/
    │   │   │   ├── MobileNav.jsx              # Mobile responsive navigation bar
    │   │   │   ├── Navbar.jsx                 # Search, notification center & admin profile
    │   │   │   └── Sidebar.jsx                # Brand logo, nav items & quote flourish
    │   │   ├── reports/
    │   │   │   └── ReportsView.jsx            # Financial analytics & print reports
    │   │   ├── settings/
    │   │   │   └── SettingsView.jsx           # Clinic info, chime & WhatsApp settings
    │   │   └── sync/
    │   │       └── OnlineIntegrationHub.jsx   # Live webhook simulator for ortho-neuro-care
    │   ├── context/
    │   │   └── AppContext.jsx                 # Centralized state, local storage & Audio API
    │   ├── data/
    │   │   └── mockData.js                    # Initial dataset matching the UI screenshot
    │   ├── App.jsx
    │   ├── index.css                          # Aesthetic botanical theme design system
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 🚀 How to Run the App

1. Navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open the provided local URL (e.g., `http://localhost:5173/`).
