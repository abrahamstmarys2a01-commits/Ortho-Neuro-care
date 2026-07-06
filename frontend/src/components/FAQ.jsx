import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "Is prior appointment required?",
    answer: "Yes, to ensure you receive our undivided attention and the highest quality of service, we require all guests to book their appointments in advance."
  },
  {
    question: "How long does each therapy session take?",
    answer: "Therapy durations vary depending on the treatment selected. Our sessions typically range from 30 minutes for targeted therapies to 120 minutes for comprehensive treatments like Panchakarma."
  },
  {
    question: "Are the herbal oils 100% natural?",
    answer: "Absolutely. We exclusively use premium, 100% organic herbal oils sourced directly from Kerala, prepared using authentic traditional Ayurvedic recipes."
  },
  {
    question: "Do you provide couple massage sessions?",
    answer: "Yes, we offer specialized couple massage sessions in our premium double-occupancy therapy rooms for a shared wellness experience."
  },
  {
    question: "Is parking available at the center?",
    answer: "Yes, we provide complimentary valet parking and secure underground parking for all our guests during their visit."
  },
  {
    question: "What are your working hours?",
    answer: "We are open all days of the week from 8:00 AM to 9:00 PM. We recommend booking your evening slots well in advance."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section faq-section">
      <div className="container">
        <div className="faq-grid">
          <motion.div
            className="faq-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Got Questions?</span>
            <h2>Frequently Asked <span className="text-accent">Questions</span></h2>
            <p className="faq-desc">
              Find answers to common questions about our therapies, facilities, and booking process.
            </p>
            
            <div className="accordion">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                >
                  <button 
                    className="accordion-header" 
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="accordion-title">{faq.question}</span>
                    <span className="accordion-icon">
                      {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="accordion-collapse"
                      >
                        <div className="accordion-body">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="faq-image-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/images/faq_img_1783241389375.png" 
              alt="Ayurvedic Wellness" 
              className="faq-img"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
