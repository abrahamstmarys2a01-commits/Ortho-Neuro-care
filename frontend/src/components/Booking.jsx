import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { bookAppointmentApi, getTreatmentsApi, getDoctorsApi } from '../services/api';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    treatmentId: '',
    therapist: '',
    doctorId: '',
    date: '',
    time: '',
    message: ''
  });

  const [treatmentsList, setTreatmentsList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '', appointmentCode: '' });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [treatmentsData, doctorsData] = await Promise.all([
          getTreatmentsApi(),
          getDoctorsApi()
        ]);
        setTreatmentsList(treatmentsData);
        setDoctorsList(doctorsData);
      } catch (err) {
        console.warn('Could not load dynamic dropdowns, using defaults:', err.message);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'treatment') {
      const selected = treatmentsList.find(t => t.title === value);
      setFormData(prev => ({
        ...prev,
        treatment: value,
        treatmentId: selected ? selected._id : ''
      }));
      return;
    }

    if (name === 'therapist') {
      const selected = doctorsList.find(d => d.name === value);
      setFormData(prev => ({
        ...prev,
        therapist: value,
        doctorId: selected ? selected._id : ''
      }));
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '', appointmentCode: '' });

    try {
      const response = await bookAppointmentApi(formData);
      setStatus({
        type: 'success',
        message: response.message || 'Thank you for booking! We will confirm your appointment shortly.',
        appointmentCode: response.appointmentCode || ''
      });

      // Also broadcast for instant multi-tab sync in ERP
      try {
        const bc = new BroadcastChannel('ortho_neuro_auir_sync');
        bc.postMessage({
          type: 'NEW_BOOKING',
          payload: {
            customerName: formData.name,
            customerMobile: formData.phone,
            customerEmail: formData.email,
            service: formData.treatment,
            date: formData.date,
            time: formData.time,
            source: 'ortho-neuro-care.vercel.app',
            message: formData.message,
            id: response.appointmentCode
          }
        });
        bc.close();
      } catch (err) {}

      setFormData({
        name: '',
        phone: '',
        email: '',
        treatment: '',
        treatmentId: '',
        therapist: '',
        doctorId: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.',
        appointmentCode: ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="section booking-section">
      <div className="booking-bg">
        <img 
          src="/images/booking_bg_1783241376944.png" 
          alt="Spa Reception" 
          className="booking-img"
        />
        <div className="booking-overlay"></div>
      </div>

      <div className="container">
        <div className="booking-container">
          <motion.div 
            className="booking-form-wrapper glass"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-4">
              <span className="section-subtitle">Reservation</span>
              <h2>Book Your <span className="text-accent">Appointment</span></h2>
              <p className="booking-desc">
                Schedule your wellness session today and step into a world of ultimate relaxation.
              </p>
            </div>

            {status.message && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.95rem',
                  backgroundColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: status.type === 'success' ? '#22c55e' : '#ef4444',
                  border: `1px solid ${status.type === 'success' ? '#22c55e' : '#ef4444'}`
                }}
              >
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="John Doe"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    placeholder="+91 98765 43210"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="john@example.com"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="treatment">Select Treatment</label>
                  <select 
                    id="treatment" 
                    name="treatment" 
                    value={formData.treatment}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>Choose a therapy</option>
                    {treatmentsList && treatmentsList.length > 0 ? (
                      treatmentsList.map((t) => (
                        <option key={t._id || t.title} value={t.title}>
                          {t.title} {t.durationMinutes ? `(${t.durationMinutes} mins)` : ''}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Abhyanga Massage">Abhyanga Massage</option>
                        <option value="Shirodhara">Shirodhara</option>
                        <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                        <option value="Panchakarma">Panchakarma</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time" 
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="therapist">Preferred Doctor / Therapist</label>
                <select 
                  id="therapist" 
                  name="therapist" 
                  value={formData.therapist}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Any Available Specialist</option>
                  {doctorsList && doctorsList.length > 0 ? (
                    doctorsList.map((doc) => (
                      <option key={doc._id || doc.name} value={doc.name}>
                        {doc.name} - {doc.specialization || doc.role}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Male Therapist">Male Therapist</option>
                      <option value="Female Therapist">Female Therapist</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Special Requests or Medical Conditions</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="Tell us about any specific areas of concern..."
                  className="form-control"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    Processing... <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  </>
                ) : (
                  <>
                    Book Appointment <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
