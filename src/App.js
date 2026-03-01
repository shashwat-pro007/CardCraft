import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Registration from './components/Registration';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import DownloadCard from './components/DownloadCard';
import ToastContainer from './components/ToastContainer';

function App() {
  const [page, setPage] = useState('student-register');
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('adminLoggedIn') === 'true');
    // Default navigation
    if (localStorage.getItem('adminLoggedIn') === 'true') setPage('admin-dashboard');
  }, []);

  function navigate(target) {
    if (target === 'admin-dashboard' && !isAdmin) {
      setPage('admin-login');
    } else {
      setPage(target);
    }
  }

  function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    setIsAdmin(false);
    addToast('Logged out successfully.', 'info');
    setPage('admin-login');
  }

  function onAdminLogin() {
    setIsAdmin(true);
    setPage('admin-dashboard');
  }

  function addToast(message, type = 'info') {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header navigate={navigate} isAdmin={isAdmin} adminLogout={adminLogout} />
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div id="toast-wrapper">
          <ToastContainer toasts={toasts} />
        </div>

        <div className={page === 'student-register' ? '' : 'hidden'}>
          <Registration addToast={addToast} />
        </div>

        <div className={page === 'admin-login' ? '' : 'hidden'}>
          <AdminLogin onLogin={onAdminLogin} addToast={addToast} />
        </div>

        <div className={page === 'admin-dashboard' ? '' : 'hidden'}>
          <AdminDashboard addToast={addToast} />
        </div>

        <div className={page === 'student-download' ? '' : 'hidden'}>
          <DownloadCard addToast={addToast} />
        </div>
      </main>
    </div>
  );
}

export default App;
