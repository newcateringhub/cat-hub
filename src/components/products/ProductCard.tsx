"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products'; // This will now work
import { useInquiry } from '@/context/InquiryContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useInquiry();

  return (
    <div className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500">
      <Link href={`/products/${product.id}`} className="block aspect-square relative bg-background-alt overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      
      <div className="p-6">
        <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2 block">
          {product.category}
        </span>
        <h3 className="text-lg font-heading text-text mb-4 line-clamp-1">
          {product.name}
        </h3>
        
        <button 
          onClick={() => addItem(product)}
          className="w-full py-3 bg-text text-white text-[10px] uppercase tracking-widest font-bold hover:bg-accent transition-colors duration-300"
        >
          Add to Inquiry
        </button>
      </div>
    </div>
  );
}