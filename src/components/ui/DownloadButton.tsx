"use client";

import { useState } from 'react';

// 1. Define the props interface
interface DownloadProps {
  catalogName: string;
  fileUrl: string;
}

export default function DownloadButton({ catalogName, fileUrl }: DownloadProps) {
  // 2. Define the missing state variables
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, catalogName }),
      });

      if (!response.ok) throw new Error('Failed to save lead');

      setIsSuccess(true);

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${catalogName.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setShowForm(false);
        setIsSuccess(false);
        setPhone('');
      }, 3000);

    } catch (err) {
      console.error("Lead capture failed:", err);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${catalogName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. You must include the return statement (JSX)
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
          <div className="bg-white p-8 rounded-xl max-w-sm w-full shadow-2xl text-center">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-heading mb-2">Verify Details</h3>
                <input 
                  required
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full p-4 border rounded-lg outline-none focus:border-accent"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-accent text-white font-bold uppercase text-[10px]"
                >
                  {isSubmitting ? 'Processing...' : 'Download Now'}
                </button>
              </form>
            ) : (
              <div className="py-6 font-heading text-accent text-xl">
                Success! Starting Download...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}