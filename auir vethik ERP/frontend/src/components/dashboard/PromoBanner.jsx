import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromoBanner = () => {
  const { setActiveTab } = useApp();

  return (
    <div
      className="erp-card-warm"
      style={{
        padding: '16px 20px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        backgroundColor: '#eee6d4',
        border: '1px solid #dfd5be',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Left Image */}
      <div style={{
        width: '100px',
        height: '80px',
        borderRadius: '10px',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
        border: '1px solid #d4c8b0'
      }}>
        <img
          src="/images/ayurveda_banner.jpg"
          alt="Ayurvedic Products"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            // Fallback to botanical pattern
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Right Content */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '0.74rem',
          fontWeight: 700,
          color: '#1e4d2b',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Sparkles size={12} /> Pure. Natural. Powerful.
        </div>
        <p style={{
          fontSize: '0.82rem',
          color: '#425345',
          margin: '0 0 10px 0',
          lineHeight: 1.35
        }}>
          Holistic herbal care, Panchakarma rejuvenation, and Ortho Neuro therapeutic treatments.
        </p>
        <button
          onClick={() => setActiveTab('services')}
          className="btn-primary"
          style={{
            padding: '5px 14px',
            fontSize: '0.78rem',
            backgroundColor: '#1e4d2b'
          }}
        >
          View Services <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
