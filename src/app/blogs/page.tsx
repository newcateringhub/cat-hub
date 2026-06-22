import Link from "next/link";
import { getBlogs } from "@/lib/strapi";

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4">

        <div className="text-center mb-20">
          <p className="text-accent uppercase tracking-[0.3em] text-sm mb-4">
            Industry Insights
          </p>

          <h1 className="text-6xl md:text-7xl font-heading text-text mb-6">
            Hospitality <span className="italic text-accent">Journal</span>
          </h1>

          <p className="max-w-2xl mx-auto text-text-light">
            Insights, buying guides and industry trends for hotels,
            restaurants and catering businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="border border-border p-8 hover:border-accent transition-all"
            >
              <p className="text-accent uppercase text-xs tracking-[0.2em] mb-3">
                {blog.category}
              </p>

              <h2 className="text-3xl font-heading mb-4">
                {blog.title}
              </h2>

              <p className="text-text-light mb-6">
                {blog.excerpt}
              </p>

              <span className="text-accent">
                Read Article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}