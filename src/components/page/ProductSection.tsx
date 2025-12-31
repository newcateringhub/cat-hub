"use client";

import { useState, useEffect } from 'react';
import ProductCard from '../products/ProductCard';
import { products, categories } from '@/lib/products';

interface ProductSectionProps {
  defaultCategory?: string;
}

export default function ProductSection({ defaultCategory }: ProductSectionProps) {
  // Initialize state with the prop or 'All'
  const [activeCategory, setActiveCategory] = useState(defaultCategory || 'All');

  // Sync state if the URL parameter changes
  useEffect(() => {
    if (defaultCategory) {
      setActiveCategory(defaultCategory);
    }
  }, [defaultCategory]);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="categories" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl text-text mb-4 font-heading">Our Collections</h2>
            <p className="text-text-light font-light text-sm tracking-wide">Select a category to explore our specialized hospitality equipment.</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold py-2 px-4 transition-all duration-300 ${
                activeCategory === cat 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-text-light hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-in fade-in zoom-in duration-500">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-light italic">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}