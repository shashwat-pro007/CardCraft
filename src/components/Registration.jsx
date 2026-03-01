import React, { useState } from 'react';
import { getRecords, saveRecords } from '../utils/storage';

export default function Registration({ addToast }) {
  const [form, setForm] = useState({
    studentName: '',
    rollNumber: '',
    branch: '',
    year: '',
    email: '',
    phone: '',
    photoBase64: ''
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm(prev => ({ ...prev, photoBase64: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function clearFields() {
    setForm({
      studentName: '',
      rollNumber: '',
      branch: '',
      year: '',
      email: '',
      phone: '',
      photoBase64: ''
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const roll = form.rollNumber.toUpperCase().trim();
    if (!roll) {
      addToast('Please provide a roll number', 'error');
      return;
    }
    const records = getRecords();
    if (records[roll]) {
      addToast(`Roll Number ${roll} is already registered.`, 'error');
      return;
    }
    const newRecord = {
      name: form.studentName.trim(),
      rollNumber: roll,
      branch: form.branch.trim(),
      year: form.year,
      email: form.email.trim(),
      phone: form.phone.trim(),
      photoBase64: form.photoBase64,
      status: 'pending',
      timestamp: Date.now()
    };
    records[roll] = newRecord;
    saveRecords(records);
    addToast('Registration submitted successfully! Status: Pending Admin Approval.', 'success');
    clearFields();
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary-blue mb-6">Student ID Registration</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="studentName" value={form.studentName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
              <input id="rollNumber" value={form.rollNumber} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <input id="branch" value={form.branch} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <select id="year" value={form.year} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="Final Year">Final Year</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input id="phone" value={form.phone} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Upload Photo (Passport Size)</label>
            <input id="photo" type="file" accept="image/*" onChange={handleFileChange} required className="mt-1 block w-full text-sm text-gray-500" />
          </div>

          <button type="submit" className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-primary-blue hover:bg-secondary-blue">Submit Registration</button>
        </form>
      </div>
    </section>
  );
}
