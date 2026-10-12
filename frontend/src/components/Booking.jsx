import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { bookAppointmentApi, getTreatmentsApi } from '../services/api';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Chennai',
    treatment: '',
    treatmentId: '',
    therapist: '',
    doctorId: '',
    date: '',
    time: '',
    message: ''
  });

  const [treatmentsList, setTreatmentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '', appointmentCode: '' });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const treatmentsData = await getTreatmentsApi();
        setTreatmentsList(treatmentsData);
      } catch (err) {
        console.warn('Could not load treatments list:', err.message);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Strictly allow numbers only and stop at 10 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        phone: digitsOnly
      }));
      return;
    }
    
    if (name === 'treatment') {
      const selected = treatmentsList.find(t => t.title === value);
      setFormData(prev => ({
        ...prev,
        treatment: value,
        treatmentId: selected ? selected._id : '',
        price: selected ? (selected.price || 2500) : 2500
      }));
      return;
    }

    if (name === 'therapist') {
      setFormData(prev => ({
        ...prev,
        therapist: value,
        doctorId: ''
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
    setStatus({ type: '', message: '', appointmentCode: '' });

    // Strict validation: Block submit if any required field is missing or invalid
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your Full Name.' });
      return;
    }
    if (!formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Please enter your Mobile Number.' });
      return;
    }
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setStatus({ type: 'error', message: 'Mobile number must be exactly 10 digits.' });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your Email Address.' });
      return;
    }
    if (!formData.treatment.trim()) {
      setStatus({ type: 'error', message: 'Please select a Treatment.' });
      return;
    }
    if (!formData.date.trim()) {
      setStatus({ type: 'error', message: 'Please select an Appointment Date.' });
      return;
    }
    if (!formData.time.trim()) {
      setStatus({ type: 'error', message: 'Please select an Appointment Time.' });
      return;
    }

    setLoading(true);

    try {
      const bookingPayload = {
        ...formData,
        price: formData.price || 2500,
        source: 'Website'
      };

      const response = await bookAppointmentApi(bookingPayload);
      const apptCode = response.appointmentCode || response.data?.appointmentCode || `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      if (response && response.isDuplicate) {
        setStatus({
          type: 'info',
          message: response.message || `An appointment is already booked for this date (#${apptCode}).`,
          appointmentCode: apptCode
        });
        return;
      }

      setStatus({
        type: 'success',
        message: response.message || 'Thank you for booking! We will confirm your appointment shortly.',
        appointmentCode: apptCode
      });

      // Clear any temporary queue since appointment is safely saved in live database
      try {
        localStorage.removeItem('ortho_appointments_queue');
      } catch (err) {}

      // Complete payload so ERP shows every field immediately
      const erpAppointment = {
        id: apptCode,
        customerName: formData.name,
        customerMobile: formData.phone,
        customerEmail: formData.email,
        customerCity: formData.city || 'Chennai',
        service: formData.treatment,
        serviceId: formData.treatmentId,
        therapist: formData.therapist || 'Any Available Specialist',
        doctorId: formData.doctorId,
        date: formData.date,
        time: formData.time,
        price: formData.price || 2500,
        status: 'Pending',
        source: 'ortho-neuro-care-frontend.vercel.app',
        message: formData.message,
        createdAt: new Date().toLocaleString('en-GB')
      };

      // Broadcast for instant multi-tab sync in ERP
      try {
        const bc = new BroadcastChannel('ortho_neuro_auir_sync');
        bc.postMessage({
          type: 'NEW_BOOKING',
          payload: erpAppointment
        });
        bc.close();
      } catch (err) {}

      setFormData({
        name: '',
        phone: '',
        email: '',
        city: 'Chennai',
        treatment: '',
        treatmentId: '',
        therapist: '',
        doctorId: '',
        date: '',
        time: '',
        price: 2500,
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
                  <label htmlFor="phone">Mobile Number (10 Digits)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    maxLength={10}
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                    placeholder="Enter 10-digit mobile number"
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
                  <label htmlFor="city">City / Location</label>
                  <select 
                    id="city" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Tiruchirappalli (Trichy)">Tiruchirappalli (Trichy)</option>
                    <option value="Salem">Salem</option>
                    <option value="Tirunelveli">Tirunelveli</option>
                    <option value="Erode">Erode</option>
                    <option value="Vellore">Vellore</option>
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Dindigul">Dindigul</option>
                    <option value="Kanchipuram">Kanchipuram</option>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Nagercoil">Nagercoil</option>
                    <option value="Hosur">Hosur</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
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

                <div className="form-group">
                  <label htmlFor="therapist">Preferred Doctor</label>
                  <select 
                    id="therapist" 
                    name="therapist" 
                    value={formData.therapist}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Any Available Specialist</option>
                    <option value="Male Doctor">Male Doctor</option>
                    <option value="Female Doctor">Female Doctor</option>
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
