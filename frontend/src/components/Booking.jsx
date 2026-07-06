import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    therapist: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for booking! We will confirm your appointment shortly.');
    setFormData({
      name: '',
      phone: '',
      email: '',
      treatment: '',
      therapist: '',
      date: '',
      time: '',
      message: ''
    });
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
                    <option value="Abhyanga Massage">Abhyanga Massage</option>
                    <option value="Shirodhara">Shirodhara</option>
                    <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                    <option value="Aromatherapy">Aromatherapy</option>
                    <option value="Panchakarma">Panchakarma</option>
                    <option value="Foot Reflexology">Foot Reflexology</option>
                    <option value="Head Massage">Head Massage</option>
                    <option value="Steam Therapy">Steam Therapy</option>
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
                <label htmlFor="therapist">Preferred Therapist (Optional)</label>
                <select 
                  id="therapist" 
                  name="therapist" 
                  value={formData.therapist}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Any Therapist</option>
                  <option value="Male Therapist">Male Therapist</option>
                  <option value="Female Therapist">Female Therapist</option>
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

              <button type="submit" className="btn btn-primary btn-submit">
                Book Appointment <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
