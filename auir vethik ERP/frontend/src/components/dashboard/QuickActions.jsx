import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserPlus, Sparkles, Globe, MessageSquare } from 'lucide-react';

export const QuickActions = ({ onOpenAddCustomer, onOpenAddService }) => {
  const { setActiveTab } = useApp();

  return (
    <div className="erp-card" style={{ padding: '18px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <h3 style={{ fontSize: '1.05rem', color: '#1e4d2b', margin: '0 0 14px 0', fontWeight: 700 }}>
        Quick Actions
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px'
      }}>
        <button
          onClick={onOpenAddCustomer}
          className="btn-primary"
          style={{ padding: '10px 14px', fontSize: '0.84rem' }}
        >
          <UserPlus size={15} /> Add Customer
        </button>

        <button
          onClick={onOpenAddService}
          className="btn-primary"
          style={{ padding: '10px 14px', fontSize: '0.84rem' }}
        >
          <Sparkles size={15} /> Add Service
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className="btn-primary"
          style={{ padding: '10px 14px', fontSize: '0.84rem' }}
        >
          <Sparkles size={15} /> View Appointments
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className="btn-primary"
          style={{ padding: '10px 14px', fontSize: '0.84rem' }}
        >
          <MessageSquare size={15} /> View Enquiries
        </button>
      </div>
    </div>
  );
};
