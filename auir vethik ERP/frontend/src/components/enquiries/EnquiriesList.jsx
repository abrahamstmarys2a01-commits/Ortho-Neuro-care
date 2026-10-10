import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Globe, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Search, 
  Plus, 
  Trash2,
  Sparkles
} from 'lucide-react';

export const EnquiriesList = () => {
  const { enquiries, convertEnquiryToAppointment, setActiveTab } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || (sourceFilter === 'Online' && e.source.includes('ortho-neuro-care')) || e.source === sourceFilter;
    const matchesSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search) || e.message.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSource && matchesSearch;
  });

  const handleWhatsApp = (enq) => {
    const cleanPhone = enq.phone?.replace(/\D/g, '');
    const msg = encodeURIComponent(`Vanakkam ${enq.name}! Thank you for reaching out to Auir Vethik Ayurveda & Wellness. Regarding your enquiry for ${enq.service || 'consultation'}: We would be delighted to assist you.`);
    window.open(`https://wa.me/${cleanPhone || '919876543210'}?text=${msg}`, '_blank');
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
            Enquiries &amp; Leads
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
            Live incoming customer inquiries and web portal leads.
          </p>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
          >
            <option value="All">All Status</option>
            <option value="New Lead">New Lead</option>
            <option value="Pending Contact">Pending Contact</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
          </select>

          <select
            className="form-select"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
          >
            <option value="All">All Sources</option>
            <option value="Online">ortho-neuro-care.vercel.app</option>
            <option value="Website">Website</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#829586' }} />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ padding: '6px 12px 6px 34px', fontSize: '0.82rem', borderRadius: '9999px' }}
          />
        </div>
      </div>

      {/* Enquiries Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredEnquiries.length === 0 ? (
          <div className="erp-card" style={{ padding: '40px', textAlign: 'center', color: '#7b8c7e' }}>
            No enquiries found matching filters.
          </div>
        ) : (
          filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="erp-card"
              style={{
                padding: '18px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                borderLeft: enq.status === 'Converted' ? '4px solid #1b7a43' : '4px solid #c07d2b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: '280px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#eaf4eb',
                  color: '#1e4d2b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}>
                  {enq.name?.charAt(0)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a2e20' }}>
                      {enq.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#7a8c7e' }}>
                      #{enq.id}
                    </span>
                    {enq.source.includes('ortho-neuro-care') ? (
                      <span className="badge-online-source">
                        <Globe size={10} /> ortho-neuro-care.vercel.app
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.7rem', color: '#526655', backgroundColor: '#f0ebd8', padding: '1px 6px', borderRadius: '4px' }}>
                        {enq.source}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.76rem', color: '#687b6d', marginBottom: '6px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} /> {enq.phone}
                    </span>
                    {enq.email && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={12} /> {enq.email}
                      </span>
                    )}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {enq.date} {enq.time && `• ${enq.time}`}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#3f5344', margin: 0, backgroundColor: '#fbf9f4', padding: '8px 12px', borderRadius: '8px', border: '1px solid #f0e8d6' }}>
                    <strong>Message:</strong> {enq.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`badge-status ${enq.status === 'Converted' ? 'confirmed' : 'pending'}`}>
                  {enq.status}
                </span>

                {enq.status !== 'Converted' && (
                  <button
                    onClick={() => convertEnquiryToAppointment(enq.id)}
                    className="btn-primary"
                    style={{ padding: '7px 14px', fontSize: '0.78rem' }}
                    title="Convert enquiry directly into a scheduled appointment"
                  >
                    <Sparkles size={14} /> Convert to Appointment
                  </button>
                )}

                <button
                  onClick={() => handleWhatsApp(enq)}
                  style={{
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Reply to patient via WhatsApp"
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
