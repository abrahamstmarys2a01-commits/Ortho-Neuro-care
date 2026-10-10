import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MonthlyAppointmentsChart = () => {
  const { appointments } = useApp();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const width = 440;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  
  // Last 6 months dynamic window
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyData.push({
      month: monthNames[d.getMonth()],
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
      count: 0,
    });
  }

  // Aggregate real appointment counts
  appointments.forEach((apt) => {
    if (apt.date) {
      const d = new Date(apt.date);
      if (!isNaN(d.getTime())) {
        const match = monthlyData.find(
          (m) => m.monthIndex === d.getMonth() && m.year === d.getFullYear()
        );
        if (match) match.count++;
      }
    }
  });

  const maxCount = Math.max(8, ...monthlyData.map((m) => m.count));
  const points = monthlyData.map((item, idx) => {
    const x = paddingX + (idx / (monthlyData.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (item.count / maxCount) * (height - paddingY * 2);
    return { ...item, x, y };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="erp-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#1e4d2b', margin: 0, fontWeight: 700 }}>
          Monthly Appointments
        </h3>
        <span style={{ fontSize: '0.74rem', color: '#829385', backgroundColor: '#f5f0e4', padding: '3px 8px', borderRadius: '6px' }}>
          Live Dynamic Trend
        </span>
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e4d2b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1e4d2b" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, Math.round(maxCount / 2), maxCount].map((val, idx) => {
            const y = height - paddingY - (idx / 2) * (height - paddingY * 2);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#efe8db"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  fontSize="9"
                  fill="#9aa99c"
                  textAnchor="end"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#greenGrad)" />

          {/* Line Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#1e4d2b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.month === pt.month ? 6 : 4}
                fill="#ffffff"
                stroke="#1e4d2b"
                strokeWidth="2.5"
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* X Axis Labels */}
              <text
                x={pt.x}
                y={height - 6}
                fontSize="9"
                fill="#788b7d"
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', sans-serif"
              >
                {pt.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100 - 24}%`,
              transform: 'translate(-50%, -100%)',
              backgroundColor: '#1e4d2b',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              zIndex: 10
            }}
          >
            {hoveredPoint.month}: {hoveredPoint.count} appointments
          </div>
        )}
      </div>
    </div>
  );
};
