"use client";

import Link from 'next/link';
import Image from 'next/image';
import { categories, categoryImages } from '@/lib/products';

// Get a subset of categories to feature, skipping "All"
const featuredCategories = categories.filter(c => c !== "All").slice(0, 8);

export default function FeaturedCategoryGrid() {
  return (
    <section id="categories" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header with a professional touch */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-text mb-4">
            Featured Collections
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-text-light mt-4 max-w-2xl mx-auto">
            Explore our curated selection of premium catering equipment, tailored for professional excellence.
          </p>
        </div>

        {/* The New Professional Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredCategories.map(category => {
            // Get the image or use a placeholder if the key is missing/wrong
            const imageUrl = categoryImages[category] || `https://placehold.co/600x600/png?text=${category}`;
            
            return (
            <Link 
              href={`/products?category=${encodeURIComponent(category)}`} 
              key={category}
              className="group block text-center"
            >
              {/* 1. SQUARE IMAGE CARD */}
              <div className="relative aspect-square bg-background-alt border border-border rounded-xl overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-hover:border-accent/50">
                <Image
                  src={imageUrl}
                  alt={category}
                  fill
                  // 2. CLEAN IMAGE PRESENTATION (object-contain + padding)
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* 3. TITLE BELOW THE CARD */}
              <h3 className="text-lg font-heading text-text transition-colors duration-300 group-hover:text-accent">
                {category}
              </h3>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}