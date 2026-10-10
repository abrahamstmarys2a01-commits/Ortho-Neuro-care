import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Leaf, 
  TrendingUp, 
  TrendingDown, 
  Minus 
} from 'lucide-react';

export const StatsGrid = () => {
  const { appointments, customers, enquiries, services, setActiveTab } = useApp();

  const totalAppointmentsCount = appointments.length;
  const customersCount = customers.length;
  const pendingEnquiriesCount = enquiries.filter(e => e.status !== 'Converted').length;
  const servicesCount = services.length;

  const cards = [
    {
      title: 'Total Appointments',
      value: totalAppointmentsCount,
      change: '100% Real',
      trend: 'up',
      subtitle: 'Live DB Sync',
      icon: Calendar,
      iconBg: '#eaf4ec',
      iconColor: '#1e4d2b',
      onClick: () => setActiveTab('appointments')
    },
    {
      title: 'Customers',
      value: customersCount,
      change: 'Active',
      trend: 'up',
      subtitle: 'Unique Patients',
      icon: Users,
      iconBg: '#fef5e7',
      iconColor: '#c07d2b',
      onClick: () => setActiveTab('customers')
    },
    {
      title: 'Pending Enquiries',
      value: pendingEnquiriesCount,
      change: pendingEnquiriesCount > 0 ? 'Action needed' : 'All Clear',
      trend: pendingEnquiriesCount > 0 ? 'down' : 'neutral',
      subtitle: 'Web Leads',
      icon: MessageSquare,
      iconBg: '#eaf2f8',
      iconColor: '#2b7ec0',
      onClick: () => setActiveTab('enquiries')
    },
    {
      title: 'Services',
      value: servicesCount,
      change: null,
      trend: 'neutral',
      subtitle: 'Active Therapies',
      icon: Leaf,
      iconBg: '#f3e8f7',
      iconColor: '#7b2bc0',
      onClick: () => setActiveTab('services')
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            onClick={card.onClick}
            className="erp-card"
            style={{
              padding: '18px 16px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              background: '#ffffff'
            }}
          >
            {/* Top row with icon & title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: card.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.iconColor
              }}>
                <Icon size={18} strokeWidth={2.2} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5b6d60' }}>
                {card.title}
              </span>
            </div>

            {/* Main Value */}
            <div style={{
              fontSize: '1.9rem',
              fontWeight: 700,
              color: '#1a2a1f',
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1.1,
              marginBottom: '8px'
            }}>
              {card.value}
            </div>

            {/* Growth indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem' }}>
              {card.trend === 'up' && (
                <>
                  <span style={{ color: '#1b7a43', display: 'inline-flex', alignItems: 'center', fontWeight: 700 }}>
                    <TrendingUp size={13} style={{ marginRight: '2px' }} /> ↑ {card.change}
                  </span>
                  <span style={{ color: '#88988b' }}>{card.subtitle}</span>
                </>
              )}
              {card.trend === 'down' && (
                <>
                  <span style={{ color: '#1b7a43', display: 'inline-flex', alignItems: 'center', fontWeight: 700 }}>
                    <TrendingDown size={13} style={{ marginRight: '2px' }} /> ↓ {card.change}
                  </span>
                  <span style={{ color: '#88988b' }}>{card.subtitle}</span>
                </>
              )}
              {card.trend === 'neutral' && (
                <span style={{ color: '#88988b', display: 'inline-flex', alignItems: 'center' }}>
                  <Minus size={12} style={{ marginRight: '2px' }} /> {card.subtitle}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
