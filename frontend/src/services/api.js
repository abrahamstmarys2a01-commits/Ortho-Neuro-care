const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Fetch all active treatments dynamically (No Hardcoding)
export const getTreatmentsApi = async () => {
  const response = await fetch(`${API_BASE_URL}/treatments?active=true`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch treatments');
  }
  return result.data || [];
};

// Fetch all active doctors / therapists dynamically (No Hardcoding)
export const getDoctorsApi = async () => {
  const response = await fetch(`${API_BASE_URL}/doctors?active=true`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch doctors');
  }
  return result.data || [];
};

// Fetch live available time slots for chosen date and doctor
export const getAvailableSlotsApi = async (date, doctorId = '') => {
  let url = `${API_BASE_URL}/slots?date=${date}`;
  if (doctorId) url += `&doctorId=${doctorId}`;
  const response = await fetch(url);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch time slots');
  }
  return result.slots || [];
};

// Book an appointment (shared with ERP backend)
export const bookAppointmentApi = async (data) => {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit booking');
  }
  return result;
};

// Submit contact inquiry
export const submitContactApi = async (data) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to send message');
  }
  return result;
};

// Subscribe newsletter
export const subscribeNewsletterApi = async (email) => {
  const response = await fetch(`${API_BASE_URL}/newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to subscribe');
  }
  return result;
};

// Fetch customer reviews
export const getReviewsApi = async () => {
  const response = await fetch(`${API_BASE_URL}/reviews`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch reviews');
  }
  return result.data || [];
};

// Submit a new customer review
export const createReviewApi = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit review');
  }
  return result;
};
