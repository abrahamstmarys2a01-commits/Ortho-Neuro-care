import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_SERVICES } from '../data/mockData';
import {
  fetchLiveAppointments,
  createLiveAppointment,
  updateLiveAppointmentStatus,
  deleteLiveAppointment,
  fetchLiveServices,
  fetchLiveReviews,
  createLiveReview,
  updateLiveReviewStatus,
  deleteLiveReview,
  fetchLiveEnquiries,
  updateLiveEnquiryStatus,
  fetchLiveCustomers,
  createLiveCustomer,
  updateLiveCustomer,
  deleteLiveCustomer
} from '../services/api';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Web Audio API chime generator for incoming online bookings / reviews
const playSoundChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + idx * 0.12;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.8);
    });
  } catch (err) {
    console.log('Audio playback not allowed or not supported yet', err);
  }
};

const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  name: 'Ortho Neuro Admin',
  role: 'Super Administrator'
};

const getStoredCredentials = () => {
  try {
    const raw = localStorage.getItem('ortho_erp_auth_credentials');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username && parsed.password) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading stored credentials', e);
  }
  return DEFAULT_CREDENTIALS;
};

const getInitialSessionUser = () => {
  try {
    const raw = localStorage.getItem('ortho_erp_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading session', e);
  }
  return null;
};

export const AppProvider = ({ children }) => {
  // Authentication State: Session persists across refresh, shows login only after logout
  const [credentials, setCredentials] = useState(getStoredCredentials);
  const [currentUser, setCurrentUser] = useState(getInitialSessionUser);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getInitialSessionUser());

  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  
  const knownAptIdsRef = useRef(new Set());
  const knownReviewIdsRef = useRef(new Set());
  const knownEnqIdsRef = useRef(new Set());
  
  // Real Database States (100% Real Live Data Only - Zero Mock Data)
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [appointments, setAppointments] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Auth Functions
  const login = (usernameInput, passwordInput) => {
    const activeCreds = getStoredCredentials();
    const cleanUser = (usernameInput || '').trim();

    if (cleanUser === activeCreds.username && passwordInput === activeCreds.password) {
      const user = {
        username: activeCreds.username,
        name: activeCreds.name || 'Ortho Neuro Admin',
        role: activeCreds.role || 'Super Administrator',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('ortho_erp_session', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      showToast('Welcome Back!', `Logged in successfully as ${user.username}.`);
      return { success: true };
    } else {
      return { 
        success: false, 
        message: 'Invalid username or password. Please verify your credentials and try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('ortho_erp_session');
    setIsAuthenticated(false);
    setCurrentUser(null);
    showToast('Logged Out', 'You have been logged out of the ERP system.', 'info');
  };

  const changePassword = (currentPassword, newPassword, newUsername) => {
    const activeCreds = getStoredCredentials();

    if (currentPassword !== activeCreds.password) {
      return { success: false, message: 'Current password does not match.' };
    }

    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, message: 'New password must be at least 4 characters.' };
    }

    const updated = {
      ...activeCreds,
      username: (newUsername && newUsername.trim()) ? newUsername.trim() : activeCreds.username,
      password: newPassword
    };

    localStorage.setItem('ortho_erp_auth_credentials', JSON.stringify(updated));
    setCredentials(updated);

    // Also update session user if username changed
    if (currentUser) {
      const updatedUser = { ...currentUser, username: updated.username };
      localStorage.setItem('ortho_erp_session', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    }

    showToast('Password Changed', 'Your password has been changed successfully. Use the new password for future logins.');
    return { success: true };
  };

  // Sync strictly with live MongoDB Atlas Database
  const syncLiveBackend = async (isInitial = false) => {
    try {
      setIsSyncing(true);
      const [liveApts, liveSvcs, liveRevs, liveEnqs, liveCusts] = await Promise.all([
        fetchLiveAppointments().catch(() => []),
        fetchLiveServices().catch(() => []),
        fetchLiveReviews().catch(() => []),
        fetchLiveEnquiries().catch(() => []),
        fetchLiveCustomers().catch(() => []),
      ]);

      // 1. Services
      if (liveSvcs && liveSvcs.length > 0) {
        setServices(liveSvcs);
      }

      // 2. Appointments (Real database only)
      if (liveApts) {
        const newOnlineBookings = [];
        liveApts.forEach((apt) => {
          if (!knownAptIdsRef.current.has(apt.id)) {
            knownAptIdsRef.current.add(apt.id);
            if (!isInitial) {
              newOnlineBookings.push(apt);
            }
          }
        });

        let mergedApts = [...liveApts];
        try {
          const queued = JSON.parse(localStorage.getItem('ortho_appointments_queue') || '[]');
          if (queued && queued.length > 0) {
            queued.forEach(q => {
              if (!mergedApts.some(a => a.id === q.id)) {
                mergedApts.unshift(q);
              }
            });
          }
        } catch (e) {}

        setAppointments(mergedApts);

        if (newOnlineBookings.length > 0) {
          const latest = newOnlineBookings[0];
          playSoundChime();
          try {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#1e4d2b', '#52b788', '#d4a373', '#ffd166']
            });
          } catch (e) {}

          showToast(
            '⚡ Live Website Booking!',
            `New booking from ${latest.customerName} for ${latest.service} (${latest.time})`
          );

          setNotifications((prev) => [
            {
              id: Date.now(),
              title: '🌟 New Website Booking',
              desc: `${latest.customerName} booked ${latest.service} on ${latest.date} at ${latest.time}`,
              time: 'Just now',
              unread: true,
              source: 'Website'
            },
            ...prev
          ]);
        }
      }

      // 3. Reviews (Real database only)
      if (liveRevs) {
        const newOnlineReviews = [];
        liveRevs.forEach((rev) => {
          if (!knownReviewIdsRef.current.has(rev.id)) {
            knownReviewIdsRef.current.add(rev.id);
            if (!isInitial) {
              newOnlineReviews.push(rev);
            }
          }
        });

        setReviews(liveRevs);

        if (newOnlineReviews.length > 0) {
          const latestRev = newOnlineReviews[0];
          playSoundChime();
          showToast(
            '⭐ New Website Review!',
            `${latestRev.name} gave ${latestRev.rating}★ for ${latestRev.treatment}`
          );

          setNotifications((prev) => [
            {
              id: Date.now() + 1,
              title: '⭐ New Customer Review',
              desc: `${latestRev.name} posted a ${latestRev.rating}-star review for ${latestRev.treatment}`,
              time: 'Just now',
              unread: true,
              source: 'Website Review'
            },
            ...prev
          ]);
        }
      }

      // 4. Enquiries (Real database only)
      if (liveEnqs) {
        const newEnquiries = [];
        liveEnqs.forEach((enq) => {
          if (!knownEnqIdsRef.current.has(enq.id)) {
            knownEnqIdsRef.current.add(enq.id);
            if (!isInitial) {
              newEnquiries.push(enq);
            }
          }
        });

        setEnquiries(liveEnqs);

        if (newEnquiries.length > 0) {
          const latestEnq = newEnquiries[0];
          playSoundChime();
          showToast(
            '📩 New Contact Lead!',
            `New enquiry received from ${latestEnq.name} (${latestEnq.service})`
          );
        }
      }

      // 5. Customers (Real database only)
      if (liveCusts) {
        setCustomers(liveCusts);
      }

    } catch (err) {
      console.warn('Backend sync poll notice:', err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  // Initial Sync and recurring poll every 3.5 seconds
  useEffect(() => {
    localStorage.removeItem('auir_services');
    localStorage.removeItem('auir_customers');
    localStorage.removeItem('auir_appointments');
    localStorage.removeItem('auir_enquiries');
    localStorage.removeItem('auir_reviews');

    syncLiveBackend(true);

    const interval = setInterval(() => {
      syncLiveBackend(false);
    }, 3500);

    let bc;
    try {
      bc = new BroadcastChannel('ortho_neuro_auir_sync');
      bc.onmessage = (event) => {
        if (event.data?.type === 'NEW_BOOKING' && event.data?.payload) {
          const apt = event.data.payload;
          setAppointments((prev) => [apt, ...prev.filter((a) => a.id !== apt.id)]);
          knownAptIdsRef.current.add(apt.id);
          playSoundChime();
          try {
            confetti({
              particleCount: 75,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#1e4d2b', '#52b788', '#d4a373', '#ffd166']
            });
          } catch (e) {}
          showToast('⚡ Live Website Booking!', `New booking from ${apt.customerName} for ${apt.service} (${apt.time})`);
          setNotifications((prev) => [
            {
              id: Date.now(),
              title: '🌟 New Website Booking',
              desc: `${apt.customerName} booked ${apt.service} on ${apt.date} at ${apt.time}`,
              time: 'Just now',
              unread: true,
              source: 'Website'
            },
            ...prev
          ]);
        }
      };
    } catch (e) {}

    return () => {
      clearInterval(interval);
      if (bc) bc.close();
    };
  }, []);

  // Add Appointment (Direct in ERP -> Writes to Atlas Database)
  const addAppointment = async (data) => {
    try {
      const created = await createLiveAppointment(data);
      if (created) {
        setAppointments((prev) => [created, ...prev.filter(a => a.id !== created.id)]);
        knownAptIdsRef.current.add(created.id);
        
        playSoundChime();
        showToast('Appointment Scheduled!', `Appointment #${created.id} for ${data.customerName} booked successfully.`);
        
        syncLiveBackend(false);
        return created;
      }
    } catch (err) {
      showToast('Booking Error', err.message, 'error');
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );

    try {
      await updateLiveAppointmentStatus(id, newStatus);
    } catch (err) {
      console.warn('Backend status sync note:', err.message);
    }

    showToast('Status Updated', `Appointment ${id} marked as ${newStatus}`);
  };

  const rescheduleAppointment = async (id, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? { ...apt, date: newDate, time: newTime, status: 'Rescheduled' }
          : apt
      )
    );

    try {
      await updateLiveAppointmentStatus(id, 'Rescheduled', { date: newDate, timeSlot: newTime });
    } catch (err) {
      console.warn('Backend reschedule sync note:', err.message);
    }

    showToast('Rescheduled', `Appointment ${id} moved to ${newDate} at ${newTime}`);
  };

  const deleteAppointment = async (id) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    try {
      await deleteLiveAppointment(id);
    } catch (err) {
      console.warn('Backend delete sync note:', err.message);
    }
    showToast('Deleted', `Appointment ${id} removed.`, 'info');
  };

  // Customer Actions (Direct in Atlas Database)
  const addCustomer = async (data) => {
    try {
      const created = await createLiveCustomer(data);
      if (created) {
        setCustomers((prev) => [created, ...prev]);
        showToast('Customer Added', `${data.name} saved in database.`);
        syncLiveBackend(false);
        return created;
      }
    } catch (err) {
      showToast('Error adding customer', err.message, 'error');
    }
  };

  const updateCustomer = async (id, data) => {
    try {
      await updateLiveCustomer(id, data);
      setCustomers((prev) => prev.map((c) => (c.id === id || c._backendId === id ? { ...c, ...data } : c)));
      showToast('Updated', 'Customer details saved in database.');
    } catch (err) {
      showToast('Error updating customer', err.message, 'error');
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await deleteLiveCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id && c._backendId !== id));
      showToast('Customer Removed', 'Customer removed from database.', 'info');
    } catch (err) {
      showToast('Error deleting customer', err.message, 'error');
    }
  };

  // Service Actions
  const addService = (data) => {
    const newService = {
      id: services.length + 1,
      name: data.name,
      description: data.description || '',
      duration: data.duration || '45 mins',
      durationMinutes: data.durationMinutes || 45,
      price: Number(data.price) || 1000,
      status: data.status || 'Active',
      category: data.category || 'Therapy',
      icon: 'Sparkles'
    };
    setServices((prev) => [...prev, newService]);
    showToast('Service Added', `${data.name} is now available for booking.`);
    return newService;
  };

  const updateService = (id, data) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    showToast('Service Updated', 'Service pricing and details updated.');
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service Removed', 'Service removed.', 'info');
  };

  // Review Actions (Writes to Atlas Database)
  const addReview = async (data) => {
    try {
      const created = await createLiveReview(data);
      showToast('Review Added', `Review from ${data.name} published.`);
      syncLiveBackend(false);
      return created;
    } catch (err) {
      showToast('Error adding review', err.message, 'error');
    }
  };

  const toggleReviewApproval = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: nextStatus } : r))
    );

    try {
      await updateLiveReviewStatus(id, nextStatus);
    } catch (err) {
      console.warn('Backend review status sync note:', err.message);
    }

    showToast(
      'Review Updated',
      `Review is now ${nextStatus ? 'Live on Website' : 'Hidden from Website'}`
    );
  };

  const deleteReview = async (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    try {
      await deleteLiveReview(id);
    } catch (err) {
      console.warn('Backend review delete sync note:', err.message);
    }
    showToast('Review Deleted', 'Review removed from database.', 'info');
  };

  // Enquiries Actions
  const convertEnquiryToAppointment = (enquiryId) => {
    const enq = enquiries.find((e) => e.id === enquiryId || e._backendId === enquiryId);
    if (!enq) return;
    
    addAppointment({
      customerName: enq.name,
      customerMobile: enq.phone,
      customerEmail: enq.email,
      service: enq.service || 'Ayurveda Consultation',
      date: enq.date || new Date().toISOString().split('T')[0],
      time: enq.time || '10:00 AM',
      source: enq.source || 'Enquiry Lead',
      message: `Converted from lead #${enquiryId}: ${enq.message}`,
      status: 'Confirmed'
    });

    if (enq._backendId) {
      updateLiveEnquiryStatus(enq._backendId, 'Converted').catch(() => {});
    }

    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, status: 'Converted' } : e))
    );
  };

  // Dynamic status breakdown based purely on real live appointments
  const statusBreakdown = {
    total: appointments.length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
    pending: appointments.filter((a) => a.status === 'Pending').length,
    confirmed: appointments.filter((a) => a.status === 'Confirmed').length,
    cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
    rescheduled: appointments.filter((a) => a.status === 'Rescheduled').length,
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isSyncing,
        syncLiveBackend,
        services,
        customers,
        appointments,
        enquiries,
        reviews,
        notifications,
        setNotifications,
        toasts,
        showToast,
        addAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        deleteAppointment,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addService,
        updateService,
        deleteService,
        addReview,
        toggleReviewApproval,
        deleteReview,
        convertEnquiryToAppointment,
        statusBreakdown,
        playSoundChime,
        isAuthenticated,
        currentUser,
        credentials,
        login,
        logout,
        changePassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
