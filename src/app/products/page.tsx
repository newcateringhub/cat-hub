import { Suspense } from 'react';
import ClientProductSection from '@/components/page/ClientProductSection';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return (
    <div className="min-h-screen pt-24">
      {/* 1. Wrap the client component in Suspense to fix the build error */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
        </div>
      }>
        <ProductContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Separate component to handle the async searchParams safely
async function ProductContent({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category;

  return <ClientProductSection defaultCategory={category} />;
}