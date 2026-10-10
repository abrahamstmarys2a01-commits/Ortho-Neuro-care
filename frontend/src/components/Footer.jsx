import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Loader2 } from 'lucide-react';
import { subscribeNewsletterApi } from '../services/api';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setFeedback({ type: '', text: '' });

    try {
      const res = await subscribeNewsletterApi(email);
      setFeedback({ type: 'success', text: res.message || 'Subscribed successfully!' });
      setEmail('');
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Subscription failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="logo footer-logo">
              <img src="/images/logo.png" alt="Logo" className="logo-icon-img" />
              <span className="logo-text">Ortho Neuro Care</span>
            </Link>
            <p className="footer-desc">
              A premium specialized clinic dedicated to restoring your mobility and neurological health through advanced care.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#treatments">Our Therapies</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#booking">Book Appointment</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Therapies</h4>
            <ul className="footer-links">
              <li><Link to="/treatments">Abhyanga Massage</Link></li>
              <li><Link to="/treatments">Shirodhara</Link></li>
              <li><Link to="/treatments">Panchakarma</Link></li>
              <li><Link to="/treatments">Deep Tissue</Link></li>
              <li><Link to="/treatments">Steam Therapy</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="footer-desc mb-3">
              Subscribe to receive wellness tips and exclusive offers.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" className="btn-accent" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {feedback.text && (
              <p style={{
                marginTop: '8px',
                fontSize: '0.85rem',
                color: feedback.type === 'success' ? '#4ade80' : '#f87171'
              }}>
                {feedback.text}
              </p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AyurVeda Spa & Wellness. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          
          <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top">
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
