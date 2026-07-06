import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Camera, Users } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Get in Touch</span>
            <h2>Contact <span className="text-accent">Us</span></h2>
            <p className="section-description">
              We're here to answer your questions and help you schedule your perfect wellness experience.
            </p>
          </motion.div>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-container"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-info-card">
              <h3>Visit Our Sanctuary</h3>
              <p className="contact-desc">
                Step into a world of peace and tranquility located in the heart of the city, yet worlds away from the noise.
              </p>
              
              <ul className="contact-list">
                <li>
                  <div className="contact-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-details">
                    <h4>Address</h4>
                    <p>123 Serenity Boulevard, Wellness District, City Name 400001</p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-details">
                    <h4>Phone / WhatsApp</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>hello@ayurvedaspa.com</p>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <Clock size={20} />
                  </div>
                  <div className="contact-details">
                    <h4>Business Hours</h4>
                    <p>Monday - Sunday: 8:00 AM - 9:00 PM</p>
                  </div>
                </li>
              </ul>

              <div className="social-links mt-4">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-icon"><Camera size={20} /></a>
                  <a href="#" className="social-icon"><Users size={20} /></a>
                  <a href="#" className="social-icon"><MessageCircle size={20} /></a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="contact-map"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Simple Map Placeholder */}
            <div className="map-placeholder">
              <div className="map-overlay">
                <MapPin size={40} className="text-accent" />
                <h3>AyurVeda Spa</h3>
                <p>123 Serenity Boulevard</p>
              </div>
              <img 
                src="/images/gallery_1_1783241959052.png" 
                alt="Map Location" 
                className="map-img"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
