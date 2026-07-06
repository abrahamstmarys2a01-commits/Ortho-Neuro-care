import React from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf, ShieldCheck, Heart, UserCheck, Sparkles } from 'lucide-react';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: <Award />,
    title: "Certified Experts",
    description: "Highly trained therapists from Kerala with years of experience in traditional Ayurvedic practices."
  },
  {
    icon: <Leaf />,
    title: "Organic Herbal Oils",
    description: "We use only 100% natural, premium herbal oils prepared using authentic ancient recipes."
  },
  {
    icon: <ShieldCheck />,
    title: "Hygienic Environment",
    description: "Impeccable cleanliness and sanitized therapy rooms ensuring your absolute safety and comfort."
  },
  {
    icon: <Sparkles />,
    title: "Relaxing Atmosphere",
    description: "A serene, spa-like environment designed to instantly calm your senses upon arrival."
  },
  {
    icon: <UserCheck />,
    title: "Personalized Therapy",
    description: "Treatments tailored specifically to your unique dosha (body type) and health requirements."
  },
  {
    icon: <Heart />,
    title: "Affordable Packages",
    description: "Premium luxury experience made accessible through thoughtfully designed wellness packages."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section why-choose-us">
      <div className="container">
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Why AyurVeda</span>
            <h2>Experience The <span className="text-accent">Difference</span></h2>
            <p className="section-description">
              We combine the ancient wisdom of Ayurveda with modern luxury to provide you with an unparalleled wellness experience.
            </p>
          </motion.div>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="reason-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="reason-icon-wrapper">
                {reason.icon}
              </div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
