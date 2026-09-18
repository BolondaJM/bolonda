import Link from "next/link";
import { BlogPost } from "@/lib/data";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 relative overflow-hidden">
        {post.image ? (
          <Link href={`/blog/${post.id}`} className="absolute inset-0">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </Link>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white uppercase pointer-events-none">
          {post.category}
        </span>
        <div className="absolute bottom-3 right-3 px-2 py-1 text-xs text-white bg-black/40 rounded-md backdrop-blur-sm pointer-events-none">
          {post.readTime}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
      </div>
    </article>
  );
}
