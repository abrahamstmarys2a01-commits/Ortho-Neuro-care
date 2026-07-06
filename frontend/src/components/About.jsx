import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import './About.css';

const About = () => {
  const features = [
    "Authentic Kerala Ayurveda",
    "Certified Therapists",
    "Herbal Oils",
    "Personalized Care",
    "Peaceful Environment",
    "Private Therapy Rooms"
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-container">
              <img 
                src="/images/about_img_1783241334731.png" 
                alt="Ayurvedic Spa Setting" 
                className="about-image"
              />
              <div className="experience-badge glass">
                <span className="experience-number text-accent">10+</span>
                <span className="experience-text">Years of<br/>Healing</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-subtitle">About Us</span>
            <h2>The Art of Traditional <span className="text-accent">Healing</span></h2>
            
            <p className="about-description">
              At AyurVeda, we believe in the ancient wisdom of Kerala Ayurveda to restore balance to your body, mind, and spirit. Our luxury sanctuary provides a perfect escape from the bustling world, offering authentic treatments that rejuvenate your being.
            </p>
            
            <p className="about-description">
              Every therapy is customized by our expert practitioners using premium, 100% natural herbal oils and traditional techniques passed down through generations.
            </p>
            
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <CheckCircle2 className="feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <a href="#treatments" className="btn btn-primary">
              Discover Our Therapies
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
