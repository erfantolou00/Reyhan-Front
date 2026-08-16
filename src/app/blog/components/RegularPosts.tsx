import { FaClock, FaComment, FaHeart, FaSearch } from "react-icons/fa";
import formatNumber from "../utility/UtilityFunc";
import Image from "next/image";
import { getCategoryName, getColorClasses } from "../helper/HelperFunc";
import Link from "next/link";
import { Category, Post } from "@/types";

export default function RegularPosts({
  posts,
  categories,
  searchTerm,
  onSearchChange,
}: {
  posts: Post[];
  categories: Category[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-gray-600">هیچ مقاله‌ای با عبارت "{searchTerm}" یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          جدیدترین مقالات
          <span className="text-sm font-normal text-gray-500">({posts.length})</span>
        </h2>

        {/* Search Input - Mobile */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="جستجو در مقالات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => {
          const colors = getColorClasses(categories, post.category_id);

          return (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group h-full"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image_url || '/placeholder-blog.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-blog.jpg';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} text-white shadow-lg`}
                    >
                      {getCategoryName(categories, post.category_id)}
                    </span>
                  </div>
                  {post.reading_time && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      {post.reading_time} دقیقه
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                    {post.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10">
                        {(post.author_avatar && post.author) ? (
                          <Image
                            src={post.author_avatar}
                            alt={post.author}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-xs font-bold">
                            {post.author?.[0]?.toUpperCase() || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-700 font-medium text-xs">
                          {post.author}
                        </span>
                        <span className="text-gray-400 text-[10px]">
                          {new Date(post.published_at).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {post.likes && <span className="flex items-center gap-1">
                        <FaHeart className="text-red-400 w-3 h-3" />
                        {formatNumber(post.likes)}
                      </span>}
                      {post.comments && <span className="flex items-center gap-1">
                        <FaComment className="w-3 h-3" />
                        {formatNumber(post.comments)}
                      </span>}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}