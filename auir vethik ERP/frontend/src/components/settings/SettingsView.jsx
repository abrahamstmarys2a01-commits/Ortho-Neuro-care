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
  RefreshCcw,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const SettingsView = () => {
  const { showToast, playSoundChime, credentials, changePassword, logout } = useApp();

  const [clinicConfig, setClinicConfig] = useState({
    clinicName: 'Ortho Neuro Care & Ayurvedic ERP',
    tagline: 'Advanced Orthopedic, Neurological & Holistic Ayurvedic Care',
    contactNumber: '+91 98765 43210',
    email: 'info@orthoneurocare.com',
    address: '14/2 Green Sanctuary Road, Guindy, Chennai - 600032',
    workingHours: '08:30 AM - 08:00 PM (Mon - Sun)',
    leadDoctor: 'Dr. Anand Vaidya, BAMS, MD (Ayurveda)',
    autoWhatsAppAlerts: true,
    soundAlerts: true,
    allowOnlineSync: true
  });

  // Password state
  const [adminUsername, setAdminUsername] = useState(credentials?.username || 'admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleSaveClinic = (e) => {
    e.preventDefault();
    showToast('Settings Saved', 'Clinic profile and notification preferences have been saved.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }

    if (!newPassword) {
      setPasswordError('Please enter a new password.');
      return;
    }

    if (newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setIsUpdatingPassword(true);

    setTimeout(() => {
      const res = changePassword(currentPassword, newPassword, adminUsername);
      setIsUpdatingPassword(false);

      if (res.success) {
        setPasswordSuccess('Password successfully updated! Your new password is now active.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(res.message || 'Failed to update password.');
      }
    }, 400);
  };

  const handleResetData = () => {
    if (window.confirm('Clear local cache and refresh all data from database?')) {
      const auth = localStorage.getItem('ortho_erp_session');
      const creds = localStorage.getItem('ortho_erp_auth_credentials');
      localStorage.clear();
      if (auth) localStorage.setItem('ortho_erp_session', auth);
      if (creds) localStorage.setItem('ortho_erp_auth_credentials', creds);
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.9rem',
          color: '#1a2e20',
          fontWeight: 700,
          marginBottom: '4px'
        }}>
          System &amp; Security Settings
        </h1>
        <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
          Manage your Ortho Neuro Care ERP security credentials, clinic profile, and notification rules.
        </p>
      </div>

      {/* SECTION 1: ADMIN SECURITY & PASSWORD MANAGEMENT (Requested by user) */}
      <div className="erp-card" style={{
        padding: '26px',
        marginBottom: '24px',
        border: '1.5px solid #d4c7b0',
        boxShadow: '0 8px 24px -4px rgba(30, 77, 43, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid #f0ebd8', paddingBottom: '12px' }}>
          <div>
            <h3 style={{
              fontSize: '1.15rem',
              color: '#1e4d2b',
              margin: '0 0 4px 0',
              fontFamily: "'Playfair Display', serif",
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700
            }}>
              <ShieldCheck size={20} color="#1e4d2b" /> Admin Credentials &amp; Password Management
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#6a7d70', margin: 0 }}>
              Change the administrator username or password used to login to this ERP portal.
            </p>
          </div>

          <span style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: '#eaf4ec',
            color: '#1e4d2b',
            border: '1px solid #c7e5ce'
          }}>
            Active User: {credentials?.username || 'admin'}
          </span>
        </div>

        {/* Feedback messages */}
        {passwordError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.85rem'
          }}>
            <AlertCircle size={16} />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.85rem'
          }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {/* Admin Username Field */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#526657" /> Admin Username
              </label>
              <input
                type="text"
                className="form-input"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>

            {/* Current Password Field */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <KeyRound size={14} color="#526657" /> Current Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password (default: admin123)"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#657769',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title={showCurrentPassword ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {/* New Password */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} color="#526657" /> New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter minimum 4 characters"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#657769',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} color="#526657" /> Confirm New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#657769',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '12px',
            borderTop: '1px dashed #e8dfcd'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#708375' }}>
              💡 Changes apply immediately. After changing, logging out will require the new password.
            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="btn-primary"
              style={{
                padding: '9px 20px',
                fontSize: '0.88rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={15} />
              {isUpdatingPassword ? 'Updating Credentials...' : 'Update & Save Password'}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: CLINIC PROFILE INFORMATION */}
      <form onSubmit={handleSaveClinic}>
        <div className="erp-card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#1e4d2b', marginBottom: '16px', fontFamily: "'Playfair Display', serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} /> Clinic Information &amp; Branding
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
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
            <label className="form-label">Chief Medical Officer / Consulting Vaidya</label>
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

        {/* SECTION 3: NOTIFICATIONS & LIVE ALERT RULES */}
        <div className="erp-card" style={{ padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#1e4d2b', marginBottom: '16px', fontFamily: "'Playfair Display', serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} /> Online Booking Alerts &amp; Portal Sync
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#243328', fontSize: '0.88rem' }}>
                  Melodic Audio Chime on New Patient Booking
                </div>
                <div style={{ fontSize: '0.76rem', color: '#6d7f71' }}>
                  Plays gentle harmonized chime when appointments land from https://ortho-neuro-care-frontend.vercel.app/
                </div>
              </div>
              <button
                type="button"
                onClick={playSoundChime}
                className="btn-subtle"
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              >
                <Volume2 size={14} /> Test Melodic Chime
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f2ecdf' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#243328', fontSize: '0.88rem' }}>
                  Live Patient Portal Link
                </div>
                <div style={{ fontSize: '0.76rem', color: '#6d7f71' }}>
                  https://ortho-neuro-care-frontend.vercel.app/
                </div>
              </div>
              <a
                href="https://ortho-neuro-care-frontend.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-subtle"
                style={{ padding: '6px 12px', fontSize: '0.76rem', textDecoration: 'none', color: '#1e4d2b' }}
              >
                <ExternalLink size={13} /> Visit Site
              </a>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            onClick={handleResetData}
            className="btn-subtle"
            style={{ color: '#c93b3b' }}
          >
            <RefreshCcw size={14} /> Clear Cache &amp; Refresh Data
          </button>

          <button type="submit" className="btn-primary" style={{ padding: '10px 22px' }}>
            <Save size={16} /> Save Clinic Profile
          </button>
        </div>
      </form>
    </div>
  );
};
