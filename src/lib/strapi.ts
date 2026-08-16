const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined");
}

export async function getBlogs() {
  const res = await fetch(`${STRAPI_URL}/api/blogs`, {
    headers: STRAPI_API_TOKEN
      ? {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }
      : {},
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(
      `Failed to fetch blogs: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  const data = await res.json();

  return data.data;
}

export async function getBlog(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    {
      headers: STRAPI_API_TOKEN
        ? {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          }
        : {},
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(
      `Failed to fetch blog: ${res.status} ${res.statusText} - ${errorText}`
    );
  }

  const data = await res.json();

  return data.data[0];
}