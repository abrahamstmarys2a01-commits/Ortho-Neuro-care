import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, IndianRupee } from 'lucide-react';
import './Treatments.css';

const treatments = [
  {
    id: 1,
    name: "Abhyanga Massage",
    description: "A synchronized full-body massage using warm herbal oils to improve circulation and relieve fatigue.",
    duration: "60 Min",
    price: "2,500",
    image: "/images/treatment_1_1783241345673.png"
  },
  {
    id: 2,
    name: "Shirodhara",
    description: "Continuous pouring of warm medicated oil on the forehead to relieve stress, anxiety, and insomnia.",
    duration: "45 Min",
    price: "3,000",
    image: "/images/treatment_2_1783241366803.png"
  },
  {
    id: 3,
    name: "Deep Tissue Massage",
    description: "Intense massage targeting deep muscle layers to release chronic tension and alleviate muscle pain.",
    duration: "90 Min",
    price: "3,500",
    image: "/images/treatment_new_1783241979399.png"
  },
  {
    id: 4,
    name: "Aromatherapy",
    description: "Gentle massage using aromatic essential oils extracted from herbs to promote relaxation and well-being.",
    duration: "60 Min",
    price: "2,800",
    image: "/images/about_img_1783241334731.png"
  },
  {
    id: 5,
    name: "Panchakarma",
    description: "A comprehensive five-step detoxification process to cleanse the body of toxins and restore natural balance.",
    duration: "120 Min",
    price: "5,000",
    image: "/images/treatment_1_1783241345673.png"
  },
  {
    id: 6,
    name: "Foot Reflexology",
    description: "Targeted pressure application on specific points of the feet to stimulate energy flow and promote healing.",
    duration: "30 Min",
    price: "1,500",
    image: "/images/treatment_2_1783241366803.png"
  },
  {
    id: 7,
    name: "Head Massage",
    description: "Traditional Indian head massage (Champi) using warm herbal oils to nourish hair and relieve mental stress.",
    duration: "30 Min",
    price: "1,200",
    image: "/images/treatment_new_1783241979399.png"
  },
  {
    id: 8,
    name: "Steam Therapy",
    description: "Herbal steam bath (Swedana) to open pores, remove toxins, and reduce body stiffness.",
    duration: "20 Min",
    price: "1,000",
    image: "/images/about_img_1783241334731.png"
  }
];

const Treatments = () => {
  return (
    <section id="treatments" className="section treatments-bg">
      <div className="container">
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Our Services</span>
            <h2>Authentic <span className="text-accent">Ayurvedic</span> Therapies</h2>
            <p className="section-description">
              Discover our carefully curated selection of traditional treatments designed to rejuvenate your body, mind, and spirit.
            </p>
          </motion.div>
        </div>

        <div className="treatments-grid">
          {treatments.map((treatment, index) => (
            <motion.div 
              key={treatment.id} 
              className="treatment-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="treatment-img-container">
                <img src={treatment.image} alt={treatment.name} className="treatment-img" />
                <div className="treatment-overlay">
                  <Link to="/booking" className="btn btn-primary btn-book-hover">Book Now</Link>
                </div>
              </div>
              <div className="treatment-content">
                <h3 className="treatment-title">{treatment.name}</h3>
                <p className="treatment-desc">{treatment.description}</p>
                <div className="treatment-meta">
                  <div className="meta-item">
                    <Clock className="meta-icon" />
                    <span>{treatment.duration}</span>
                  </div>
                  <div className="meta-item price">
                    <IndianRupee className="meta-icon" />
                    <span>{treatment.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatments;
