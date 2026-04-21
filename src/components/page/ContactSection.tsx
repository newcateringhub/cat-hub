"use client";

import React from 'react';

export default function ContactSection() {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const messageBody = formData.get('message');
    const phoneNumber = "919136564863";
    let whatsappMsg = `*New Inquiry from Catering Hub*%0A%0A`;
    whatsappMsg += `*Name:* ${name}%0A`;
    whatsappMsg += `*Email:* ${email}%0A%0A`;
    whatsappMsg += `*Message:*%0A${messageBody}`;
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMsg}`, '_blank');
  };

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--color-background-alt)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-16">
          <span className="label-tag block mb-4">Get In Touch</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Contact Our<br /><em style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontWeight: 300 }}>Experts</em>
            </h2>
            <p className="text-sm text-[var(--color-text-light)] max-w-xs leading-relaxed md:text-right font-light">
              Reach out for bulk quotes, product inquiries, or to discuss your catering requirements.
            </p>
          </div>
          <div className="gold-rule mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Contact Details */}
          <div className="space-y-10">
            {/* Info cards */}
            {[
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: 'Visit Us',
                content: 'Shop No. 4, opp. Khwahishh hotel,\noff Ramchandra Lane, Kanchpada,\nMumbai, Maharashtra 400064'
              },
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                ),
                label: 'Quick Connect',
                content: '+91 91365 64863\nadhiyayan85@gmail.com'
              },
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                label: 'Business Hours',
                content: 'Monday – Saturday\n9:00 AM – 7:00 PM'
              }
            ].map(item => (
              <div key={item.label} className="flex gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                  style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', border: '1px solid rgba(201,169,110,0.2)' }}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>
                    {item.label}
                  </div>
                  <p className="text-sm text-[var(--color-text-light)] font-light leading-relaxed whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Google Maps CTA */}
            <a
              href="https://maps.google.com/?q=Shop+No.+4+Ramchandra+Lane+Kanchpada+Mumbai+400064"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors group"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-[11px] uppercase tracking-[0.15em] font-medium group-hover:underline">
                View on Google Maps
              </span>
            </a>
          </div>

          {/* Right: Form */}
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }} className="p-8">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-2 font-medium">Name *</label>
                  <input required name="name" type="text" placeholder="Your name" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-2 font-medium">Email *</label>
                  <input required name="email" type="email" placeholder="you@company.com" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-2 font-medium">Message *</label>
                <textarea required name="message" rows={4} placeholder="Tell us about your requirements..." className="input-field resize-none"></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 font-semibold text-white text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
