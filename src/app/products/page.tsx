"use client";
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/products';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search')?.toLowerCase() || '';

  // Filter products by search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  );

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-heading mb-4">
            {query ? `Results for "${query}"` : 'Our Full Collection'}
          </h1>
          <p className="text-text-light font-light">
            {filteredProducts.length} items found
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-light italic">No products matched your search.</p>
            <button 
              onClick={() => window.location.href = '/products'}
              className="mt-4 text-accent underline text-sm uppercase tracking-widest"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}