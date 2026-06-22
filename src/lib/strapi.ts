const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getBlogs() {
  const res = await fetch(`${STRAPI_URL}/api/blogs`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data.data;
}

export async function getBlog(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  const data = await res.json();
  return data.data[0];
}