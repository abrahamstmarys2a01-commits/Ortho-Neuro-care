import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Moon, Activity, HeartPulse, Droplets, Smile, BatteryCharging } from 'lucide-react';
import './WellnessBenefits.css';

const benefits = [
  { icon: <Brain />, title: "Stress Relief" },
  { icon: <Moon />, title: "Better Sleep" },
  { icon: <Activity />, title: "Pain Relief" },
  { icon: <HeartPulse />, title: "Improved Circulation" },
  { icon: <Droplets />, title: "Body Detox" },
  { icon: <Smile />, title: "Mental Relaxation" },
  { icon: <BatteryCharging />, title: "Muscle Recovery" }
];

const WellnessBenefits = () => {
  return (
    <section className="section benefits-section">
      <div className="container">
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Holistic Health</span>
            <h2>Wellness <span className="text-accent">Benefits</span></h2>
            <p className="section-description">
              Experience the profound physical and mental benefits of regular Ayurvedic therapies.
            </p>
          </motion.div>
        </div>

        <div className="benefits-container">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="benefit-icon-circle">
                {benefit.icon}
              </div>
              <h4 className="benefit-title">{benefit.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WellnessBenefits;
