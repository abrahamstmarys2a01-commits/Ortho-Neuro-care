import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/booking">Book Appointment</Link></li>
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
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn-accent">Subscribe</button>
            </form>
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
