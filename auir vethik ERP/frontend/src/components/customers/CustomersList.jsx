import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  UserPlus, 
  Eye, 
  Edit2, 
  Trash2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Calendar,
  MessageSquare,
  CheckCircle2,
  X
} from 'lucide-react';

export const CustomersList = ({ isAddCustomerModalOpen, setIsAddCustomerModalOpen }) => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, appointments, searchQuery, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modals state
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);

  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: 'Chennai',
    source: 'Walk-in',
    status: 'Active',
    notes: ''
  });

  const filteredCustomers = customers.filter((c) => {
    const q = (localSearch || searchQuery || '').toLowerCase();
    const matchesSearch =
      !q ||
      c.name?.toLowerCase().includes(q) ||
      c.mobile?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.city?.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSource =
      sourceFilter === 'All' ||
      (sourceFilter === 'Online' && c.source?.includes('ortho-neuro-care')) ||
      c.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalPages = Math.ceil(filteredCustomers.length / pageSize) || 1;
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!newCustomerForm.name.trim()) {
      showToast('Validation Error', 'Customer Name is required.', 'error');
      return;
    }
    const cleanMobile = newCustomerForm.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      showToast('Validation Error', 'Mobile Number is required.', 'error');
      return;
    }
    if (cleanMobile.length !== 10) {
      showToast('Validation Error', 'Mobile Number must be exactly 10 digits.', 'error');
      return;
    }

    addCustomer({
      ...newCustomerForm,
      name: newCustomerForm.name.trim(),
      mobile: cleanMobile
    });
    setNewCustomerForm({
      name: '',
      mobile: '',
      email: '',
      city: 'Chennai',
      source: 'Walk-in',
      status: 'Active',
      notes: ''
    });
    setIsAddCustomerModalOpen(false);
  };

  const handleUpdateCustomer = (e) => {
    e.preventDefault();
    if (!editCustomer) return;
    if (!editCustomer.name.trim()) {
      showToast('Validation Error', 'Customer Name is required.', 'error');
      return;
    }
    const cleanMobile = editCustomer.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      showToast('Validation Error', 'Mobile Number is required.', 'error');
      return;
    }
    if (cleanMobile.length !== 10) {
      showToast('Validation Error', 'Mobile Number must be exactly 10 digits.', 'error');
      return;
    }

    updateCustomer(editCustomer.id, {
      ...editCustomer,
      name: editCustomer.name.trim(),
      mobile: cleanMobile
    });
    setEditCustomer(null);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 28px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header matching screenshot */}
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
            Customers
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
            Manage your customer details and history.
          </p>
        </div>

        <button
          onClick={() => setIsAddCustomerModalOpen(true)}
          className="btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <UserPlus size={16} /> + Add Customer
        </button>
      </div>

      {/* Filter Bar matching screenshot: [All Status] [All Sources] [Search...] */}
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
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Sources Filter */}
          <select
            className="form-select"
            value={sourceFilter}
            onChange={(e) => { setSourceFilter(e.target.value); setCurrentPage(1); }}
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
            placeholder="Search by name or phone..."
            value={localSearch}
            onChange={(e) => { setLocalSearch(e.target.value); setCurrentPage(1); }}
            className="form-input"
            style={{ padding: '6px 12px 6px 34px', fontSize: '0.82rem', borderRadius: '9999px' }}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="erp-table-container">
        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Enquiries</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#7a8c7e' }}>
                  No customers found.
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((cust, idx) => (
                <tr key={cust.id}>
                  <td style={{ fontWeight: 600, color: '#829586' }}>
                    {(currentPage - 1) * pageSize + idx + 1}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#eaf2eb',
                        color: '#1e4d2b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 700
                      }}>
                        {cust.name?.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#243328' }}>{cust.name}</div>
                        {cust.source === 'ortho-neuro-care.vercel.app' && (
                          <span className="badge-online-source" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                            <Globe size={9} /> ortho-neuro-care
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#3f5245' }}>{cust.mobile}</td>
                  <td style={{ color: '#66786a' }}>{cust.email || '-'}</td>
                  <td>
                    <span style={{
                      backgroundColor: '#f1ebdc',
                      color: '#1e4d2b',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {cust.enquiries || 0}
                    </span>
                  </td>
                  <td>
                    <span className="badge-status active">
                      {cust.status || 'Active'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => setViewCustomer(cust)}
                        className="btn-icon"
                        title="View Customer Details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => setEditCustomer(cust)}
                        className="btn-icon"
                        title="Edit Customer"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => deleteCustomer(cust.id)}
                        className="btn-icon"
                        title="Delete Customer"
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

      {/* Pagination matching screenshot */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        marginTop: '16px',
        padding: '0 4px',
        fontSize: '0.82rem',
        color: '#6e8072'
      }}>
        <div>
          Showing {filteredCustomers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, filteredCustomers.length)} of {filteredCustomers.length} customers
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #e0d6c3',
              backgroundColor: '#ffffff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            &lt;
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                border: currentPage === pg ? 'none' : '1px solid #e0d6c3',
                backgroundColor: currentPage === pg ? '#1e4d2b' : '#ffffff',
                color: currentPage === pg ? '#ffffff' : '#334437',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {pg}
            </button>
          ))}

          {totalPages > 5 && <span style={{ padding: '0 4px' }}>... {totalPages}</span>}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #e0d6c3',
              backgroundColor: '#ffffff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddCustomerModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1e4d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Add New Customer
              </h3>
              <button onClick={() => setIsAddCustomerModalOpen(false)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer}>
              <div className="form-group">
                <label className="form-label">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter full name"
                  value={newCustomerForm.name}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number (10 Digits) <span className="required">*</span></label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter 10-digit mobile number"
                  value={newCustomerForm.mobile}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setNewCustomerForm({ ...newCustomerForm, mobile: digits });
                  }}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Mobile number must be exactly 10 digits"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@email.com"
                  value={newCustomerForm.email}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newCustomerForm.city}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Source</label>
                  <select
                    className="form-select"
                    value={newCustomerForm.source}
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, source: e.target.value })}
                  >
                    <option value="Walk-in">Walk-in</option>
                    <option value="ortho-neuro-care.vercel.app">ortho-neuro-care</option>
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Health Notes / Dosha Profile</label>
                <textarea
                  className="form-textarea"
                  placeholder="Any health history, allergies, notes..."
                  value={newCustomerForm.notes}
                  onChange={(e) => setNewCustomerForm({ ...newCustomerForm, notes: e.target.value })}
                  rows={2}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddCustomerModalOpen(false)}
                  className="btn-subtle"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editCustomer && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '500px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1e4d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Edit Customer
              </h3>
              <button onClick={() => setEditCustomer(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editCustomer.name}
                  onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number (10 Digits) <span className="required">*</span></label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Enter 10-digit mobile number"
                  value={editCustomer.mobile}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setEditCustomer({ ...editCustomer, mobile: digits });
                  }}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Mobile number must be exactly 10 digits"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={editCustomer.email || ''}
                  onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editCustomer.status}
                  onChange={(e) => setEditCustomer({ ...editCustomer, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
                <button
                  type="button"
                  onClick={() => setEditCustomer(null)}
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

      {/* View Customer Details & History Modal */}
      {viewCustomer && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '560px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#1e4d2b',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontWeight: 700
                }}>
                  {viewCustomer.name?.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: '#1a2e20', margin: 0 }}>
                    {viewCustomer.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#748678' }}>
                    Customer #{viewCustomer.id} • Registered {viewCustomer.createdAt || '2025'}
                  </div>
                </div>
              </div>
              <button onClick={() => setViewCustomer(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              padding: '14px',
              backgroundColor: '#fbf8f0',
              borderRadius: '10px',
              border: '1px solid #efe4cf',
              marginBottom: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#7a8c7e' }}>Mobile</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{viewCustomer.mobile}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#7a8c7e' }}>Email</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{viewCustomer.email || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#7a8c7e' }}>Source</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{viewCustomer.source}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#7a8c7e' }}>City</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{viewCustomer.city || 'Chennai'}</div>
              </div>
            </div>

            {viewCustomer.notes && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e4d2b', marginBottom: '4px' }}>
                  Health / Consultation Notes:
                </div>
                <div style={{ fontSize: '0.84rem', color: '#4d5f52', backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e8decb' }}>
                  {viewCustomer.notes}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setViewCustomer(null)} className="btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
