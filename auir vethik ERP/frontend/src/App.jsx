import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { AppointmentsList } from './components/appointments/AppointmentsList';
import { CustomersList } from './components/customers/CustomersList';
import { ServicesList } from './components/services/ServicesList';
import { EnquiriesList } from './components/enquiries/EnquiriesList';
import { ReviewsList } from './components/reviews/ReviewsList';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { ToastContainer } from './components/common/ToastContainer';

const MainLayout = () => {
  const { activeTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global modals triggered from Quick Actions or Navbar
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  return (
    <div className="erp-app-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f4ec' }}>
      {/* Sidebar navigation */}
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '70px' }}>
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        <main style={{ flex: 1, position: 'relative' }}>
          {activeTab === 'dashboard' && (
            <DashboardView
              onOpenAddCustomer={() => setIsAddCustomerModalOpen(true)}
              onOpenAddService={() => setIsAddServiceModalOpen(true)}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersList
              isAddCustomerModalOpen={isAddCustomerModalOpen}
              setIsAddCustomerModalOpen={setIsAddCustomerModalOpen}
            />
          )}

          {activeTab === 'appointments' && <AppointmentsList />}

          {activeTab === 'services' && (
            <ServicesList
              isAddServiceModalOpen={isAddServiceModalOpen}
              setIsAddServiceModalOpen={setIsAddServiceModalOpen}
            />
          )}

          {activeTab === 'enquiries' && <EnquiriesList />}

          {activeTab === 'reviews' && <ReviewsList />}

          {activeTab === 'reports' && <ReportsView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>

        {/* Mobile bottom navigation */}
        <div className="mobile-only-nav">
          <MobileNav setMobileMenuOpen={setMobileMenuOpen} />
        </div>
      </div>

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 35
          }}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
