import React, { useEffect, useState } from 'react';
import { getRecords, saveRecords } from '../utils/storage';

export default function AdminDashboard({ addToast }) {
  const [records, setRecords] = useState({});

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  function updateRecordStatus(rollNumber, newStatus) {
    const recs = getRecords();
    if (recs[rollNumber]) {
      recs[rollNumber].status = newStatus;
      saveRecords(recs);
      setRecords(recs);
      addToast(`Record for ${rollNumber} ${newStatus}.`, 'info');
    }
  }

  const entries = Object.values(records);

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary-blue">Admin Dashboard - Student Requests</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
        {entries.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No student registration requests found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map(record => (
                <tr key={record.rollNumber} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{record.name}</td>
                  <td className="px-6 py-4">{record.rollNumber}</td>
                  <td className="px-6 py-4">{record.branch}</td>
                  <td className="px-6 py-4">
                    <span className={
                      "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium " +
                      (record.status === 'approved' ? 'bg-green-100 text-green-800' : record.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')
                    }>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium space-x-2">
                    {record.status === 'pending' ? (
                      <>
                        <button onClick={() => updateRecordStatus(record.rollNumber, 'approved')} className="text-green-600 hover:text-green-900 border border-green-600 rounded-md px-2 py-1">Approve</button>
                        <button onClick={() => updateRecordStatus(record.rollNumber, 'rejected')} className="text-red-600 hover:text-red-900 border border-red-600 rounded-md px-2 py-1">Reject</button>
                      </>
                    ) : (
                      <span className="text-gray-400">Action Taken</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
