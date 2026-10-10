import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, CheckCircle2, MessageSquare, X, Loader2, Sparkles } from 'lucide-react';
import { getReviewsApi, createReviewApi } from '../services/api';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: 'Verified Patient',
    rating: 5,
    treatment: 'Panchakarma Treatment',
    comment: '',
  });

  const [hoverRating, setHoverRating] = useState(0);

  const treatmentOptions = [
    'Panchakarma Treatment',
    'Shirodhara Session',
    'Abhyanga Massage',
    'Spine & Joint Care',
    'Neuro Rehabilitation',
    'Deep Tissue Therapy',
    'Steam Herbal Bath',
    'General Wellness & Consultation',
  ];

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsApi();
      if (data && data.length > 0) {
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Autoplay carousel if reviews exist
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.name.trim() || !formData.comment.trim()) {
      setErrorMsg('Please enter your name and review message.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await createReviewApi(formData);
      if (res.success && res.data) {
        setReviews((prev) => [res.data, ...prev]);
        setCurrentIndex(0);
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsModalOpen(false);
          setFormData({
            name: '',
            role: 'Verified Patient',
            rating: 5,
            treatment: 'Panchakarma Treatment',
            comment: '',
          });
        }, 1800);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate average rating
  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        {/* Section Header */}
        <div className="reviews-header">
          <div className="reviews-header-text">
            <span className="section-subtitle">Customer Reviews</span>
            <h2>
              What Our <span className="text-accent">Patients & Guests</span> Say
            </h2>
            <div className="reviews-summary-badge">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" fill="currentColor" />
                ))}
              </div>
              <span className="avg-score">{avgRating} / 5.0</span>
              <span className="count-label">({reviews.length} Verified Reviews)</span>
            </div>
          </div>

          <button
            className="btn btn-primary write-review-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Carousel */}
        {loading ? (
          <div className="reviews-loading">
            <Loader2 className="spinner" size={36} />
            <p>Loading patient reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="reviews-wrapper">
            <button className="review-nav-btn prev" onClick={handlePrev} aria-label="Previous Review">
              <ChevronLeft size={24} />
            </button>

            <div className="reviews-slider">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview?._id || currentIndex}
                  className="review-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="review-card-top">
                    <Quote className="quote-icon" size={40} />
                    <div className="treatment-tag">
                      <Sparkles size={14} />
                      <span>{currentReview?.treatment || 'Ayurvedic Treatment'}</span>
                    </div>
                  </div>

                  <p className="review-comment">"{currentReview?.comment}"</p>

                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < (currentReview?.rating || 5) ? 'star-filled' : 'star-empty'}
                        fill={i < (currentReview?.rating || 5) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>

                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {currentReview?.name?.charAt(0)?.toUpperCase() || 'P'}
                    </div>
                    <div className="reviewer-details">
                      <h4>{currentReview?.name}</h4>
                      <div className="verified-badge">
                        <CheckCircle2 size={14} className="badge-icon" />
                        <span>{currentReview?.role || 'Verified Patient'}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="review-nav-btn next" onClick={handleNext} aria-label="Next Review">
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <div className="no-reviews-box">
            <MessageSquare size={40} />
            <h3>No Reviews Yet</h3>
            <p>Be the first to share your healing journey with us!</p>
            <button className="btn btn-primary mt-3" onClick={() => setIsModalOpen(true)}>
              Write the First Review
            </button>
          </div>
        )}

        {/* Carousel Pagination Dots */}
        {reviews.length > 1 && (
          <div className="review-dots">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                className={`review-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <motion.div
              className="review-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <div>
                  <h3>Share Your Experience</h3>
                  <p>Your feedback helps us provide the best Ayurvedic care.</p>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {submitSuccess ? (
                <div className="submit-success-box">
                  <CheckCircle2 size={56} className="success-icon" />
                  <h4>Thank You!</h4>
                  <p>Your review has been posted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="review-form">
                  {errorMsg && <div className="review-error-alert">{errorMsg}</div>}

                  <div className="form-group">
                    <label>Your Rating *</label>
                    <div className="interactive-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className="star-rate-btn"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            size={28}
                            className={
                              star <= (hoverRating || formData.rating)
                                ? 'star-rate-filled'
                                : 'star-rate-empty'
                            }
                            fill={star <= (hoverRating || formData.rating) ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}
                      <span className="rating-text-hint">
                        {formData.rating === 5 && '🌟 Excellent Experience'}
                        {formData.rating === 4 && '👍 Very Good'}
                        {formData.rating === 3 && '👌 Good'}
                        {formData.rating === 2 && '👎 Fair'}
                        {formData.rating === 1 && '⚠️ Poor'}
                      </span>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Role / Status</label>
                      <input
                        type="text"
                        placeholder="e.g. Patient / Wellness Enthusiast"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Treatment or Service Received</label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    >
                      {treatmentOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Review / Experience *</label>
                    <textarea
                      rows={4}
                      placeholder="Share details about your treatment, therapists, results, or clinic ambiance..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      required
                    />
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsModalOpen(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="spinner" size={18} />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        'Post Review'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;
