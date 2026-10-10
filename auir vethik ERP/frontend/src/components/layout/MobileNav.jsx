import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Users, CalendarCheck, MoreHorizontal, MessageSquare } from 'lucide-react';

export const MobileNav = ({ setMobileMenuOpen }) => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'more', label: 'More', icon: MoreHorizontal, action: () => setMobileMenuOpen(true) },
  ];

  return (
    <nav className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e7dfce',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 60,
      padding: '4px 8px',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.04)'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                setActiveTab(item.id);
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              border: 'none',
              background: 'none',
              color: isActive ? '#1e4d2b' : '#708375',
              cursor: 'pointer',
              padding: '4px 10px',
              borderRadius: '8px'
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
            <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
