"use client";

import { useState } from 'react';

interface DownloadProps {
  catalogName: string;
  fileUrl: string;
}

export default function DownloadButton({ catalogName, fileUrl }: DownloadProps) {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const clientWhatsApp = "919136564863"; // Your client's number
    const message = `*CATALOG DOWNLOAD ALERT*%0A%0A*Customer Phone:* ${phone}%0A*Catalog:* ${catalogName}%0A%0A_A customer is viewing this catalog now._`;

    // 1. Open WhatsApp to notify the client
    window.open(`https://wa.me/${clientWhatsApp}?text=${message}`, '_blank');

    // 2. Trigger the actual download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${catalogName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowForm(false);
  };

  return (
    <div>
      <button 
        onClick={() => setShowForm(true)}
        className="bg-accent text-white px-6 py-3 rounded-md text-[10px] uppercase tracking-widest font-bold hover:bg-text transition-all"
      >
        Download Catalog
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-heading mb-2">Get the Full Catalog</h3>
            <p className="text-gray-500 text-sm mb-6 font-light">
              Please enter your phone number to proceed with the download of <strong>{catalogName}</strong>.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                required
                type="tel"
                placeholder="Phone Number (e.g. +91...)"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-accent"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full bg-accent text-white py-4 rounded-lg font-bold uppercase tracking-widest text-[10px]"
              >
                Download & Notify via WhatsApp
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full text-gray-400 text-[10px] uppercase tracking-widest pt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}