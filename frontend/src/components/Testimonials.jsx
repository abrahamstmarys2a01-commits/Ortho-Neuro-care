import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Wellness Enthusiast",
    text: "The Panchakarma treatment completely rejuvenated my body and mind. The therapists are highly skilled, and the ambiance is purely magical. A true 5-star experience.",
    rating: 5,
    image: "/images/testimonial_pic_1783241990001.png"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Executive",
    text: "I've visited luxury spas worldwide, but the authentic Kerala treatments here are unparalleled. The Shirodhara session cured my chronic insomnia. Highly recommended.",
    rating: 5,
    image: "/images/testimonial_pic_1783241990001.png"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Yoga Instructor",
    text: "A true sanctuary of healing. The herbal oils used are of the highest quality, and the traditional architecture makes you feel like you're in ancient India.",
    rating: 5,
    image: "/images/testimonial_pic_1783241990001.png"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Testimonials</span>
            <h2>What Our <span className="text-accent">Guests</span> Say</h2>
          </motion.div>
        </div>

        <div className="testimonials-wrapper">
          <button className="testimonial-nav prev" onClick={handlePrev}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="testimonial-container">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-slide"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0,
                  zIndex: index === currentIndex ? 10 : 0,
                  transform: `translateX(${(index - currentIndex) * 100}%)`
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="testimonial-card">
                  <Quote className="quote-icon" size={48} />
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="star-icon" fill="currentColor" />
                    ))}
                  </div>
                  
                  <div className="client-profile">
                    <img src={testimonial.image} alt={testimonial.name} className="client-img" />
                    <div className="client-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="testimonial-nav next" onClick={handleNext}>
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
