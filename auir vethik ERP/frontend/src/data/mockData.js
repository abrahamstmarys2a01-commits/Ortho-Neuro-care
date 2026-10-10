// Dataset definitions for Auir Vethik Ayurveda & Wellness ERP
// Strictly 0 mock records - Only genuine live MongoDB Atlas data is loaded

export const INITIAL_SERVICES = [
  {
    id: 1,
    name: 'Ayurveda Consultation',
    description: 'Personalized guidance and dosha assessment for your wellness.',
    duration: '30 mins',
    durationMinutes: 30,
    price: 500,
    status: 'Active',
    category: 'Consultation',
    icon: 'Leaf'
  },
  {
    id: 2,
    name: 'Herbal Wellness',
    description: 'Natural remedies, immunity boosters and herbal care for better health.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 1200,
    status: 'Active',
    category: 'Therapy',
    icon: 'Sparkles'
  },
  {
    id: 3,
    name: 'Rejuvenation Therapy',
    description: 'Traditional herbal rejuvenation therapies for complete body vitality.',
    duration: '90 mins',
    durationMinutes: 90,
    price: 2000,
    status: 'Active',
    category: 'Therapy',
    icon: 'HeartPulse'
  },
  {
    id: 4,
    name: 'Skin Care Therapy',
    description: 'Herbal face packs, authentic Kumkumadi facial care and glow therapy.',
    duration: '45 mins',
    durationMinutes: 45,
    price: 1000,
    status: 'Active',
    category: 'Beauty & Skin',
    icon: 'Flower2'
  },
  {
    id: 5,
    name: 'Detox Program',
    description: 'Holistic deep cleanse and toxins flush to rejuvenate your digestive fire.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 1500,
    status: 'Active',
    category: 'Detox',
    icon: 'Droplets'
  },
  {
    id: 6,
    name: 'Panchakarma Therapy',
    description: 'Comprehensive 5-fold detoxification and restorative ancient treatment.',
    duration: '120 mins',
    durationMinutes: 120,
    price: 3500,
    status: 'Active',
    category: 'Panchakarma',
    icon: 'ShieldPlus'
  },
  {
    id: 7,
    name: 'Shirodhara Relaxation',
    description: 'Warm medicated herbal oil gently poured over forehead for nervous calm.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 2200,
    status: 'Active',
    category: 'Therapy',
    icon: 'Waves'
  },
  {
    id: 8,
    name: 'Abhyanga Herbal Massage',
    description: 'Full body rhythmic warm oil massage balancing Vata, Pitta and Kapha.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 1800,
    status: 'Active',
    category: 'Therapy',
    icon: 'Hand'
  }
];

export const INITIAL_CUSTOMERS = [];
export const INITIAL_APPOINTMENTS = [];
export const INITIAL_ENQUIRIES = [];
export const INITIAL_REVIEWS = [];

export const MONTHLY_TREND = [];
export const STATUS_BREAKDOWN = {
  total: 0,
  completed: 0,
  pending: 0,
  cancelled: 0,
  rescheduled: 0
};
