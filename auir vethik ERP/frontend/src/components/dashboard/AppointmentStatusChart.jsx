import React from 'react';
import { useApp } from '../../context/AppContext';

export const AppointmentStatusChart = () => {
  const { appointments } = useApp();

  // Dynamic counts calculated strictly from real appointments in database
  const completedCount = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Completed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;
  const rescheduledCount = appointments.filter(a => a.status === 'Rescheduled').length;
  
  const total = appointments.length;

  const data = [
    { label: 'Completed', count: completedCount, color: '#1e4d2b', dotColor: '#1e4d2b' },
    { label: 'Pending', count: pendingCount, color: '#c07d2b', dotColor: '#c07d2b' },
    { label: 'Cancelled', count: cancelledCount, color: '#c93b3b', dotColor: '#c93b3b' },
    { label: 'Rescheduled', count: rescheduledCount, color: '#2f65b9', dotColor: '#2f65b9' },
  ];

  // SVG Donut calculation
  const radius = 55;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="erp-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#1e4d2b', margin: 0, fontWeight: 700 }}>
          Appointment Status
        </h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flex: 1 }}>
        {/* Donut graphic */}
        <div style={{ position: 'relative', width: '140px', height: '140px' }}>
          <svg viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            {data.map((item, idx) => {
              const percent = total > 0 ? (item.count / total) : 0.25;
              const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
              const strokeDashoffset = -circumference * accumulatedPercent;
              accumulatedPercent += percent;

              return (
                <circle
                  key={idx}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none'
          }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1a2a1f', fontFamily: "'Outfit', sans-serif" }}>
              {total}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#88988b', fontWeight: 600, textTransform: 'uppercase' }}>
              Total
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '130px' }}>
          {data.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></span>
                <span style={{ color: '#45584b', fontWeight: 500 }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 700, color: '#243328' }}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
