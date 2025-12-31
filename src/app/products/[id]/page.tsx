"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { useInquiry } from '@/context/InquiryContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useInquiry();

  // Find the product by ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4 font-heading">Product not found.</h2>
          <button onClick={() => router.back()} className="btn-secondary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background-alt">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="mb-12 text-xs uppercase tracking-[0.3em] text-text-light hover:text-accent transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* 1. PRODUCT IMAGE - Professional Square Frame */}
          <div className="relative aspect-square bg-background border border-border p-12 overflow-hidden shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 2. PRODUCT DETAILS */}
          <div className="max-w-lg">
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-heading mb-8 text-text leading-tight">
              {product.name}
            </h1>
            
            <div className="w-16 h-1 bg-accent mb-10"></div>

            <div className="prose prose-slate mb-12">
              <p className="text-lg text-text-light leading-relaxed font-light">
                Our {product.name} is a testament to the quality and durability required in premium hospitality environments. 
                Specifically curated for high-end banquets and restaurant service.
              </p>
            </div>

            {/* Specifications Checklist */}
            <div className="space-y-4 mb-12">
              {[
                "Professional Grade Finish",
                "Hospitality Standard Durability",
                "Dishwasher & Industrial Safe",
                "Bulk Supply Available"
              ].map((spec) => (
                <div key={spec} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <span className="text-sm text-text font-medium tracking-wide uppercase">{spec}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => addItem(product)}
                className="btn-primary flex-grow text-center"
              >
                Add to Inquiry Basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}