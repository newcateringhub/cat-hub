import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { getBlogs } from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://newcateringhub.com";

  let blogs = [];

  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap =
    products.map((product) => ({
      url: `${base}/products/${product.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap =
    blogs.map((blog: any) => ({
      url: `${base}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt
        ? new Date(blog.updatedAt)
        : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];
}