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

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${catalogName.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      if (!response.ok) throw new Error('Failed');
      setIsSuccess(true);
      triggerDownload();
      setTimeout(() => { setShowForm(false); setIsSuccess(false); setPhone(''); }, 3000);
    } catch {
      triggerDownload();
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-3 bg-[var(--color-background)] text-[var(--color-text)] text-[10px] uppercase tracking-widest font-semibold border border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-black hover:border-[var(--color-accent)] transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download PDF
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 max-w-sm w-full shadow-2xl">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              style={{ position: 'relative', float: 'right', marginBottom: '0.5rem' }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                    Download Catalogue
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{catalogName}</p>
                </div>
                <input
                  required
                  type="tel"
                  placeholder="Your Mobile Number"
                  className="input-field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  {isSubmitting ? 'Please wait...' : 'Download Now'}
                </button>
                <p className="text-[10px] text-center text-[var(--color-text-muted)]">
                  We'll occasionally send you updates. No spam.
                </p>
              </form>
            ) : (
              <div className="py-6 text-center">
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" fill="none" stroke="var(--color-accent)" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-accent)' }}>Download Starting...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
