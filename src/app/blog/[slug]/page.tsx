import Image from 'next/image';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaEye, 
  FaHeart, 
  FaComment,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaCopy,
  FaTag
} from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import blogData from '@/app/blog/blog.json';
import ShareButtons from '@/components/SharedButtons';

export const revalidate = 3600;

type Props = { params: { slug: string } };

// تابع دریافت اطلاعات نویسنده از تمام پست‌ها
const getAuthorInfo = (authorName: string) => {
  if (!blogData || !blogData.posts) {
    return {
      name: authorName || 'نویسنده',
      avatar: '/images/authors/default.jpg',
      bio: 'نویسنده تیم ریحان'
    };
  }
  const post = blogData.posts.find(p => p.author === authorName);
  return {
    name: authorName || 'نویسنده',
    avatar: post?.author_avatar || '/images/authors/default.jpg',
    bio: post?.author_bio || 'نویسنده تیم ریحان'
  };
};

// تابع دریافت نام دسته‌بندی
const getCategoryName = (categoryId: number) => {
  if (!blogData || !blogData.categories) {
    return 'دسته‌بندی نشده';
  }
  const category = blogData.categories.find(c => c.id === categoryId);
  return category?.name || 'دسته‌بندی نشده';
};

// تابع دریافت رنگ دسته‌بندی
const getCategoryColor = (categoryId: number) => {
  if (!blogData || !blogData.categories) {
    return 'primary';
  }
  const category = blogData.categories.find(c => c.id === categoryId);
  return category?.color || 'primary';
};

// تابع دریافت پست با اسلاگ
function getPostBySlug(slug: string) {
  try {
    if (!blogData || !blogData.posts) {
      console.error('داده‌های بلاگ موجود نیست');
      return null;
    }
    const post = blogData.posts.find(p => p.slug === slug);
    if (!post) {
      console.log(`پست با اسلاگ ${slug} یافت نشد`);
      return null;
    }
    return post;
  } catch (error) {
    console.error('خطا در دریافت پست:', error);
    return null;
  }
}

// تابع دریافت مقالات مشابه
function getRelatedPosts(post: any) {
  try {
    if (!blogData || !blogData.posts) {
      return [];
    }
    return blogData.posts
      .filter(p => p.slug !== post.slug && p.category_id === post.category_id)
      .slice(0, 3);
  } catch (error) {
    console.error('خطا در دریافت مقالات مشابه:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;          // ← این خط مهم است
  const post = getPostBySlug(slug);
  console.log('%c⧭', 'color: #1d5673', post);
  if (!post) {
    return {
      title: 'مقاله یافت نشد',
    };
  }

  return {
    title: post.title,
    description: post.subtitle,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: [post.image_url],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  console.log('%c⧭', 'color: #731d1d', params);
  const { slug } = await params;          // ← این خط مهم است
  // دریافت پست با اسلاگ
  const post = getPostBySlug(slug);
  console.log('%c⧭', 'color: #f200e2', post);
  
  // اگر پست وجود نداشت، صفحه 404 نشان بده
  if (!post) {
    notFound();
  }

  // دریافت مقالات مشابه
  const relatedPosts = getRelatedPosts(post);
  
  // دریافت اطلاعات نویسنده
  const authorInfo = getAuthorInfo(post.author);
  
  // دریافت اطلاعات دسته‌بندی
  const categoryName = getCategoryName(post.category_id);
  const categoryColor = getCategoryColor(post.category_id);

  // ساخت URL کامل برای اشتراک‌گذاری
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: '0%' }}
          id="progress-bar"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          بازگشت به بلاگ
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Hero Image */}
          <div className="relative h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
            <Image
              src={post.image_url || '/images/blog/default.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-6 right-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium bg-${categoryColor}/90 text-white shadow-lg backdrop-blur-sm`}>
                {categoryName}
              </span>
            </div>

            {/* Reading Time & Views */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4 text-white/90 text-sm">
              <span className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <FaClock className="w-4 h-4" />
                {post.reading_time || 0} دقیقه مطالعه
              </span>
              <span className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <FaEye className="w-4 h-4" />
                {post.views || 0} بازدید
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {post.subtitle}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10">
                    {authorInfo.avatar ? (
                      <Image
                        src={authorInfo.avatar}
                        alt={authorInfo.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-sm font-bold">
                        {authorInfo.name?.[0] || 'U'}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{authorInfo.name}</div>
                    <div className="text-xs text-gray-400">{authorInfo.bio}</div>
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-200" />

                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'تاریخ نامشخص'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-200 transition text-red-500">
                  <FaHeart className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.likes || 0}</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition text-blue-500">
                  <FaComment className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.comments || 0}</span>
                </button>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <FaTag className="text-gray-400 w-4 h-4" />
                {post.tags.map((tag: string, index: number) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${tag}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary rounded-full text-xs transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none prose-p:leading-8 text-gray-700">
              {post.content ? post.content.split('\n').map((paragraph: string, index: number) => {
                // هدر سطح ۳
                if (paragraph.trim().startsWith('###')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                // هدر سطح ۲
                if (paragraph.trim().startsWith('##')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold mt-10 mb-6 text-gray-900">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  );
                }
                // هدر سطح ۱
                if (paragraph.trim().startsWith('#')) {
                  return (
                    <h1 key={index} className="text-4xl font-bold mt-12 mb-8 text-gray-900">
                      {paragraph.replace('#', '').trim()}
                    </h1>
                  );
                }
                // لیست با ستاره
                if (paragraph.trim().startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4">
                      {paragraph.split('\n').map((item, idx) => {
                        if (item.trim().startsWith('-')) {
                          return (
                            <li key={idx} className="text-gray-700">
                              {item.replace('-', '').trim()}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  );
                }
                // لیست شماره‌دار
                if (paragraph.trim().match(/^\d+\./)) {
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                      {paragraph.split('\n').map((item, idx) => {
                        if (item.trim().match(/^\d+\./)) {
                          return (
                            <li key={idx} className="text-gray-700">
                              {item.replace(/^\d+\./, '').trim()}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ol>
                  );
                }
                // پاراگراف معمولی
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  );
                }
                return null;
              }) : <p>محتوای مقاله موجود نیست</p>}
            </div>

           {/* Share Section */}
<div className="mt-12 pt-8 border-t border-gray-100">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <span className="text-sm font-medium text-gray-700">اشتراک‌گذاری مقاله:</span>
    <ShareButtons postUrl={postUrl} title={post.title} />
  </div>
</div>

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                  {authorInfo.avatar ? (
                    <Image
                      src={authorInfo.avatar}
                      alt={authorInfo.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-xl font-bold">
                      {authorInfo.name?.[0] || 'U'}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{authorInfo.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{authorInfo.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-primary rounded-full" />
              مقالات مشابه
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedPost.image_url || '/images/blog/default.jpg'}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(relatedPost.category_id)}/90 text-white`}>
                      {getCategoryName(relatedPost.category_id)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {relatedPost.reading_time || 0} دقیقه
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        {relatedPost.published_at ? new Date(relatedPost.published_at).toLocaleDateString('fa-IR') : 'تاریخ نامشخص'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const scrollTop = window.scrollY;
              const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const progress = (scrollTop / docHeight) * 100;
              const progressBar = document.getElementById('progress-bar');
              if (progressBar) {
                progressBar.style.width = progress + '%';
              }
            });
          `,
        }}
      />
    </div>
  );
}