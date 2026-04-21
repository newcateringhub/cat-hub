"use client";
import { useInquiry } from '@/context/InquiryContext';
import Image from 'next/image';
import { useEffect } from 'react';

export default function InquiryDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, clearInquiry } = useInquiry();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleWhatsAppInquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const company = formData.get('company') || 'Not specified';
    const phoneNumber = "919136564863";
    let message = `*New Inquiry from Catering Hub*%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Company:* ${company}%0A%0A`;
    message += `*Requested Items:*%0A`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category})%0A`;
    });
    message += `%0APlease provide a quotation for these items.`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    clearInquiry();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-[var(--color-background-alt)] border-l border-[var(--color-border)] z-[70] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--color-text)' }}>
              Inquiry Basket
            </h2>
            {items.length > 0 && (
              <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={clearInquiry}
                className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] hover:text-red-400 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-light)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              aria-label="Close"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-14 h-14 border border-[var(--color-border)] flex items-center justify-center">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" className="text-[var(--color-text-muted)]">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] font-light">Your basket is empty.</p>
              <button onClick={onClose} className="text-[11px] uppercase tracking-wider text-[var(--color-accent)] hover:underline">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 group hover:bg-[var(--color-surface)] transition-colors">
                  <div className="relative w-16 h-16 bg-[var(--color-surface)] border border-[var(--color-border)] flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-[var(--color-text)] font-medium line-clamp-1">{item.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-[var(--color-accent)] mt-0.5 block">{item.category}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-7 h-7 flex items-center justify-center text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form + CTA */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border)] p-6">
            <form onSubmit={handleWhatsAppInquiry} className="space-y-3">
              <input
                required
                name="name"
                type="text"
                placeholder="Your Name *"
                className="input-field text-sm"
              />
              <input
                name="company"
                type="text"
                placeholder="Company / Hotel / Restaurant"
                className="input-field text-sm"
              />
              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] text-black text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#1db954] transition-colors flex items-center justify-center gap-2.5"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Send Inquiry via WhatsApp
              </button>
              <p className="text-[10px] text-center text-[var(--color-text-muted)]">
                Opens WhatsApp with your full item list pre-filled.
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
