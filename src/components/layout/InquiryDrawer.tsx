"use client";
import { useInquiry } from '@/context/InquiryContext';
import Image from 'next/image';

export default function InquiryDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, clearInquiry } = useInquiry();

  const handleWhatsAppInquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const company = formData.get('company') || 'Not specified';
    
    // 1. YOUR CLIENT'S WHATSAPP NUMBER (Include country code, no +, no spaces)
    // Example: 919876543210 for India
    const phoneNumber = "919136564863"; 

    // 2. CONSTRUCT THE MESSAGE
    let message = `*New Inquiry from Catering Hub*%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Company:* ${company}%0A%0A`;
    message += `*Requested Items:*%0A`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category})%0A`;
    });

    message += `%0APlease provide a quotation for these items.`;

    // 3. GENERATE THE LINK
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // 4. OPEN WHATSAPP AND CLEAR BASKET
    window.open(whatsappUrl, '_blank');
    clearInquiry();
    onClose();
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      
      <div className={`fixed right-0 top-0 h-full w-full max-w-lg bg-background-alt z-[70] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-heading">Inquiry Basket</h2>
            <button onClick={onClose} className="text-text-light hover:text-accent">Close</button>
          </div>

          <div className="flex-grow overflow-y-auto pr-2 mb-8 border-b border-border">
            {items.length === 0 ? (
              <p className="text-text-light italic font-light">Your basket is empty.</p>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-border/50">
                  <div className="relative w-16 h-16 bg-background border border-border">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="text-[10px] text-red-400 uppercase tracking-widest mt-1">Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <form onSubmit={handleWhatsAppInquiry} className="space-y-4">
              <input required name="name" type="text" placeholder="Your Name" className="w-full p-3 bg-background border border-border text-sm outline-none focus:border-accent" />
              <input name="company" type="text" placeholder="Company Name" className="w-full p-3 bg-background border border-border text-sm outline-none focus:border-accent" />
              
              <button type="submit" className="btn-primary w-full py-4 text-[11px] flex items-center justify-center gap-3">
                {/* WhatsApp Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}