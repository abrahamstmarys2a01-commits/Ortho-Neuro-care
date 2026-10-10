import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Building2, 
  Clock, 
  MessageSquare, 
  Save, 
  ShieldCheck, 
  Bell, 
  Volume2, 
  RefreshCcw 
} from 'lucide-react';

export const SettingsView = () => {
  const { showToast, playSoundChime } = useApp();

  const [clinicConfig, setClinicConfig] = useState({
    clinicName: 'Auir Vethik Ayurveda & Wellness Centre',
    tagline: 'Pure. Natural. Powerful. Holistic Healing & Panchakarma',
    contactNumber: '+91 98765 43210',
    email: 'contact@auirvethik.com',
    address: '14/2 Green Sanctuary Road, Guindy, Chennai - 600032',
    workingHours: '08:30 AM - 08:00 PM (Mon - Sun)',
    leadDoctor: 'Dr. Anand Vaidya, BAMS, MD (Ayurveda)',
    autoWhatsAppAlerts: true,
    soundAlerts: true,
    allowOnlineSync: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Settings Saved', 'Clinic profile and notification preferences have been saved.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data to default Auir Vethik mockup state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.9rem',
          color: '#1a2e20',
          fontWeight: 700,
          marginBottom: '4px'
        }}>
          Clinic Settings
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
          Manage your Ayurveda center profile, notification rules, and integration parameters.
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Clinic Info Card */}
        <div className="erp-card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#1e4d2b', marginBottom: '16px', fontFamily: "'Playfair Display', serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} /> Clinic Information
          </h3>

          <div className="form-group">
            <label className="form-label">Clinic Name</label>
            <input
              type="text"
              className="form-input"
              value={clinicConfig.clinicName}
              onChange={(e) => setClinicConfig({ ...clinicConfig, clinicName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline &amp; Philosophy</label>
            <input
              type="text"
              className="form-input"
              value={clinicConfig.tagline}
              onChange={(e) => setClinicConfig({ ...clinicConfig, tagline: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="text"
                className="form-input"
                value={clinicConfig.contactNumber}
                onChange={(e) => setClinicConfig({ ...clinicConfig, contactNumber: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input
                type="email"
                className="form-input"
                value={clinicConfig.email}
                onChange={(e) => setClinicConfig({ ...clinicConfig, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Chief Vaidya / Consulting Physician</label>
            <input
              type="text"
              className="form-input"
              value={clinicConfig.leadDoctor}
              onChange={(e) => setClinicConfig({ ...clinicConfig, leadDoctor: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address &amp; Operating Hours</label>
            <input
              type="text"
              className="form-input"
              value={clinicConfig.address}
              onChange={(e) => setClinicConfig({ ...clinicConfig, address: e.target.value })}
            />
          </div>
        </div>

        {/* Notifications & Live Alert Rules */}
        <div className="erp-card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#1e4d2b', marginBottom: '16px', fontFamily: "'Playfair Display', serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} /> Online Booking Alerts &amp; Audio
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#243328', fontSize: '0.88rem' }}>
                  Melodic Audio Chime on New Patient Booking
                </div>
                <div style={{ fontSize: '0.76rem', color: '#6d7f71' }}>
                  Plays gentle harmonized chime when appointments land from ortho-neuro-care.vercel.app
                </div>
              </div>
              <button
                type="button"
                onClick={playSoundChime}
                className="btn-subtle"
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
              >
                <Volume2 size={13} /> Test Sound
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f2ecdf' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#243328', fontSize: '0.88rem' }}>
                  Automatic WhatsApp Confirmation Prompt
                </div>
                <div style={{ fontSize: '0.76rem', color: '#6d7f71' }}>
                  Pre-fills appointment confirmation message for direct WhatsApp dispatch
                </div>
              </div>
              <input
                type="checkbox"
                checked={clinicConfig.autoWhatsAppAlerts}
                onChange={(e) => setClinicConfig({ ...clinicConfig, autoWhatsAppAlerts: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#1e4d2b', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleResetData}
            className="btn-subtle"
            style={{ color: '#c93b3b' }}
          >
            <RefreshCcw size={14} /> Reset Demo Data to Default
          </button>

          <button type="submit" className="btn-primary" style={{ padding: '10px 22px' }}>
            <Save size={16} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
