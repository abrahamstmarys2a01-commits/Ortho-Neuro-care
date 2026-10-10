import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Search, 
  Filter, 
  Globe, 
  Clock, 
  User, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Phone, 
  MessageCircle, 
  Sparkles 
} from 'lucide-react';

export const AppointmentsList = () => {
  const { 
    appointments, 
    updateAppointmentStatus, 
    rescheduleAppointment, 
    deleteAppointment, 
    setActiveTab, 
    searchQuery,
    isSyncing,
    syncLiveBackend
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleModalApt, setRescheduleModalApt] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');

  const filteredAppointments = appointments.filter((apt) => {
    const q = (localSearch || searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      apt.customerName?.toLowerCase().includes(q) ||
      apt.customerMobile?.toLowerCase().includes(q) ||
      apt.service?.toLowerCase().includes(q) ||
      apt.id?.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSource =
      sourceFilter === 'All' ||
      (sourceFilter === 'Online' && (apt.source?.includes('ortho-neuro-care') || apt.source === 'Website')) ||
      apt.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'confirmed';
      case 'pending':
        return 'pending';
      case 'rescheduled':
        return 'rescheduled';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'confirmed';
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (rescheduleModalApt && newDate && newTime) {
      rescheduleAppointment(rescheduleModalApt.id, newDate, newTime);
      setRescheduleModalApt(null);
    }
  };

  const handleWhatsAppContact = (apt) => {
    const cleanPhone = apt.customerMobile?.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Hello ${apt.customerName}, this is regarding your ${apt.service} appointment #${apt.id} with Auir Vethik Ayurveda & Wellness scheduled on ${apt.date} at ${apt.time}.`
    );
    window.open(`https://wa.me/${cleanPhone || '919876543210'}?text=${message}`, '_blank');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.9rem',
            color: '#1a2e20',
            fontWeight: 700,
            marginBottom: '4px'
          }}>
            Appointments
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
            Manage appointments, online patient bookings, and schedules.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => syncLiveBackend(false)}
            disabled={isSyncing}
            className="btn-outline"
            style={{ padding: '9px 15px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Fetch latest online appointments from database"
          >
            <RefreshCw size={15} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
            {isSyncing ? 'Syncing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '18px',
        backgroundColor: '#ffffff',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid #e7decb'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          {/* Status Filter */}
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Source Filter */}
          <select
            className="form-select"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
          >
            <option value="All">All Sources</option>
            <option value="Online">ortho-neuro-care.vercel.app</option>
            <option value="Website">Website</option>
            <option value="Walk-in">Walk-in</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#829586' }} />
          <input
            type="text"
            placeholder="Search by name, phone or service..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="form-input"
            style={{ padding: '6px 12px 6px 34px', fontSize: '0.82rem', borderRadius: '9999px' }}
          />
        </div>
      </div>

      {/* Appointments Table */}
      <div className="erp-table-container">
        <table className="erp-table">
          <thead>
            <tr>
              <th># ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date &amp; Time</th>
              <th>Source</th>
              <th>Status</th>
              <th>Fee</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#7a8c7e' }}>
                  No appointments found matching current filters.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td style={{ fontWeight: 700, color: '#1e4d2b' }}>
                    {apt.id}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: '#eaf2eb',
                        color: '#1e4d2b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {apt.customerName?.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{apt.customerName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#708273' }}>{apt.customerMobile}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{apt.service}</div>
                    <div style={{ fontSize: '0.7rem', color: '#88988b' }}>{apt.therapist || 'Dr. Anand Vaidya'}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{apt.date}</div>
                    <div style={{ fontSize: '0.72rem', color: '#708273' }}>{apt.time}</div>
                  </td>
                  <td>
                    {apt.source?.includes('ortho-neuro-care') ? (
                      <span className="badge-online-source">
                        <Globe size={10} /> ortho-neuro-care
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.76rem', color: '#5b6e60', backgroundColor: '#f0ebd8', padding: '2px 8px', borderRadius: '4px' }}>
                        {apt.source || 'Direct'}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`badge-status ${getStatusClass(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#1e4d2b' }}>
                    ₹{apt.price || 500}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {/* Status changer buttons */}
                      {apt.status === 'Pending' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                          className="btn-icon"
                          title="Confirm Appointment"
                          style={{ color: '#1b7a43' }}
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setRescheduleModalApt(apt);
                          setNewDate(apt.date);
                          setNewTime(apt.time);
                        }}
                        className="btn-icon"
                        title="Reschedule Appointment"
                        style={{ color: '#2f65b9' }}
                      >
                        <RefreshCw size={15} />
                      </button>

                      <button
                        onClick={() => handleWhatsAppContact(apt)}
                        className="btn-icon"
                        title="Contact via WhatsApp"
                        style={{ color: '#25D366' }}
                      >
                        <MessageCircle size={16} />
                      </button>

                      <button
                        onClick={() => deleteAppointment(apt.id)}
                        className="btn-icon"
                        title="Delete Appointment"
                        style={{ color: '#c93b3b' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalApt && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '440px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#1e4d2b', marginBottom: '14px', fontFamily: "'Playfair Display', serif" }}>
              Reschedule Appointment
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#5a6d5f', marginBottom: '16px' }}>
              Select new date and time for <strong>{rescheduleModalApt.customerName}</strong> ({rescheduleModalApt.service}).
            </p>
            <form onSubmit={handleRescheduleSubmit}>
              <div className="form-group">
                <label className="form-label">New Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Time Slot</label>
                <select
                  className="form-select"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                >
                  {['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM', '02:00 PM', '03:00 PM', '04:30 PM', '05:30 PM'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setRescheduleModalApt(null)}
                  className="btn-subtle"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
