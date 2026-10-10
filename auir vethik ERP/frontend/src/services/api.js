const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Transform backend appointment format to ERP format
export const mapBackendToErpAppointment = (apt) => {
  return {
    id: apt.appointmentCode || apt._id || `APT-${Date.now()}`,
    _backendId: apt._id,
    customerName: apt.patient?.name || apt.name || 'Patient',
    customerMobile: apt.patient?.phone || apt.phone || '',
    customerEmail: apt.patient?.email || apt.email || '',
    service: apt.treatmentName || apt.treatment || 'Ayurveda Consultation',
    serviceId: apt.treatmentId || 1,
    therapist: apt.doctorName || apt.therapist || 'Dr. Anand Vaidya',
    doctorId: apt.doctorId || null,
    date: apt.date || new Date().toISOString().split('T')[0],
    time: apt.timeSlot || apt.time || '10:00 AM',
    status: apt.status || 'Pending',
    source: apt.source === 'Website' ? 'ortho-neuro-care.vercel.app' : (apt.source || 'Website'),
    message: apt.message || '',
    price: apt.price || 500,
    createdAt: apt.createdAt ? new Date(apt.createdAt).toLocaleString('en-GB') : new Date().toLocaleString('en-GB'),
  };
};

// Transform ERP appointment format to backend format
export const mapErpToBackendAppointment = (data) => {
  return {
    patient: {
      name: data.customerName,
      phone: data.customerMobile,
      email: data.customerEmail || '',
    },
    treatmentName: data.service,
    treatmentId: data.serviceId || null,
    doctorName: data.therapist || 'Dr. Anand Vaidya',
    doctorId: data.doctorId || null,
    date: data.date,
    timeSlot: data.time,
    status: data.status || 'Confirmed',
    source: data.source || 'ERP Admin',
    message: data.message || '',
    price: data.price || 500,
  };
};

// Fetch live appointments from backend
export const fetchLiveAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch live appointments');
  }
  return (result.data || []).map(mapBackendToErpAppointment);
};

// Create appointment on backend
export const createLiveAppointment = async (erpAptData) => {
  const payload = mapErpToBackendAppointment(erpAptData);
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create appointment');
  }
  return mapBackendToErpAppointment(result.data);
};

// Update appointment status on backend
export const updateLiveAppointmentStatus = async (id, status, extraData = {}) => {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, ...extraData }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update status');
  }
  return result;
};

// Fetch live services / treatments from backend
export const fetchLiveServices = async () => {
  const response = await fetch(`${API_BASE_URL}/treatments?active=true`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch services');
  }
  return (result.data || []).map((t, idx) => ({
    id: t._id || idx + 1,
    name: t.title,
    description: t.description,
    duration: `${t.durationMinutes} mins`,
    durationMinutes: t.durationMinutes,
    price: t.price || 1000,
    status: t.isActive ? 'Active' : 'Inactive',
    category: t.category || 'Therapy',
    icon: 'Sparkles',
  }));
};

// Fetch all live reviews from backend (including unapproved for ERP moderation)
export const fetchLiveReviews = async () => {
  const response = await fetch(`${API_BASE_URL}/reviews?all=true`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch reviews');
  }
  return (result.data || []).map((r) => ({
    id: r._id || `REV-${Date.now()}`,
    _backendId: r._id,
    name: r.name,
    role: r.role || 'Verified Patient',
    rating: r.rating || 5,
    treatment: r.treatment || 'Ayurvedic Care',
    comment: r.comment || '',
    isApproved: r.isApproved !== undefined ? r.isApproved : true,
    source: 'Website Review',
    createdAt: r.createdAt ? new Date(r.createdAt).toLocaleString('en-GB') : new Date().toLocaleString('en-GB'),
  }));
};

// Create a review from ERP
export const createLiveReview = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create review');
  }
  return result.data;
};

// Update review approval status
export const updateLiveReviewStatus = async (id, isApproved) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isApproved }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update review status');
  }
  return result;
};

// Delete review
export const deleteLiveReview = async (id) => {
  const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete review');
  }
  return result;
};

// Fetch live customer enquiries / contact leads from backend
export const fetchLiveEnquiries = async () => {
  const response = await fetch(`${API_BASE_URL}/contact`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch enquiries');
  }
  return (result.data || []).map((c, idx) => ({
    id: c._id ? `ENQ-${c._id.slice(-4).toUpperCase()}` : `ENQ-${idx + 101}`,
    _backendId: c._id,
    name: c.name,
    phone: c.phone || 'Not provided',
    email: c.email || '',
    service: c.subject || 'General Inquiry',
    message: c.message || '',
    source: 'ortho-neuro-care.vercel.app',
    status: c.status === 'New' ? 'New Lead' : c.status,
    date: c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    time: c.createdAt ? new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM',
  }));
};

// Update enquiry status on backend
export const updateLiveEnquiryStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update enquiry status');
  }
  return result;
};

// Fetch live customers from MongoDB Atlas
export const fetchLiveCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/customers`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch customers');
  }
  return (result.data || []).map((c, idx) => ({
    id: c._id || idx + 1,
    _backendId: c._id,
    name: c.name,
    mobile: c.mobile,
    email: c.email || '',
    city: c.city || 'Chennai',
    source: c.source || 'Website',
    status: c.status || 'Active',
    notes: c.notes || '',
    totalVisits: c.totalVisits || 1,
    lastVisit: c.lastVisit || (c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    createdAt: c.createdAt ? new Date(c.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  }));
};

// Create customer in MongoDB Atlas
export const createLiveCustomer = async (data) => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to create customer');
  }
  return result.data;
};

// Update customer in MongoDB Atlas
export const updateLiveCustomer = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update customer');
  }
  return result.data;
};

// Delete customer in MongoDB Atlas
export const deleteLiveCustomer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete customer');
  }
  return result;
};



