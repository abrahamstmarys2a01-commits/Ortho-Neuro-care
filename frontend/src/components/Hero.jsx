import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Star, Users, Leaf, Droplets } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Background with overlay */}
      <div className="hero-bg">
        <img 
          src="/images/hero_bg_1783241324350.png" 
          alt="Luxury Ayurvedic Spa" 
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="section-subtitle hero-subtitle">Welcome to Ortho Neuro Care</span>
            <h1 className="hero-title">
              Relax Your Body.<br/>
              <span className="text-accent">Heal Your Mind.</span>
            </h1>
            <p className="hero-description">
              Experience authentic Ayurvedic healing with traditional therapies, herbal treatments, and complete wellness in a luxury retreat.
            </p>
            
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary btn-lg pulse-button">
                <Calendar className="btn-icon" />
                Book Appointment
              </Link>
              <Link to="/treatments" className="btn btn-outline btn-lg hero-outline-btn">
                Explore Treatments
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Statistics */}
        <div className="hero-stats-container">
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="stat-item glass-dark">
              <div className="stat-icon-wrapper">
                <Star className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
            </div>
            
            <div className="stat-item glass-dark">
              <div className="stat-icon-wrapper">
                <Users className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>5000+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
            
            <div className="stat-item glass-dark">
              <div className="stat-icon-wrapper">
                <Leaf className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>15+</h3>
                <p>Treatments</p>
              </div>
            </div>

            <div className="stat-item glass-dark">
              <div className="stat-icon-wrapper">
                <Droplets className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>100%</h3>
                <p>Herbal Oils</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
