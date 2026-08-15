import { Category, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEye,
  FaHeart,
  FaComment,
} from "react-icons/fa";
import { getCategoryName, getColorClasses } from "../helper/HelperFunc";
import formatNumber from "../utility/UtilityFunc";

export default function FeaturedPosts({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full" />
        مقاله ویژه
      </h2>

      {posts.map((post) => {
        const colors = getColorClasses(categories, post.category_id);

        return (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
            className="group block"
          >
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                  <Image
                    src={post.image_url || "/placeholder-blog.jpg"}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-blog.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                  <div className="absolute bottom-4 right-4 md:hidden">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${colors.bg} text-white`}
                    >
                      {getCategoryName(categories, post.category_id)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="hidden md:block mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.soft}`}
                    >
                      {getCategoryName(categories, post.category_id)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-primary" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-primary" />
                      {new Date(post.published_at).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-primary" />
                      {post.reading_time} دقیقه
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaEye />
                      {formatNumber(post.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-400" />
                      {formatNumber(post.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment />
                      {formatNumber(post.comments)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}