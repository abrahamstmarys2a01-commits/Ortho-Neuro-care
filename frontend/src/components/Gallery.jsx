import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import './Gallery.css';

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery_1_1783241959052.png",
    alt: "Luxury Reception",
    className: "gallery-item-large"
  },
  {
    id: 2,
    src: "/images/about_img_1783241334731.png",
    alt: "Herbal Oils",
    className: "gallery-item-small"
  },
  {
    id: 3,
    src: "/images/treatment_1_1783241345673.png",
    alt: "Massage Session",
    className: "gallery-item-tall"
  },
  {
    id: 4,
    src: "/images/gallery_2_1783241969324.png",
    alt: "Meditation Area",
    className: "gallery-item-wide"
  },
  {
    id: 5,
    src: "/images/treatment_2_1783241366803.png",
    alt: "Therapy Room",
    className: "gallery-item-small"
  },
  {
    id: 6,
    src: "/images/hero_bg_1783241324350.png",
    alt: "Nature Garden",
    className: "gallery-item-small"
  }
];

const Gallery = () => {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="section-header text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Gallery</span>
            <h2>A Glimpse of <span className="text-accent">Serenity</span></h2>
            <p className="section-description">
              Step into our world of tranquility. Explore our premium facilities designed exclusively for your ultimate relaxation.
            </p>
          </motion.div>
        </div>

        <div className="gallery-container">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`gallery-item ${image.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={image.src} alt={image.alt} className="gallery-img" />
              <div className="gallery-overlay">
                <span className="gallery-title">{image.alt}</span>
                  <Camera size={24} />
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <a href="#" className="btn btn-outline">View Full Gallery</a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
