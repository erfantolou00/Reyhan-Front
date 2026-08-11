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
  FaArrowLeft,
  FaTag
} from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import blogData from '../../blog.json';

export const revalidate = 3600;

type Props = { params: { name: string } };

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

// تابع دریافت پست‌های یک برچسب
function getPostsByTag(tagName: string) {
  // دیکود کردن نام برچسب
  const decodedTag = decodeURIComponent(tagName);
  return blogData.posts.filter(p => p.tags && p.tags.includes(decodedTag));
}

// تابع دریافت نام برچسب دیکود شده
function getDecodedTagName(tagName: string) {
  return decodeURIComponent(tagName);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.name);
  const posts = getPostsByTag(params.name);
  
  if (posts.length === 0) {
    return {
      title: 'برچسب یافت نشد',
    };
  }

  return {
    title: `مقالات با برچسب #${decodedTag} | بلاگ ریحان`,
    description: `لیست مقالات با برچسب #${decodedTag} در وبلاگ ریحان`,
  };
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.name);
  const posts = getPostsByTag(params.name);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              بازگشت به بلاگ
            </Link>
            
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <FaTag className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">برچسب</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              #{decodedTag}
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {posts.length} مقاله با این برچسب
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            مقالات با برچسب <span className="text-primary">#{decodedTag}</span>
          </h2>
          <span className="text-sm text-gray-500">
            {posts.length} مقاله پیدا شد
          </span>
        </div>

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
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-white shadow-lg">
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
      </div>
    </div>
  );
}