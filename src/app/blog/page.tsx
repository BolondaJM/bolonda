import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Blog & Articles",
  description: "Read blog posts, articles, and stories written by members of the Bolonda family.",
};

export default function BlogPage() {
  const blogs = blogPosts.filter((p) => p.category === "blog");
  const articles = blogPosts.filter((p) => p.category === "article");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Blog &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Articles
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stories, insights, and knowledge shared by members of the Bolonda
            family. From personal blogs to thoughtful articles.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Latest Blog Posts"
            subtitle="Personal stories and updates from our family."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Articles"
            subtitle="In-depth articles and thought pieces from the Bolonda family."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
