import { NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function convertMarkdownToBlocks(markdown: string) {
  const lines = markdown.split("\n");

  return lines.map((line) => ({
    type: "paragraph",
    children: [
      {
        type: "text",
        text: line,
      },
    ],
  }));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const strapiData = {
      data: {
        title: body.title,
        slug,
        category: body.category,
        excerpt: body.excerpt,
        publishedDate: new Date()
          .toISOString()
          .split("T")[0],
        featured: false,
        content: convertMarkdownToBlocks(
          body.content
        ),
      },
    };

    const response = await fetch(
      `${STRAPI_URL}/api/blogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(strapiData),
      }
    );

    if (!response.ok) {
      const error = await response.text();

      console.log(error);

      return NextResponse.json(
        { error },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Failed to publish" },
      { status: 500 }
    );
  }
}