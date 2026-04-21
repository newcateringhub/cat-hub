import { Suspense } from 'react';
import ClientProductSection from '@/components/page/ClientProductSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products — Catering Utensils & Hospitality Equipment',
  description: 'Browse our full range of catering utensils: PVD gold chafers, stainless steel tableware, bowls, cutlery, risers, platters, soup tureens & more. Premium HoReCa equipment in Mumbai.',
  keywords: ['catering utensils', 'chafing dishes', 'PVD gold chafer', 'SS chafer', 'catering bowls', 'catering cutlery', 'hospitality equipment'],
  openGraph: {
    title: 'All Products | Catering Hub',
    description: 'Browse premium catering utensils and hospitality equipment. PVD gold chafers, stainless steel tableware, risers, bowls & more.',
  },
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  return (
    <div className="min-h-screen pt-0" style={{ background: 'var(--color-background)' }}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}></div>
            <span className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Loading collection…</span>
          </div>
        </div>
      }>
        <ProductContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ProductContent({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const resolved = await searchParams;
  return <ClientProductSection defaultCategory={resolved.category} />;
}
