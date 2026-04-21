"use client";

import Link from 'next/link';
import Image from 'next/image';
import { categories, categoryImages } from '@/lib/products';

const featuredCategories = categories.filter(c => c !== 'All').slice(0, 8);

export default function FeaturedCategoryGrid() {
  return (
    <section id="categories" className="py-28" style={{ background: 'var(--color-background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="mb-16">
          <span className="label-tag block mb-4">Our Collections</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Curated for<br /><em style={{ color: 'var(--color-accent)', fontStyle: 'italic', fontWeight: 300 }}>Distinction</em>
            </h2>
            <p className="text-sm text-[var(--color-text-light)] max-w-xs leading-relaxed md:text-right font-light">
              Professional-grade catering equipment for hotels, restaurants, and events across India.
            </p>
          </div>
          <div className="gold-rule mt-8"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
          {featuredCategories.map((category) => {
            const imageUrl = categoryImages[category] || `/images/pvd-gold-cutlery.png`;
            return (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group block product-card-glow"
              >
                <div className="relative aspect-square overflow-hidden"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px'
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)' }}>
                  </div>

                  <Image
                    src={imageUrl}
                    alt={`${category} catering equipment`}
                    fill
                    className="object-contain p-6 md:p-8 transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Bottom label strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20"
                    style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.95), transparent)' }}>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                      Browse →
                    </span>
                  </div>
                </div>

                {/* Title row */}
                <div className="flex items-center justify-between mt-3 px-0.5">
                  <h3 className="text-sm font-medium text-[var(--color-text-light)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
                    {category}
                  </h3>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                    className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="mt-16 text-center">
          <Link href="/products" className="btn-secondary inline-flex">
            View All Products
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
