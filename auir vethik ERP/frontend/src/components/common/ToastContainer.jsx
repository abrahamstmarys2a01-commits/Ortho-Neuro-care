import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <div style={{ flexShrink: 0 }}>
            {toast.type === 'error' ? (
              <AlertCircle size={20} color="#ffb4b4" />
            ) : toast.type === 'info' ? (
              <Info size={20} color="#bce2ff" />
            ) : (
              <CheckCircle2 size={20} color="#7de7a0" />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>{toast.title}</div>
            <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>{toast.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
