import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowRight, 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaEye, 
  FaHeart, 
  FaComment,
  FaArrowLeft
} from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import blogData from '../../blog.json';

export const revalidate = 3600;

type Props = { params: { id: string } };

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

// تابع دریافت آیکون دسته‌بندی
const getCategoryIcon = (categoryId: number) => {
  const category = blogData.categories.find(c => c.id === categoryId);
  return category?.icon || 'Briefcase';
};

// تابع دریافت پست‌های یک دسته‌بندی
function getPostsByCategory(categoryId: string) {
  const id = parseInt(categoryId);
  const posts = blogData.posts.filter(p => p.category_id === id);
  return posts;
}

// تابع دریافت اطلاعات دسته‌بندی
function getCategoryById(categoryId: string) {
  const id = parseInt(categoryId);
  const category = blogData.categories.find(c => c.id === id);
  return category || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryById(params.id);
  if (!category) {
    return {
      title: 'دسته‌بندی یافت نشد',
    };
  }

  return {
    title: `مقالات ${category.name} | بلاگ ریحان`,
    description: `لیست مقالات دسته‌بندی ${category.name} در وبلاگ ریحان`,
  };
}

export default async function CategoryPage({ params }: Props) {
  // دریافت اطلاعات دسته‌بندی
  const category = getCategoryById(params.id);
  
  // اگر دسته‌بندی وجود نداشت، صفحه 404 نشان بده
  if (!category) {
    notFound();
  }

  // دریافت پست‌های این دسته‌بندی
  const posts = getPostsByCategory(params.id);
  const categoryName = getCategoryName(parseInt(params.id));
  const categoryColor = getCategoryColor(parseInt(params.id));
  const categoryIcon = getCategoryIcon(parseInt(params.id));

  // آمار مقالات
  const totalPosts = posts.length;
  const totalReadingTime = posts.reduce((acc, post) => acc + (post.reading_time || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br from-${categoryColor}/90 via-${categoryColor}/70 to-${categoryColor}/50 pt-32 pb-16 overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              بازگشت به بلاگ
            </Link>
            
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">{categoryIcon === 'Briefcase' ? '📁' : 
                categoryIcon === 'Brain' ? '🧠' : 
                categoryIcon === 'Code' ? '💻' : '📂'}</span>
              <span className="text-white text-sm font-medium">دسته‌بندی</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {categoryName}
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {totalPosts} مقاله در این دسته‌بندی
            </p>

            {/* Category Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{totalPosts}</div>
                <div className="text-xs text-white/70">مقاله</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{totalReadingTime}</div>
                <div className="text-xs text-white/70">دقیقه مطالعه</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{posts.length > 0 ? '✅' : '❌'}</div>
                <div className="text-xs text-white/70">وضعیت</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        {posts.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                تمام مقالات <span className={`text-${categoryColor}`}>{categoryName}</span>
              </h2>
              <span className="text-sm text-gray-500">
                {posts.length} مقاله پیدا شد
              </span>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={post.id} 
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image_url || '/placeholder.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${categoryColor}/90 text-white shadow-lg`}>
                        {categoryName}
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
                          {post.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="w-3 h-3" />
                          {post.comments || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              هیچ مقاله‌ای در این دسته‌بندی یافت نشد
            </h3>
            <p className="text-gray-600 mb-8">
              برای مشاهده مقالات، به صفحه اصلی بلاگ بازگردید
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              بازگشت به بلاگ
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}