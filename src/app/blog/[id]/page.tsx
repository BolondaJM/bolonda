import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogPosts.filter((post) => post.id !== "bpuzzle").map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white uppercase mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span>&middot;</span>
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Featured image placeholder */}
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 mb-10 shadow-lg" />

          <article className="prose prose-lg prose-amber max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
            <p className="text-gray-600 leading-relaxed mt-6">{post.content}</p>
            <p className="text-gray-600 leading-relaxed mt-4">
              This is a sample blog post. Replace this content with your actual
              article text. You can add rich formatting, images, quotes, and more
              to bring your stories to life.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              The Bolonda family believes in sharing knowledge, experiences, and
              wisdom with the wider community. Each member contributes their
              unique perspective to create content that informs, inspires, and
              connects.
            </p>
          </article>

          {/* Author Card */}
          <div className="mt-12 p-6 bg-amber-50 rounded-2xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-300 flex items-center justify-center text-lg font-bold text-white shrink-0">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">
                Member of the Bolonda Family
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
