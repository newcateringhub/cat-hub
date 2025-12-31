"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useInquiry } from '@/context/InquiryContext'; // Ensure this matches our new file
import InquiryDrawer from './InquiryDrawer';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { items } = useInquiry(); // Change useCart() to useInquiry()

  return (
    <>
      <nav className="main-header-nav">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-heading text-accent tracking-tighter">
            Catering<span className="text-text font-light italic">Hub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-text-light">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <Link href="#categories" className="hover:text-accent transition-colors">Catalogue</Link>
            <Link href="#contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>

          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2 text-text hover:text-accent transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            
            {items.length > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <InquiryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}