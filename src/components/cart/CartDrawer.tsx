"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    itemCount 
  } = useCart();
  
  const businessNumber = "919136564863"; // <-- CLIENT'S WHATSAPP NUMBER

  const handleWhatsAppQuote = () => {
    if (cartItems.length === 0) return;

    let message = "Hello! I would like a quotation for the following items:\n\n";
    
    cartItems.forEach(item => {
      message += `- ${item.quantity} x ${item.name}\n`;
    });
    
    message += `\nTotal Items: ${itemCount}\n\nPlease provide me with the best quotation.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] transition-opacity duration-300
                    ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeCart}
      />
      
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background-alt shadow-2xl z-[1001] 
                    flex flex-col transition-transform duration-300
                    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-heading text-2xl text-accent">Your Cart</h2>
          <button onClick={closeCart} className="text-text-light hover:text-accent transition-colors">
            <X size={28} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <p className="text-text-light text-center mt-10">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex gap-4 p-4 bg-background rounded-lg border border-white/10">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={80} 
                    height={80} 
                    className="object-contain rounded-md bg-white/5"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-text">{item.name}</h3>
                    <p className="text-sm text-accent">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <input 
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 bg-background-alt border border-white/20 rounded-md p-1.5 text-center"
                      />
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-6 border-t border-white/10 space-y-4">
          <button 
            onClick={handleWhatsAppQuote} 
            disabled={cartItems.length === 0}
            className="w-full btn-primary flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Quotation
          </button>
        </div>
      </aside>
    </>
  );
}