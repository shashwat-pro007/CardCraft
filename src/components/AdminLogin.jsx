import React, { useState } from 'react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin({ onLogin, addToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true');
      addToast('Admin login successful. Redirecting to Dashboard.', 'success');
      onLogin();
    } else {
      addToast('Invalid username or password.', 'error');
    }
    setPassword('');
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary-blue mb-6">Admin Login</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700">Username</label>
            <input id="adminUsername" value={username} onChange={(e)=>setUsername(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="adminPassword" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          </div>
          <button type="submit" className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-primary-blue hover:bg-secondary-blue">Login</button>
        </form>
      </div>
    </section>
  );
}
