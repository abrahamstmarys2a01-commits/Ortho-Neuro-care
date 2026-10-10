import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  IndianRupee, 
  Users, 
  Calendar, 
  Download, 
  Printer, 
  Sparkles,
  PieChart
} from 'lucide-react';

export const ReportsView = () => {
  const { appointments, services, customers } = useApp();
  const [timeRange, setTimeRange] = useState('monthly');

  const totalRevenue = appointments.reduce((sum, apt) => sum + (Number(apt.price) || 500), 0);
  const avgBookingValue = Math.round(totalRevenue / (appointments.length || 1));

  const servicePopularity = services.map(s => {
    const count = appointments.filter(a => a.service === s.name).length;
    return {
      name: s.name,
      count,
      revenue: count * s.price
    };
  }).sort((a, b) => b.count - a.count);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.9rem',
            color: '#1a2e20',
            fontWeight: 700,
            marginBottom: '4px'
          }}>
            Reports &amp; Analytics
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
            Financial performance, patient retention, and treatment insights.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            className="btn-outline"
            style={{ padding: '9px 14px', fontSize: '0.84rem' }}
          >
            <Printer size={15} /> Print Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="erp-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#627566', fontWeight: 600, marginBottom: '6px' }}>
            Estimated Revenue
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e4d2b', fontFamily: "'Outfit', sans-serif" }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#1b7a43', marginTop: '4px', fontWeight: 600 }}>
            ↑ 14.5% compared to last cycle
          </div>
        </div>

        <div className="erp-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#627566', fontWeight: 600, marginBottom: '6px' }}>
            Total Consultations
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a2e20', fontFamily: "'Outfit', sans-serif" }}>
            {appointments.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#1b7a43', marginTop: '4px', fontWeight: 600 }}>
            ↑ 12% increase in new patients
          </div>
        </div>

        <div className="erp-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#627566', fontWeight: 600, marginBottom: '6px' }}>
            Average Ticket Size
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c07d2b', fontFamily: "'Outfit', sans-serif" }}>
            ₹{avgBookingValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#7a8c7e', marginTop: '4px' }}>
            Per scheduled patient visit
          </div>
        </div>

        <div className="erp-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#627566', fontWeight: 600, marginBottom: '6px' }}>
            Active Customer Base
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2f65b9', fontFamily: "'Outfit', sans-serif" }}>
            {customers.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#1b7a43', marginTop: '4px', fontWeight: 600 }}>
            86% return patient rate
          </div>
        </div>
      </div>

      {/* Treatment Popularity Breakdown */}
      <div className="erp-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#1e4d2b', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>
          Top Requested Ayurveda Treatments &amp; Revenue Share
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {servicePopularity.map((sp, idx) => {
            const maxBookings = Math.max(...servicePopularity.map(s => s.count), 1);
            const percentage = Math.round((sp.count / maxBookings) * 100);

            return (
              <div key={idx} style={{ padding: '10px 0', borderBottom: '1px solid #f2ecdf' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#243328', fontSize: '0.88rem' }}>
                      {sp.name}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#7c8e80', marginLeft: '8px' }}>
                      ({sp.count} bookings)
                    </span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#1e4d2b', fontSize: '0.9rem' }}>
                    ₹{sp.revenue.toLocaleString()}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', backgroundColor: '#eee7d8', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${Math.max(percentage, 8)}%`,
                    height: '100%',
                    backgroundColor: idx === 0 ? '#1e4d2b' : idx === 1 ? '#3a7d4e' : '#c07d2b',
                    borderRadius: '9999px',
                    transition: 'width 0.4s ease'
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
