import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  User, 
  Sparkles, 
  Radio, 
  Calendar, 
  CheckCircle, 
  ExternalLink,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    notifications, 
    setNotifications, 
    setActiveTab, 
    receiveExternalBooking 
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const simulateQuickBooking = () => {
    const demoPatients = [
      { name: 'Dr. Vigneshwaran', phone: '+91 98409 77123', service: 'Ayurveda Consultation', price: 500, message: 'Referred from Ortho Neuro care for cervical spine balance.' },
      { name: 'Dr. Saravanan K', phone: '+91 97890 12345', service: 'Rejuvenation Therapy', price: 2000, message: 'Online booking via https://ortho-neuro-care.vercel.app/' },
      { name: 'Kavitha Natarajan', phone: '+91 94441 55667', service: 'Detox Program', price: 1500, message: 'Seasonal panchakarma detox requested.' }
    ];
    const patient = demoPatients[Math.floor(Math.random() * demoPatients.length)];
    receiveExternalBooking({
      customerName: patient.name,
      customerMobile: patient.phone,
      service: patient.service,
      price: patient.price,
      date: new Date().toISOString().split('T')[0],
      time: '11:30 AM',
      source: 'ortho-neuro-care.vercel.app',
      message: patient.message
    });
  };

  return (
    <header className="erp-navbar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      backgroundColor: '#f7f4ec',
      borderBottom: '1px solid #e9e2d3',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Mobile Menu & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, maxWidth: '650px' }}>
        <button 
          className="btn-icon mobile-only-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none' }}
          title="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Search Bar matching the screenshot */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px'
        }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '14px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#849688'
            }} 
          />
          <input
            type="text"
            placeholder="Search customers, appointments, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 16px 9px 38px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5dcce',
              borderRadius: '9999px',
              fontSize: '0.86rem',
              color: '#243328',
              outline: 'none',
              transition: 'border 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#94a397',
                fontSize: '12px'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>


        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="btn-icon"
            style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              border: '1px solid #e5dcce',
              borderRadius: '50%',
              width: '38px',
              height: '38px'
            }}
            aria-label="Notifications"
          >
            <Bell size={18} color="#405345" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                backgroundColor: '#c93b3b',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(201, 59, 59, 0.3)'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '340px',
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              border: '1px solid #e8decb',
              padding: '14px',
              zIndex: 100,
              animation: 'fadeIn 0.15s ease-out'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #f0e9dc' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e4d2b' }}>Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    style={{ background: 'none', border: 'none', color: '#1e4d2b', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map((n) => (
                  <div 
                    key={n.id}
                    style={{
                      padding: '9px 10px',
                      borderRadius: '8px',
                      backgroundColor: n.unread ? '#fbf8f0' : '#ffffff',
                      borderLeft: n.unread ? '3px solid #1e4d2b' : '3px solid transparent',
                      border: '1px solid #f0ebd8'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#243328' }}>{n.title}</span>
                      <span style={{ fontSize: '0.68rem', color: '#88988b' }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#556858', margin: 0 }}>{n.desc}</p>
                    {n.source && (
                      <span style={{ display: 'inline-block', marginTop: '4px', fontSize: '0.68rem', color: '#1b7a43', fontWeight: 600 }}>
                        {n.source}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile matching screenshot */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px 4px 6px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5dcce',
              borderRadius: '9999px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1e4d2b',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              <User size={18} />
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#243328' }}>Admin</div>
              <div style={{ fontSize: '0.7rem', color: '#7a8c7e' }}>Super Admin</div>
            </div>
            <ChevronDown size={14} color="#7a8c7e" />
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '46px',
              width: '200px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e8decb',
              padding: '8px',
              zIndex: 100
            }}>
              <button
                onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#243328'
                }}
              >
                Clinic Settings
              </button>
              <div style={{ height: '1px', background: '#f0ebd8', margin: '4px 0' }}></div>
              <button
                onClick={() => {
                  alert('Auir Vethik ERP is running in full admin mode.');
                  setShowProfileMenu(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#c93b3b'
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
