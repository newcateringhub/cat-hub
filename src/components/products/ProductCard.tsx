"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useInquiry } from '@/context/InquiryContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useInquiry();

  return (
    <div className="group relative flex flex-col bg-background-alt border border-border transition-all duration-300 hover:shadow-lg hover:border-accent/20">
      {/* 1. LINKED IMAGE CONTAINER */}
      {/* THE FIX: Changed aspect-[4/5] to aspect-square. Added p-6 for padding. */}
      <Link href={`/products/${product.id}`} className="block overflow-hidden relative aspect-square p-6">
        
        {/* Luxury Category Badge - Made smaller */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-background-alt/95 backdrop-blur-sm text-[9px] uppercase tracking-[0.15em] px-2 py-1 font-bold border border-border text-text-light">
            {product.category}
          </span>
        </div>

        {/* THE FIX: Changed object-cover to object-contain. Reduced hover scale to 105. */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* 2. PRODUCT INFO AREA */}
      {/* Added border-t to separate info from image cleanly */}
      <div className="pt-4 pb-5 px-4 flex flex-col items-center text-center border-t border-border/50 bg-background-alt relative z-20">
        <Link href={`/products/${product.id}`}>
          {/* Made font slightly smaller */}
          <h3 className="text-base font-heading text-text transition-colors group-hover:text-accent mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Inquiry Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold hover:text-text transition-all duration-300 border-b border-transparent hover:border-text pb-0.5"
        >
          + Add to Inquiry
        </button>
      </div>
    </div>
  );
}