"use client";

import dynamic from 'next/dynamic';

// We are just passing the prop through
const ProductSection = dynamic(
  () => import('@/components/page/ProductSection'),
  { 
    ssr: false, 
    loading: () => (
      // A better loading state
      <div className="container py-20 text-center text-lg h-screen">
        Loading products...
      </div>
    )
  }
);

// Accept the new prop from the server
export default function ClientProductSection({ defaultCategory }: { defaultCategory?: string }) {
  // Pass the prop down to the real ProductSection
  return <ProductSection defaultCategory={defaultCategory} />;
}