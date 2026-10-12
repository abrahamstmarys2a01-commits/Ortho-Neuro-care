// Dataset definitions for Ortho Neuro Care & Ayurvedic ERP
// Strictly 100% Real Database Catalog - Matching MongoDB Atlas Treatments exactly

export const INITIAL_SERVICES = [
  {
    id: '6ac9de1491acf27efb9dfec8',
    name: 'Abhyanga Massage',
    description: 'Traditional full-body warm herbal oil massage that restores vitality and relieves stress.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 2500,
    status: 'Active',
    category: 'Therapy',
    icon: 'Sparkles'
  },
  {
    id: '6ac9de1491acf27efb9dfec9',
    name: 'Shirodhara',
    description: 'Gentle pouring of continuous warm herbal oils over the forehead.',
    duration: '45 mins',
    durationMinutes: 45,
    price: 3200,
    status: 'Active',
    category: 'Therapy',
    icon: 'Waves'
  },
  {
    id: '6ac9de1491acf27efb9dfeca',
    name: 'Deep Tissue Massage',
    description: 'Targeted pressure therapy focusing on deeper layers of muscles.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 2800,
    status: 'Active',
    category: 'Therapy',
    icon: 'Hand'
  },
  {
    id: '6ac9de1491acf27efb9dfecc',
    name: 'Panchakarma',
    description: 'Comprehensive five-fold Ayurvedic detoxification and rejuvenation therapy.',
    duration: '90 mins',
    durationMinutes: 90,
    price: 4500,
    status: 'Active',
    category: 'Panchakarma',
    icon: 'ShieldPlus'
  },
  {
    id: '6ac9de1491acf27efb9dfecf',
    name: 'Steam Therapy (Swedana)',
    description: 'Medicinal herbal steam bath that opens bodily channels.',
    duration: '30 mins',
    durationMinutes: 30,
    price: 1200,
    status: 'Active',
    category: 'Therapy',
    icon: 'Droplets'
  },
  {
    id: '6ac9de1491acf27efb9dfecd',
    name: 'Foot Reflexology',
    description: 'Pressure point therapy corresponding to bodily organs and mobility.',
    duration: '45 mins',
    durationMinutes: 45,
    price: 1800,
    status: 'Active',
    category: 'Therapy',
    icon: 'HeartPulse'
  },
  {
    id: '6ac9de1491acf27efb9dfece',
    name: 'Head Massage',
    description: 'Invigorating Indian head massage with custom medicinal herbal oils.',
    duration: '30 mins',
    durationMinutes: 30,
    price: 1500,
    status: 'Active',
    category: 'Therapy',
    icon: 'Leaf'
  },
  {
    id: '6ac9de1491acf27efb9dfecb',
    name: 'Aromatherapy',
    description: 'Holistic healing treatment using natural plant extracts for vitality.',
    duration: '60 mins',
    durationMinutes: 60,
    price: 2400,
    status: 'Active',
    category: 'Therapy',
    icon: 'Flower2'
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
