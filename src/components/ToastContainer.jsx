import React, { useState, useEffect } from 'react';

export default function ToastContainer({ toasts }) {
  // toasts: array of {id, message, type}
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className={`p-4 rounded-lg shadow-xl text-white ${t.type === 'success' ? 'bg-green-500' : t.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
          <p className="font-semibold">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
