"use client";

import ProductSection from './ProductSection';

interface ClientProductSectionProps {
  defaultCategory?: string;
}

export default function ClientProductSection({ defaultCategory }: ClientProductSectionProps) {
  return <ProductSection defaultCategory={defaultCategory} />;
}