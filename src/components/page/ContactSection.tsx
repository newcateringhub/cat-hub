"use client";

import React from 'react';

export default function ContactSection() {
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const messageBody = formData.get('message');

    // 1. YOUR CLIENT'S WHATSAPP NUMBER (International format, no + or spaces)
    const phoneNumber = "919136564863"; 

    // 2. CONSTRUCT THE MESSAGE
    let whatsappMsg = `*New General Inquiry from Catering Hub*%0A%0A`;
    whatsappMsg += `*Name:* ${name}%0A`;
    whatsappMsg += `*Email:* ${email}%0A%0A`;
    whatsappMsg += `*Message:*%0A${messageBody}`;

    // 3. REDIRECT
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-background-alt border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Get In Touch</span>
            <h2 className="text-4xl font-heading text-text">Contact Our Experts</h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-accent mb-4">Visit Us</h3>
                <p className="text-text-light font-light leading-relaxed">
                  Shop No. 4, opp. Khwahishh hotel, off Ramchandra Lane, Kanchpada, Mumbai, Maharashtra 400064
                </p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest font-bold text-accent mb-4">Quick Connect</h3>
                <p className="text-text-light font-light leading-relaxed">
                  +91 9136564863<br />
                  info@cateringhub.com
                </p>
              </div>
            </div>

            {/* WhatsApp Form */}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input 
                required 
                name="name" 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-4 bg-background border border-border text-sm outline-none focus:border-accent transition-colors" 
              />
              <input 
                required 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-4 bg-background border border-border text-sm outline-none focus:border-accent transition-colors" 
              />
              <textarea 
                required 
                name="message" 
                rows={4} 
                placeholder="How can we help you?" 
                className="w-full p-4 bg-background border border-border text-sm outline-none focus:border-accent transition-colors resize-none"
              ></textarea>
              
              <button 
                type="submit" 
                className="w-full bg-[#25D366] text-white py-4 rounded-md font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#1ebe57] transition-all flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Inquire via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}