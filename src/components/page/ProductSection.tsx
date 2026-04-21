"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from '../products/ProductCard';
import { products, categories } from '@/lib/products';

interface ProductSectionProps {
  defaultCategory?: string;
}

export default function ProductSection({ defaultCategory }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    if (cat) setActiveCategory(cat);
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const updateUrl = useCallback((category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    updateUrl(cat);
  };

  const allCategories = ['All', ...categories.filter(c => c !== 'All')];

  let filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'name-asc') filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === 'name-desc') filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
  if (sortBy === 'category') filteredProducts = [...filteredProducts].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <div className="mb-12">
          <span className="label-tag block mb-3">Catalogue</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.1 }}>
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h1>
            <span className="text-sm text-[var(--color-text-muted)]">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-4 mb-10">
          
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border-light)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2.5 px-4 bg-[var(--color-surface)] border border-[var(--color-border-light)] text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
              <option value="category">By Category</option>
            </select>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-[10px] uppercase tracking-[0.18em] font-semibold py-2 px-4 transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)]'
                    : 'bg-transparent text-[var(--color-text-light)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="section-divider mb-10"></div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6 stagger-children">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[var(--color-text-muted)]">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-[var(--color-text-light)] font-light">No products found.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-[11px] uppercase tracking-wider text-[var(--color-accent)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom inquiry CTA */}
        {filteredProducts.length > 0 && (
          <div className="mt-20 border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--color-text)', marginBottom: '0.4rem' }}>
                Looking for bulk orders or custom requirements?
              </h3>
              <p className="text-sm text-[var(--color-text-light)] font-light">
                Add items to your inquiry basket, then send us a WhatsApp with one tap.
              </p>
            </div>
            <a
              href="https://wa.me/919136564863?text=Hi!%20I%20have%20a%20bulk%20order%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
