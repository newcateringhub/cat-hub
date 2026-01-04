"use client";

import { useState } from 'react';

interface DownloadProps {
  catalogName: string;
  fileUrl: string;
}

export default function DownloadButton({ catalogName, fileUrl }: DownloadProps) {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Neon Database
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, catalogName })
      });

      // 2. Show Success State
      setIsSuccess(true);

      // 3. Trigger the Download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${catalogName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 4. Close modal after 3 seconds
      setTimeout(() => {
        setShowForm(false);
        setIsSuccess(false);
        setPhone('');
      }, 3000);

    } catch (err) {
      alert("Error saving data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowForm(true)}
        className="w-full py-3 bg-text text-white text-[10px] uppercase tracking-widest font-bold hover:bg-accent transition-all duration-300"
      >
        Download PDF
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300 text-center">
            {!isSuccess ? (
              <>
                <h3 className="text-xl font-heading mb-2 text-text">Verify Details</h3>
                <p className="text-text-light text-sm mb-6 font-light">
                  Enter your phone number to receive the <strong>{catalogName}</strong> instantly.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full p-4 bg-gray-50 border border-border rounded-lg outline-none focus:border-accent transition-colors"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-[10px] text-white transition-all ${
                      isSubmitting ? 'bg-gray-400' : 'bg-accent hover:bg-text'
                    }`}
                  >
                    {isSubmitting ? 'Processing...' : 'Download Now'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full text-text-light text-[10px] uppercase tracking-widest pt-2 hover:text-text"
                  >
                    Cancel
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-xl font-heading mb-2 text-text">Thank You!</h3>
                <p className="text-text-light text-sm font-light">
                  Your download is starting automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}