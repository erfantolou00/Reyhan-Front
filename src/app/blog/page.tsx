import Image from 'next/image';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEye,
  FaHeart,
  FaComment,
  FaSearch
} from 'react-icons/fa';
import {
  Sparkles
} from 'lucide-react';
import { getIcon } from '@/helper/renderIcon';
import blogData from './blog.json';

export const revalidate = 3600; // هر ساعت بروزرسانی شود

// تابع دریافت آیکون دسته‌بندی
const getCategoryIcon = (categoryId: number) => {
  const category = blogData.categories.find(c => c.id === categoryId);
  if (!category) return null;
  return getIcon(category.icon);
};

// تابع دریافت نام دسته‌بندی
const getCategoryName = (categoryId: number) => {
  const category = blogData.categories.find(c => c.id === categoryId);
  return category?.name || 'دسته‌بندی نشده';
};

// تابع دریافت رنگ دسته‌بندی
const getCategoryColor = (categoryId: number) => {
  const category = blogData.categories.find(c => c.id === categoryId);
  return category?.color || 'primary';
};

export default async function BlogPage() {
  const posts = blogData.posts;
  const featuredPosts = posts.filter((p: any) => p.status === 'published');
  const regularPosts = posts.filter((p: any) => p.status !== 'published');

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{blogData.hero.badge}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {blogData.hero.title}
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {blogData.hero.subtitle}
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{blogData.hero.stats.posts}</div>
                <div className="text-xs text-white/70">مقاله</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{blogData.hero.stats.readingTime}</div>
                <div className="text-xs text-white/70">زمان مطالعه</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{blogData.hero.stats.authors}</div>
                <div className="text-xs text-white/70">نویسنده</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Posts */}
          <div className="lg:col-span-3">

            {/* Featured Post */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  مقاله ویژه
                </h2>
                {featuredPosts.map((post: any) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="group block">
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                          <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                          <div className="absolute bottom-4 right-4 md:hidden">
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-${getCategoryColor(post.category_id)}/90 text-white`}>
                              {getCategoryName(post.category_id)}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                          <div className="hidden md:block mb-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(post.category_id)}/10 text-${getCategoryColor(post.category_id)}`}>
                              {getCategoryName(post.category_id)}
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
                              {new Date(post.published_at).toLocaleDateString('fa-IR')}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="text-primary" />
                              {post.reading_time} دقیقه
                            </span>
                          </div>
                          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <FaEye />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaHeart className="text-red-400" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaComment />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Regular Posts Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                جدیدترین مقالات
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularPosts.map((post: any) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="group h-full">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">

                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={post.image_url || '/placeholder.jpg'}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(post.category_id)}/90 text-white shadow-lg`}>
                            {getCategoryName(post.category_id)}
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
                              {post.author_avatar ? (
                                <Image
                                  src={post.author_avatar}
                                  alt={post.author}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-xs font-bold">
                                  {post.author?.[0] || 'U'}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-700 font-medium text-xs">{post.author}</span>
                              <span className="text-gray-400 text-[10px]">
                                {new Date(post.published_at).toLocaleDateString('fa-IR')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <FaHeart className="text-red-400 w-3 h-3" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaComment className="w-3 h-3" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی مقالات..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">دسته‌بندی‌ها</h3>
              <div className="space-y-2">
                {blogData.categories.map((category: any) => {
                  const count = blogData.posts.filter(
                    (p) => p.category_id === category.id
                  ).length;

                  const CategoryIcon = getIcon(category.icon);

                  return (
                    <Link
                      key={category.id}
                      href={`/blog/category/${category.id}`}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <span className="flex items-center gap-2 text-gray-700 group-hover:text-primary transition-colors">
                        {CategoryIcon && (
                          <span className="text-primary">
                            <CategoryIcon className="w-4 h-4" />
                          </span>
                        )}

                        {category.name}
                      </span>

                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
                        {count}
                      </span>
                    </Link>
                  );
                })}

              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">برچسب‌های پرکاربرد</h3>
              <div className="flex flex-wrap gap-2">
                {blogData.sidebar.popularTags.map((tag: any, index: number) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary rounded-full text-xs transition-colors"
                  >
                    #{tag.name}
                    <span className="text-gray-400 mr-1">({tag.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 shadow-lg border border-primary/10">
              <h3 className="text-lg font-bold text-gray-900 mb-2">📬 خبرنامه</h3>
              <p className="text-sm text-gray-600 mb-4">
                جدیدترین مقالات را در ایمیل خود دریافت کنید
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <button className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
                  عضویت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}