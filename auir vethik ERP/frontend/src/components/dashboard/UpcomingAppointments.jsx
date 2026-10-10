import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, User, Calendar, Clock, Globe } from 'lucide-react';

export const UpcomingAppointments = () => {
  const { appointments, setActiveTab, updateAppointmentStatus } = useApp();

  const displayedAppointments = appointments.slice(0, 4);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'confirmed';
      case 'pending':
        return 'pending';
      case 'rescheduled':
        return 'rescheduled';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'confirmed';
    }
  };

  return (
    <div className="erp-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#1e4d2b', margin: 0, fontWeight: 700 }}>
          Upcoming Appointments
        </h3>
        <button
          onClick={() => setActiveTab('appointments')}
          style={{
            background: 'none',
            border: 'none',
            color: '#1e4d2b',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          View All <ArrowRight size={13} />
        </button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, justifyContent: 'space-around' }}>
        {displayedAppointments.map((apt) => (
          <div
            key={apt.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              backgroundColor: '#fbf8f0',
              borderRadius: '10px',
              border: '1px solid #f0e8d5',
              transition: 'background 0.15s ease'
            }}
          >
            {/* Left User avatar & details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#e6ede7',
                color: '#1e4d2b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                <User size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#243328' }}>
                    {apt.customerName}
                  </span>
                  {apt.source === 'ortho-neuro-care.vercel.app' && (
                    <span 
                      className="badge-online-source" 
                      title="Direct booking from ortho-neuro-care.vercel.app"
                    >
                      <Globe size={10} /> Online
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#687b6d', marginTop: '1px' }}>
                  {apt.service}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#90a094', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span>{apt.date}</span>
                  <span>•</span>
                  <span>{apt.time}</span>
                </div>
              </div>
            </div>

            {/* Right Status Badge & Quick Confirm for pending */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <span className={`badge-status ${getStatusClass(apt.status)}`}>
                {apt.status}
              </span>

              {apt.status === 'Pending' && (
                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                  style={{
                    background: '#1e4d2b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Accept and confirm booking"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
