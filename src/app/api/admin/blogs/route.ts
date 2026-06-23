import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET() {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/blogs?sort=publishedDate:desc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data.data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BLOG BODY:", body);

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const payload = {
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt,
        category: body.category,
        content: body.content,
        featured: false,
        publishedDate:
          new Date().toISOString().split("T")[0],
      },
    };

    console.log(payload);

    const response = await fetch(
      `${STRAPI_URL}/api/blogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    console.log("STRAPI RESPONSE:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to publish blog" },
      { status: 500 }
    );
  }
}