import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatsGrid } from './StatsGrid';
import { MonthlyAppointmentsChart } from './MonthlyAppointmentsChart';
import { AppointmentStatusChart } from './AppointmentStatusChart';
import { UpcomingAppointments } from './UpcomingAppointments';
import { QuickActions } from './QuickActions';
import { PromoBanner } from './PromoBanner';
import { Calendar, Clock, Leaf } from 'lucide-react';

export const DashboardView = ({ onOpenAddCustomer, onOpenAddService }) => {
  // Current dynamic time or default format
  const todayStr = '10 Oct 2025';
  const timeStr = 'Friday, 12:45 PM';

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Welcome Bar matching screenshot */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.9rem',
            color: '#1a2e20',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '6px'
          }}>
            Good Morning, Admin!
          </h1>
          <p style={{
            fontSize: '0.9rem',
            color: '#657769',
            margin: 0
          }}>
            Here's what's happening with your Auir Vethik Ayurveda &amp; Wellness today.
          </p>
        </div>

        {/* Date Widget matching screenshot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#ffffff',
          padding: '8px 16px',
          borderRadius: '12px',
          border: '1px solid #e7decb',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#eaf2eb',
            color: '#1e4d2b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calendar size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#243328' }}>
              {todayStr}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#7a8c7e' }}>
              {timeStr}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <StatsGrid />

      {/* Middle 3-Column Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div>
          <MonthlyAppointmentsChart />
        </div>
        <div>
          <AppointmentStatusChart />
        </div>
        <div>
          <UpcomingAppointments />
        </div>
      </div>

      {/* Bottom 2-Column Section (Quick Actions & Promo Banner) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        <div>
          <QuickActions 
            onOpenAddCustomer={onOpenAddCustomer}
            onOpenAddService={onOpenAddService}
          />
        </div>
        <div>
          <PromoBanner />
        </div>
      </div>
    </div>
  );
};
