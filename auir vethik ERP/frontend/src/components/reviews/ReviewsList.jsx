import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  Search,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Globe,
  Quote,
  X,
  Loader2,
  TrendingUp,
  Award
} from 'lucide-react';

export const ReviewsList = () => {
  const { reviews, addReview, toggleReviewApproval, deleteReview } = useApp();

  const [ratingFilter, setRatingFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Verified Patient',
    rating: 5,
    treatment: 'Panchakarma Treatment',
    comment: '',
    source: 'Clinic Desk Entry',
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
    'Ayurveda Consultation',
    'General Wellness & Care',
  ];

  const filteredReviews = reviews.filter((r) => {
    const matchesRating =
      ratingFilter === 'All' || r.rating === Number(ratingFilter);
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Live' && r.isApproved) ||
      (statusFilter === 'Hidden' && !r.isApproved);
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.treatment && r.treatment.toLowerCase().includes(search.toLowerCase())) ||
      (r.comment && r.comment.toLowerCase().includes(search.toLowerCase()));
    return matchesRating && matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalCount = reviews.length;
  const avgRating = totalCount
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalCount).toFixed(1)
    : '5.0';
  const liveCount = reviews.filter((r) => r.isApproved !== false).length;
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    setSubmitting(true);
    try {
      await addReview(formData);
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        role: 'Verified Patient',
        rating: 5,
        treatment: 'Panchakarma Treatment',
        comment: '',
        source: 'Clinic Desk Entry',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{ padding: '24px 28px', maxWidth: '1440px', margin: '0 auto' }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.9rem',
              color: '#1a2e20',
              fontWeight: 700,
              marginBottom: '4px',
            }}
          >
            Customer Reviews &amp; Ratings
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
            Live customer feedback and ratings from the website and clinic.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1e4d2b',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(30, 77, 43, 0.25)',
          }}
        >
          <Plus size={18} />
          <span>Add Direct Review</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        {/* Average Rating */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e7decb',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: '#7a8c7e', fontWeight: 600, textTransform: 'uppercase' }}>
              Average Rating
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1a2e20', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {avgRating} <span style={{ fontSize: '1rem', color: '#d97706' }}>★</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#657769', marginTop: '2px' }}>
              Across {totalCount} total reviews
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Award size={22} />
          </div>
        </div>

        {/* Live on Website */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e7decb',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: '#7a8c7e', fontWeight: 600, textTransform: 'uppercase' }}>
              Published Live
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e4d2b', marginTop: '2px' }}>
              {liveCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#657769', marginTop: '2px' }}>
              Active on Website Landing
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: '#e6f4ea',
              color: '#1b7a43',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Globe size={22} />
          </div>
        </div>

        {/* 5-Star Reviews */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '16px 20px',
            borderRadius: '12px',
            border: '1px solid #e7decb',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: '#7a8c7e', fontWeight: 600, textTransform: 'uppercase' }}>
              5-Star Ratings
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#b45309', marginTop: '2px' }}>
              {fiveStarCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#657769', marginTop: '2px' }}>
              {totalCount ? Math.round((fiveStarCount / totalCount) * 100) : 100}% Top Satisfaction
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: '#fffbeb',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Star size={22} fill="#f59e0b" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '18px',
          backgroundColor: '#ffffff',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid #e7decb',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <select
            className="form-select"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            style={{
              width: 'auto',
              padding: '7px 12px',
              fontSize: '0.82rem',
              borderRadius: '8px',
              border: '1px solid #d4cbb8',
              backgroundColor: '#faf8f2',
            }}
          >
            <option value="All">All Star Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
            <option value="3">⭐⭐⭐ (3 Stars)</option>
            <option value="2">⭐⭐ (2 Stars)</option>
            <option value="1">⭐ (1 Star)</option>
          </select>

          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: 'auto',
              padding: '7px 12px',
              fontSize: '0.82rem',
              borderRadius: '8px',
              border: '1px solid #d4cbb8',
              backgroundColor: '#faf8f2',
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Live">Live on Website</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        {/* Search input */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            minWidth: '240px',
          }}
        >
          <Search
            size={16}
            color="#819385"
            style={{ position: 'absolute', left: '10px' }}
          />
          <input
            type="text"
            placeholder="Search patient, therapy, or comment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '7px 10px 7px 32px',
              fontSize: '0.82rem',
              borderRadius: '8px',
              border: '1px solid #d4cbb8',
              backgroundColor: '#faf8f2',
              outline: 'none',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#819385',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '48px 24px',
            textAlign: 'center',
            borderRadius: '12px',
            border: '1px solid #e7decb',
            color: '#7a8c7e',
          }}
        >
          <MessageSquare size={38} color="#1e4d2b" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', color: '#1a2e20', marginBottom: '4px' }}>
            No Reviews Found
          </h3>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            Try clearing filters or search query to view customer feedback.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id || rev._backendId}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e7decb',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                position: 'relative',
              }}
            >
              <div>
                {/* Card Top: Customer Info & Live Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#1e4d2b',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    >
                      {rev.name?.charAt(0)?.toUpperCase() || 'P'}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#1a2e20',
                        }}
                      >
                        {rev.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: '#16a34a',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                        }}
                      >
                        <CheckCircle2 size={12} />
                        <span>{rev.role || 'Verified Patient'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      backgroundColor: rev.isApproved !== false ? '#e6f4ea' : '#fee2e2',
                      color: rev.isApproved !== false ? '#166534' : '#991b1b',
                      border: `1px solid ${rev.isApproved !== false ? '#bbf7d0' : '#fecaca'}`,
                    }}
                  >
                    {rev.isApproved !== false ? '● Live on Web' : '○ Hidden'}
                  </span>
                </div>

                {/* Stars & Treatment Tag */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        color={i < (rev.rating || 5) ? '#f59e0b' : '#d1d5db'}
                        fill={i < (rev.rating || 5) ? '#f59e0b' : 'none'}
                      />
                    ))}
                  </div>

                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#92400e',
                      backgroundColor: '#fef3c7',
                      padding: '2px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    {rev.treatment || 'Ayurvedic Care'}
                  </span>
                </div>

                {/* Comment */}
                <p
                  style={{
                    fontSize: '0.86rem',
                    color: '#374151',
                    lineHeight: 1.55,
                    fontStyle: 'italic',
                    margin: 0,
                  }}
                >
                  "{rev.comment}"
                </p>
              </div>

              {/* Card Bottom: Date, Source, and Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid #f3ece0',
                  fontSize: '0.75rem',
                  color: '#708375',
                }}
              >
                <div>
                  <span>{rev.createdAt}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {/* Toggle Approval Button */}
                  <button
                    onClick={() => toggleReviewApproval(rev.id || rev._backendId, rev.isApproved !== false)}
                    title={rev.isApproved !== false ? 'Hide from website' : 'Publish to website'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '5px 9px',
                      borderRadius: '6px',
                      border: '1px solid #d4cbb8',
                      backgroundColor: '#faf8f2',
                      color: rev.isApproved !== false ? '#4b5563' : '#1e4d2b',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {rev.isApproved !== false ? <EyeOff size={13} /> : <Eye size={13} />}
                    <span>{rev.isApproved !== false ? 'Hide' : 'Publish'}</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete review from "${rev.name}"?`)) {
                        deleteReview(rev.id || rev._backendId);
                      }
                    }}
                    title="Delete Review"
                    style={{
                      padding: '5px 7px',
                      borderRadius: '6px',
                      border: '1px solid #fee2e2',
                      backgroundColor: '#fff5f5',
                      color: '#dc2626',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Direct Review Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #e7decb',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid #f0e9dc',
                paddingBottom: '12px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem',
                    color: '#1a2e20',
                    margin: 0,
                  }}
                >
                  Record Direct Patient Review
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#708375', margin: '3px 0 0 0' }}>
                  Add direct patient feedback collected at the clinic desk.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#657769',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                  Rating (1 to 5 Stars) *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                      }}
                    >
                      <Star
                        size={24}
                        color={star <= (hoverRating || formData.rating) ? '#f59e0b' : '#d1d5db'}
                        fill={star <= (hoverRating || formData.rating) ? '#f59e0b' : 'none'}
                      />
                    </button>
                  ))}
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e4d2b', marginLeft: '6px' }}>
                    {formData.rating} Stars
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Krishnan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d4cbb8',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Verified Patient"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #d4cbb8',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                  Therapy / Treatment Received
                </label>
                <select
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d4cbb8',
                    fontSize: '0.85rem',
                    outline: 'none',
                    backgroundColor: '#fff',
                  }}
                >
                  {treatmentOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px' }}>
                  Customer Review Comment *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter patient feedback, experience, and therapy results..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d4cbb8',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  marginTop: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid #f0e9dc',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d4cbb8',
                    backgroundColor: '#faf8f2',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#1e4d2b',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {submitting && <Loader2 size={16} className="spinner" />}
                  <span>Publish Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
