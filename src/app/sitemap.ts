import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cateringhub.com';
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${base}/products?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url: `${base}/products/${p.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
