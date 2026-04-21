"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { useInquiry } from '@/context/InquiryContext';
import { useState } from 'react';

const SPECS = [
  "Professional Grade Finish",
  "Hospitality Standard Durability",
  "Dishwasher & Industrial Safe",
  "Bulk Supply Available",
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem, items } = useInquiry();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);
  const isInBasket = product ? items.some(i => i.id === product.id) : false;

  // Related products (same category)
  const related = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const handleAdd = () => {
    if (!product || isInBasket) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <p className="text-[var(--color-text-muted)] text-sm mb-4">Product not found.</p>
          <button onClick={() => router.back()} className="btn-secondary text-sm">← Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] pb-24">

      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--color-accent)] transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[var(--color-accent)] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-[var(--color-text-light)] truncate max-w-[180px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Main product layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Image */}
          <div className="relative aspect-square bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden group animate-fade-up">
            <Image
              src={product.image}
              alt={`${product.name} - Premium catering equipment`}
              fill
              className="object-contain p-14 transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Top right corner decoration */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent)] opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent)] opacity-60"></div>
          </div>

          {/* Details */}
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <span className="label-tag block mb-4">{product.category}</span>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              {product.name}
            </h1>

            <div className="gold-rule mb-8"></div>

            <p className="text-[var(--color-text-light)] leading-relaxed font-light mb-8">
              Our <strong className="text-[var(--color-text)] font-medium">{product.name}</strong> is crafted to the standards required in premium hospitality environments — from five-star banquets to high-volume restaurant service. Built for elegance, durability and professional presentation.
            </p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-3">Available Sizes</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <span key={size} className="text-sm px-4 py-2 border border-[var(--color-border-light)] text-[var(--color-text-light)]">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {SPECS.map(spec => (
                <div key={spec} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0"></span>
                  <span className="text-xs text-[var(--color-text-light)] font-light">{spec}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                disabled={isInBasket}
                className={`flex-1 py-4 text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isInBasket
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30 cursor-default'
                    : 'btn-primary'
                }`}
              >
                {isInBasket ? (
                  <>
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    In Inquiry Basket
                  </>
                ) : added ? 'Added!' : 'Add to Inquiry Basket'}
              </button>

              <a
                href={`https://wa.me/919136564863?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}.%20Can%20you%20provide%20a%20quote%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 px-6 bg-[#25D366] text-black text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#1db954] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Quick Quote
              </a>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <button
                onClick={() => router.back()}
                className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1.5"
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Back to Collection
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="section-divider mb-12"></div>
            <div className="mb-8">
              <span className="label-tag block mb-2">More in {product.category}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--color-text)' }}>
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 stagger-children">
              {related.map(p => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group bg-[var(--color-surface)] border border-[var(--color-border)] p-4 product-card-glow block"
                >
                  <div className="aspect-square relative mb-4 bg-[var(--color-background-alt)] overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-6 transition-transform duration-500 group-hover:scale-110" sizes="25vw" />
                  </div>
                  <p className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
