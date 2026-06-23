import { getBlog } from "@/lib/strapi";
import { notFound } from "next/navigation";
import parse from "html-react-parser";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const content = blog.content || "";

  const plainText = content.replace(/<[^>]*>/g, "");

  const readingTime = Math.max(
    1,
    Math.ceil(plainText.split(/\s+/).length / 200)
  );

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-accent uppercase text-sm tracking-[0.2em]">
            {blog.category}
          </p>

          <span className="text-zinc-600">•</span>

          <p className="text-zinc-500 text-sm">
            {blog.publishedDate}
          </p>

          <span className="text-zinc-600">•</span>

          <p className="text-zinc-500 text-sm">
            {readingTime} min read
          </p>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-heading mb-8">
          {blog.title}
        </h1>

        {/* Excerpt */}
        <p className="text-zinc-400 text-xl leading-9 mb-14 max-w-3xl">
          {blog.excerpt}
        </p>

        <div className="w-24 h-px bg-[#D4B06A] mb-14" />

        {/* Content */}
        <article
          className="
            max-w-none

            [&_h1]:text-5xl
            [&_h1]:font-heading
            [&_h1]:text-white
            [&_h1]:mt-16
            [&_h1]:mb-8

            [&_h2]:text-4xl
            [&_h2]:font-heading
            [&_h2]:text-[#D4B06A]
            [&_h2]:mt-14
            [&_h2]:mb-6

            [&_h3]:text-3xl
            [&_h3]:font-heading
            [&_h3]:text-white
            [&_h3]:mt-10
            [&_h3]:mb-4

            [&_p]:text-zinc-300
            [&_p]:text-lg
            [&_p]:leading-9
            [&_p]:mb-6

            [&_strong]:text-white
            [&_strong]:font-semibold

            [&_em]:italic

            [&_ul]:list-disc
            [&_ul]:pl-8
            [&_ul]:my-6

            [&_ol]:list-decimal
            [&_ol]:pl-8
            [&_ol]:my-6

            [&_li]:text-zinc-300
            [&_li]:mb-2

            [&_blockquote]:border-l-4
            [&_blockquote]:border-[#D4B06A]
            [&_blockquote]:pl-6
            [&_blockquote]:italic
            [&_blockquote]:text-zinc-400
            [&_blockquote]:my-8

            [&_a]:text-[#D4B06A]
            [&_a]:underline

            [&_mark]:bg-yellow-300
            [&_mark]:text-black
            [&_mark]:px-1
          "
        >
          {content ? (
            parse(content)
          ) : (
            <p className="text-zinc-500 italic">
              No content available.
            </p>
          )}
        </article>
      </div>
    </main>
  );
  
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `https://newcateringhub.com/blogs/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://newcateringhub.com/blogs/${slug}`,
      type: "article",
    },
  };
}