import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Plus, 
  Edit2, 
  Trash2, 
  Clock, 
  IndianRupee, 
  CheckCircle, 
  XCircle, 
  Leaf, 
  Search,
  X
} from 'lucide-react';

export const ServicesList = ({ isAddServiceModalOpen, setIsAddServiceModalOpen }) => {
  const { services, addService, updateService, deleteService, showToast } = useApp();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [editingService, setEditingService] = useState(null);

  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    description: '',
    duration: '60 mins',
    price: 1500,
    category: 'Therapy',
    status: 'Active'
  });

  const totalPages = Math.ceil(services.length / pageSize) || 1;
  const paginatedServices = services.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceForm.name.trim()) {
      showToast('Validation Error', 'Please enter a service name.', 'error');
      return;
    }
    if (!newServiceForm.price || Number(newServiceForm.price) <= 0) {
      showToast('Validation Error', 'Please enter a valid positive price.', 'error');
      return;
    }

    addService({
      ...newServiceForm,
      name: newServiceForm.name.trim(),
      price: Number(newServiceForm.price)
    });
    setNewServiceForm({
      name: '',
      description: '',
      duration: '60 mins',
      price: 1500,
      category: 'Therapy',
      status: 'Active'
    });
    setIsAddServiceModalOpen(false);
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    if (!editingService) return;
    if (!editingService.name.trim()) {
      showToast('Validation Error', 'Please enter a service name.', 'error');
      return;
    }
    if (!editingService.price || Number(editingService.price) <= 0) {
      showToast('Validation Error', 'Please enter a valid positive price.', 'error');
      return;
    }

    updateService(editingService.id, {
      ...editingService,
      name: editingService.name.trim(),
      price: Number(editingService.price)
    });
    setEditingService(null);
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
            Services
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#657769', margin: 0 }}>
            Manage your wellness services and treatments.
          </p>
        </div>

        <button
          onClick={() => setIsAddServiceModalOpen(true)}
          className="btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.88rem' }}
        >
          <Plus size={16} /> + Add Service
        </button>
      </div>

      {/* Services Table matching screenshot */}
      <div className="erp-table-container">
        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Service</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServices.map((srv, idx) => (
              <tr key={srv.id}>
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
                      justifyContent: 'center'
                    }}>
                      <Leaf size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#243328' }}>{srv.name}</div>
                      {srv.description && (
                        <div style={{ fontSize: '0.74rem', color: '#728576', maxWidth: '360px' }}>
                          {srv.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ color: '#435548', fontWeight: 500 }}>
                  {srv.duration}
                </td>
                <td style={{ fontWeight: 700, color: '#1e4d2b', fontSize: '0.94rem' }}>
                  ₹{Number(srv.price).toLocaleString()}
                </td>
                <td>
                  <span className="badge-status active">
                    {srv.status || 'Active'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      onClick={() => setEditingService(srv)}
                      className="btn-icon"
                      title="Edit Service"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => deleteService(srv.id)}
                      className="btn-icon"
                      title="Delete Service"
                      style={{ color: '#c93b3b' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
          Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, services.length)} of {services.length} services
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
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

      {/* Add Service Modal */}
      {isAddServiceModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '480px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1e4d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Add New Service
              </h3>
              <button onClick={() => setIsAddServiceModalOpen(false)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateService}>
              <div className="form-group">
                <label className="form-label">Service Name <span className="required">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Shirodhara Rejuvenation"
                  value={newServiceForm.name}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Duration <span className="required">*</span></label>
                  <select
                    className="form-select"
                    value={newServiceForm.duration}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, duration: e.target.value })}
                  >
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="60 mins">60 mins</option>
                    <option value="90 mins">90 mins</option>
                    <option value="120 mins">120 mins</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹) <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="1500"
                    value={newServiceForm.price}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={newServiceForm.category}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Therapy">Therapy</option>
                  <option value="Detox">Detox & Panchakarma</option>
                  <option value="Beauty & Skin">Beauty & Skin</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Brief description of the treatment benefits..."
                  value={newServiceForm.description}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddServiceModalOpen(false)}
                  className="btn-subtle"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="modal-backdrop">
          <div className="modal-card" style={{ maxWidth: '480px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1e4d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Edit Service
              </h3>
              <button onClick={() => setEditingService(null)} className="btn-icon">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateService}>
              <div className="form-group">
                <label className="form-label">Service Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
