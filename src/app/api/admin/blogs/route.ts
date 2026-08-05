import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET() {
  const response = await fetch(
    `${STRAPI_URL}/api/blogs`
  );

  const data = await response.json();

  return NextResponse.json(data.data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const response = await fetch(
      `${STRAPI_URL}/api/blogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            title: body.title,
            slug,
            category: body.category,
            excerpt: body.excerpt,
            content: body.content,
            featured: false,
            publishedDate:
              new Date().toISOString().split("T")[0],
          },
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}