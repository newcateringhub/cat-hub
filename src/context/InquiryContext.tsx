"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/products';

interface InquiryContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  // Load from local storage so the basket doesn't empty on refresh
  useEffect(() => {
    const saved = localStorage.getItem('inquiry_basket');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('inquiry_basket', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prev => prev.some(item => item.id === product.id) ? prev : [...prev, product]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearInquiry = () => setItems([]);

  return (
    <InquiryContext.Provider value={{ items, addItem, removeItem, clearInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) throw new Error('useInquiry must be used within InquiryProvider');
  return context;
};