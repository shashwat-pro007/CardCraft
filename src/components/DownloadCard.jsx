import React, { useState } from 'react';
import { getRecords } from '../utils/storage';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function DownloadCard({ addToast }) {
  const [searchRoll, setSearchRoll] = useState('');
  const [approvedRecord, setApprovedRecord] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  function handleSearch(e) {
    e.preventDefault();
    const roll = searchRoll.toUpperCase().trim();
    const records = getRecords();
    const record = records[roll];
    setApprovedRecord(null);
    setStatusMessage('');
    if (record && record.status === 'approved') {
      setApprovedRecord(record);
    } else {
      const msg = record ? `Status is: ${record.status.toUpperCase()}. ID card is not available for download yet.` : `Error: Roll Number ${roll} not found.`;
      setStatusMessage(msg);
      addToast(msg, 'error');
    }
  }

  function displayApprovedCard(record) {
    // nothing to do since we set approvedRecord and render it
  }

  async function downloadCard(format) {
    if (!approvedRecord) {
      addToast('No approved ID to download', 'error');
      return;
    }
    const rollNumber = approvedRecord.rollNumber;
    const cardEl = document.getElementById('id-card-container');
    addToast(`Generating ${format.toUpperCase()}...`, 'info');

    try {
      const canvas = await html2canvas(cardEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      if (format === 'png') {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `ID_Card_${rollNumber}.png`;
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast('PNG downloaded successfully!', 'success');
      } else if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const pdf = new jsPDF('l', 'mm', [90, 55]);
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save(`ID_Card_${rollNumber}.pdf`);
        addToast('PDF downloaded successfully!', 'success');
      }
    } catch (err) {
      console.error('Download failed:', err);
      addToast('Download failed. Check console for details.', 'error');
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary-blue mb-6">Download Approved ID Card</h2>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex flex-col space-y-4">
          <label htmlFor="searchRollNumber" className="block text-sm font-medium text-gray-700">Enter Roll Number</label>
          <input id="searchRollNumber" value={searchRoll} onChange={(e)=>setSearchRoll(e.target.value)} placeholder="E.g., CS101" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
          <button type="submit" className="py-2 px-4 rounded-md text-sm font-medium text-white bg-secondary-blue hover:bg-blue-700">Search ID Card</button>
        </form>
      </div>

      {approvedRecord && (
        <div id="download-card-result" className="flex flex-col items-center">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Your Approved ID Card</h3>

          <div id="id-card-view">
            <div id="id-card-container" className="bg-white border-2 border-primary-blue/70">
              <div className="flex flex-col items-center w-32 border-r border-gray-200 pr-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mb-2 border-2 border-primary-blue/30">
                  <img id="card-photo" src={approvedRecord.photoBase64 || "https://placehold.co/80x80/93c5fd/ffffff?text=Photo"} alt="Student Photo" className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-primary-blue">Maharana Pratap of University</span>
                  <div className="w-12 h-12 bg-accent-yellow/50 rounded-full mx-auto my-1 flex items-center justify-center text-primary-blue text-sm font-bold">Logo</div>
                  <span className="text-xs text-gray-500">Since 2024</span>
                </div>
              </div>

              <div className="flex-grow">
                <h4 className="text-lg font-bold text-primary-blue truncate" id="card-name">{approvedRecord.name}</h4>
                <p className="text-xs text-gray-600 mb-2" id="card-branch-year">{approvedRecord.branch} | {approvedRecord.year}</p>

                <div className="text-sm space-y-1">
                  <p><span className="font-semibold text-primary-blue">Roll No:</span> <span id="card-roll" className="text-gray-800">{approvedRecord.rollNumber}</span></p>
                  <p><span className="font-semibold text-primary-blue">Email:</span> <span id="card-email" className="text-gray-800 truncate">{approvedRecord.email}</span></p>
                  <p><span className="font-semibold text-primary-blue">Phone:</span> <span id="card-phone" className="text-gray-800">{approvedRecord.phone}</span></p>
                </div>
                <span className="absolute bottom-3 right-3 bg-primary-blue text-white text-[10px] px-2 py-0.5 rounded-full">STUDENT ID CARD</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button onClick={() => downloadCard('png')} className="py-3 px-6 rounded-lg shadow-md text-white font-semibold bg-green-600 hover:bg-green-700 flex items-center">🖼️ Download as PNG</button>
            <button onClick={() => downloadCard('pdf')} className="py-3 px-6 rounded-lg shadow-md text-white font-semibold bg-red-600 hover:bg-red-700 flex items-center">📄 Download as PDF</button>
          </div>
        </div>
      )}

      {statusMessage && <p id="download-card-status" className="text-center text-red-500 mt-8 text-lg font-medium bg-red-100 p-4 rounded-lg max-w-md mx-auto">{statusMessage}</p>}
    </section>
  );
}
