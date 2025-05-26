import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaShareAlt } from 'react-icons/fa';

// This would typically come from an API or database
const getBlogPost = (slug: string) => {
  const posts = {
    'ai-in-enterprise-management': {
      title: 'هوش مصنوعی در مدیریت سازمانی',
      content: `هوش مصنوعی در مدیریت سازمانی تحولی شگرف ایجاد کرده است. با استفاده از الگوریتم‌های پیشرفته و یادگیری ماشین، سیستم‌های مدیریتی هوشمند قادر به پیش‌بینی دقیق نیازهای سازمان و بهینه‌سازی فرآیندها هستند.

در این مقاله، به بررسی روش‌های مختلف استفاده از هوش مصنوعی در مدیریت سازمانی می‌پردازیم:

۱. پیش‌بینی تقاضا و برنامه‌ریزی منابع
۲. بهینه‌سازی فرآیندهای کاری
۳. تحلیل داده‌های سازمانی
۴. مدیریت هوشمند موجودی
۵. پیش‌بینی رفتار مشتریان

نتایج تحقیقات نشان می‌دهد که استفاده از هوش مصنوعی می‌تواند بهره‌وری سازمان را تا ۴۰٪ افزایش دهد.`,
      image: "/images/blog/1.png",
      date: '۱۴۰۲/۱۲/۱۵',
      author: 'دکتر کمیلیان',
      category: 'هوش مصنوعی',
      tags: ['هوش مصنوعی', 'مدیریت سازمانی', 'بهینه‌سازی', 'تحلیل داده']
    },
    'enterprise-system-integration': {
      title: 'یکپارچگی سیستم‌های سازمانی',
      content: `یکپارچگی سیستم‌های سازمانی یکی از مهم‌ترین چالش‌های پیش روی مدیران IT است. در این مقاله، به بررسی روش‌های ایجاد یکپارچگی کامل بین ماژول‌های مختلف نرم‌افزار می‌پردازیم.

مزایای یکپارچگی سیستم‌ها:
- کاهش خطاهای انسانی
- افزایش کارایی
- مدیریت متمرکز داده‌ها
- کاهش هزینه‌های عملیاتی
- بهبود تصمیم‌گیری

روش‌های پیاده‌سازی یکپارچگی:
۱. استفاده از API‌های استاندارد
۲. پیاده‌سازی Middleware
۳. استفاده از سیستم‌های Message Queue
۴. بهره‌گیری از معماری Microservices`,
      image: "/images/blog/1.png",
      date: '۱۴۰۲/۱۲/۱۰',
      author: 'مهندس عابدینی',
      category: 'یکپارچگی',
      tags: ['یکپارچگی', 'سیستم‌های سازمانی', 'API', 'Microservices']
    },
    'advanced-enterprise-security': {
      title: 'امنیت پیشرفته در نرم‌افزارهای سازمانی',
      content: `امنیت در نرم‌افزارهای سازمانی از اهمیت ویژه‌ای برخوردار است. در این مقاله، به بررسی لایه‌های امنیتی و روش‌های رمزنگاری پیشرفته برای محافظت از داده‌ها می‌پردازیم.

لایه‌های امنیتی پیشرفته:
۱. رمزنگاری داده‌ها در حالت استراحت
۲. رمزنگاری داده‌ها در حالت انتقال
۳. احراز هویت چند عاملی
۴. مدیریت دسترسی‌های گرانولار
۵. پشتیبان‌گیری خودکار

روش‌های محافظت از داده‌ها:
- رمزنگاری AES-256
- پروتکل‌های امنیتی TLS 1.3
- سیستم‌های تشخیص نفوذ
- مانیتورینگ مداوم`,
      image: "/images/blog/1.png",
      date: '۱۴۰۲/۱۲/۰۵',
      author: 'دکتر کمیلیان',
      category: 'امنیت',
      tags: ['امنیت', 'رمزنگاری', 'حفاظت داده', 'امنیت سایبری']
    },
    '24-7-enterprise-support': {
      title: 'پشتیبانی ۲۴/۷ در نرم‌افزارهای سازمانی',
      content: `پشتیبانی ۲۴/۷ یکی از ارکان موفقیت نرم‌افزارهای سازمانی است. در این مقاله، به بررسی روش‌های ایجاد و مدیریت یک سیستم پشتیبانی حرفه‌ای می‌پردازیم.

مزایای پشتیبانی ۲۴/۷:
- دسترسی دائمی به متخصصان
- کاهش زمان توقف سیستم
- افزایش رضایت کاربران
- بهبود کیفیت خدمات
- مدیریت بحران به موقع

روش‌های پیاده‌سازی:
۱. تیم پشتیبانی چند لایه
۲. سیستم تیکتینگ هوشمند
۳. پشتیبانی از راه دور
۴. مستندسازی خودکار
۵. گزارش‌گیری پیشرفته`,
      image: "/images/blog/1.png",
      date: '۱۴۰۲/۱۲/۰۱',
      author: 'مهندس طلوع',
      category: 'پشتیبانی',
      tags: ['پشتیبانی', 'خدمات مشتری', 'مدیریت تیکت', 'پشتیبانی فنی']
    }
  };
  return posts[slug as keyof typeof posts];
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    return <div>مقاله یافت نشد</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors duration-300 group"
        >
          <FaArrowLeft className="ml-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span>بازگشت به بلاگ</span>
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-1 rounded-full text-sm">
              {post.category}
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="ml-2 text-primary" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUser className="ml-2 text-secondary" />
                  <span>{post.author}</span>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-primary transition-colors duration-300">
                <FaShareAlt size={20} />
              </button>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-8 relative">
              {post.title}
              <span className="absolute -bottom-4 left-0 w-24 h-1 bg-primary"></span>
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 