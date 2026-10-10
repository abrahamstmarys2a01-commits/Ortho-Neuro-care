import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Sparkles, 
  MessageSquare, 
  Star,
  BarChart3, 
  Settings,
  Globe2,
  Leaf
} from 'lucide-react';

export const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { activeTab, setActiveTab, enquiries, appointments, reviews } = useApp();

  const pendingEnquiriesCount = enquiries.filter(e => e.status === 'New Lead' || e.status === 'Pending Contact').length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck, badge: pendingAppointmentsCount > 0 ? pendingAppointmentsCount : null },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: pendingEnquiriesCount > 0 ? pendingEnquiriesCount : null },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: reviews && reviews.length > 0 ? reviews.length : null },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <aside 
      className={`erp-sidebar ${mobileMenuOpen ? 'open' : ''}`}
      style={{
        width: '240px',
        minWidth: '240px',
        backgroundColor: '#f5f1e8',
        borderRight: '1px solid #e8dfcd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        userSelect: 'none'
      }}
    >
      {/* Top Logo & Brand */}
      <div>
        <div 
          onClick={() => handleNavClick('dashboard')}
          style={{
            padding: '24px 20px 18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            borderBottom: '1px solid #ede4d4'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#1e4d2b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#eaf2eb',
            boxShadow: '0 4px 10px rgba(30, 77, 43, 0.2)'
          }}>
            {/* Ayurvedic Leaf Logo Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7 6 3 11 3 16C3 20.4 6.6 24 11 24C11.3 24 11.7 24 12 23.9C12.3 24 12.7 24 13 24C17.4 24 21 20.4 21 16C21 11 17 6 12 2Z" fill="#88c599"/>
              <path d="M12 2V23C12 23 18 19 18 15C18 11 15 7 12 2Z" fill="#ffffff" fillOpacity="0.85"/>
              <path d="M12 2V23C12 23 6 19 6 15C6 11 9 7 12 2Z" fill="#3a8a52"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.22rem',
              fontWeight: 700,
              color: '#1e4d2b',
              lineHeight: 1.15
            }}>
              Auir Vethik
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: '#708375',
              letterSpacing: '0.04em',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>
              Ayurveda & Wellness
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? '#1e4d2b' : 'transparent',
                  color: isActive ? '#ffffff' : '#3c4e41',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.16s ease',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 12px rgba(30, 77, 43, 0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                  <Icon 
                    size={17} 
                    color={isActive ? '#ffffff' : '#576b5b'} 
                    strokeWidth={isActive ? 2.4 : 1.9}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    backgroundColor: isActive ? '#ffffff' : '#c07d2b',
                    color: isActive ? '#1e4d2b' : '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    minWidth: '18px',
                    textAlign: 'center'
                  }}>
                    {item.badge}
                  </span>
                )}

                {item.pulse && !isActive && (
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#1b7a43',
                    animation: 'pulseSubtle 2s infinite'
                  }}></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Quote & Leaf Flourish */}
      <div style={{
        padding: '20px 18px',
        margin: '12px',
        backgroundColor: '#eee6d5',
        borderRadius: '14px',
        border: '1px solid #ded5c2',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          right: '-8px',
          bottom: '-8px',
          opacity: 0.15,
          pointerEvents: 'none'
        }}>
          <Leaf size={60} color="#1e4d2b" />
        </div>

        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.86rem',
          fontStyle: 'italic',
          color: '#344738',
          lineHeight: 1.35,
          marginBottom: '6px'
        }}>
          “Wellness is a journey, not a destination.”
        </div>
        <div style={{
          fontSize: '0.68rem',
          color: '#7b8d7e',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Auir Vethik Holistic
        </div>
      </div>
    </aside>
  );
};
