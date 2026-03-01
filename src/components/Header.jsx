import React from 'react';

export default function Header({ navigate, isAdmin, adminLogout }) {
  return (
    <header className="bg-primary-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-wider">CardCraft</h1>
        <nav className="flex space-x-4 text-white">
          <button onClick={() => navigate('student-register')} className="hover:text-accent-yellow transition duration-150">Register</button>
          <button onClick={() => navigate('student-download')} className="hover:text-accent-yellow transition duration-150">Download ID</button>
          {!isAdmin && <button onClick={() => navigate('admin-login')} className="hover:text-accent-yellow transition duration-150">Admin</button>}
          {isAdmin && <button onClick={adminLogout} className="text-red-400 hover:text-red-300 transition duration-150">Logout</button>}
        </nav>
      </div>
    </header>
  );
}