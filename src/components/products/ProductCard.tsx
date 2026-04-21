"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useInquiry } from '@/context/InquiryContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useInquiry();
  const isAdded = items.some(i => i.id === product.id);

  return (
    <div className="group product-card-glow flex flex-col"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.06) 0%, transparent 60%)' }}>
        </div>
        <Image
          src={product.image}
          alt={`${product.name} - ${product.category} catering equipment`}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* View detail pill on hover */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-wider font-semibold"
          style={{ background: 'rgba(13,13,13,0.9)', color: 'var(--color-accent)', border: '1px solid rgba(201,169,110,0.3)' }}>
          View Details
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1" style={{ borderTop: '1px solid var(--color-border)' }}>
        <span className="label-tag">{product.category}</span>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium leading-tight hover:text-[var(--color-accent)] transition-colors line-clamp-2"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
            {product.name}
          </h3>
        </Link>
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map(size => (
              <span key={size} className="text-[10px] px-2 py-0.5 uppercase tracking-wider"
                style={{ background: 'var(--color-surface-raised)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                {size}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={() => addItem(product)}
          disabled={isAdded}
          className="mt-auto w-full py-3 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300"
          style={isAdded ? {
            background: 'var(--color-accent-dim)',
            color: 'var(--color-accent)',
            border: '1px solid rgba(201,169,110,0.3)',
            cursor: 'default'
          } : {
            background: 'var(--color-surface-raised)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border-light)',
          }}
          onMouseEnter={e => { if (!isAdded) { (e.target as HTMLButtonElement).style.background = 'var(--color-accent)'; (e.target as HTMLButtonElement).style.color = '#0d0d0d'; (e.target as HTMLButtonElement).style.borderColor = 'var(--color-accent)'; }}}
          onMouseLeave={e => { if (!isAdded) { (e.target as HTMLButtonElement).style.background = 'var(--color-surface-raised)'; (e.target as HTMLButtonElement).style.color = 'var(--color-text)'; (e.target as HTMLButtonElement).style.borderColor = 'var(--color-border-light)'; }}}
        >
          {isAdded ? '✓ Added to Inquiry' : 'Add to Inquiry'}
        </button>
      </div>
    </div>
  );
}
