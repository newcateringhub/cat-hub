import { getBlog } from "@/lib/strapi";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlog(slug);
  const contentText =
  blog.content
    ?.map((item: any) => item.children?.[0]?.text || "")
    .join(" ") || "";

const readingTime = Math.ceil(
  contentText.split(" ").length / 200
);

  if (!blog) {
    notFound();
  }

  // Extract markdown text from Strapi
  const content =
    blog.content?.[0]?.children?.[0]?.text || "";

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex items-center gap-4 mb-6">
  <p className="text-accent uppercase text-sm tracking-[0.2em]">
    {blog.category}
  </p>

  <span className="text-zinc-600">•</span>

  <p className="text-zinc-500 text-sm">
    {blog.publishedDate}
  </p>
</div>

        <h1 className="text-5xl md:text-6xl font-heading mb-8">
          {blog.title}
        </h1>

        <p className="text-text-light text-xl mb-12">
          {blog.excerpt}
        </p>
        <div className="mb-10">
  <p className="text-zinc-500 text-sm">
    {readingTime} min read
  </p>
</div>

        <article
  className="
    max-w-none

    [&>h1]:text-5xl
    [&>h1]:font-heading
    [&>h1]:text-white
    [&>h1]:mt-16
    [&>h1]:mb-8

    [&>h2]:text-4xl
    [&>h2]:font-heading
    [&>h2]:text-[#D4B06A]
    [&>h2]:mt-14
    [&>h2]:mb-6

    [&>h3]:text-2xl
    [&>h3]:font-heading
    [&>h3]:text-white
    [&>h3]:mt-10
    [&>h3]:mb-4

    [&>p]:text-lg
    [&>p]:leading-9
    [&>p]:text-zinc-300
    [&>p]:mb-7

    [&>ul]:my-8
    [&>ul]:space-y-3

    [&>ul>li]:text-zinc-300
    [&>ul>li]:ml-6
    [&>ul>li]:list-disc
    [&>ul>li]:text-lg

    [&>blockquote]:border-l-4
    [&>blockquote]:border-[#D4B06A]
    [&>blockquote]:pl-6
    [&>blockquote]:italic
    [&>blockquote]:text-zinc-400

    [&>hr]:border-zinc-800
    [&>hr]:my-12
  "
>
  <ReactMarkdown>
    {content}
  </ReactMarkdown>
</article>
      </div>
    </main>
  );
}