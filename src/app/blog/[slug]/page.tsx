import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaShareAlt } from 'react-icons/fa';

// This would typically come from an API or database
const getBlogPost = (slug: string) => {
  const posts = {
    'erp-concepts-and-training': {
      title: 'آموزش ERP و مفاهیم آن',
      content: `سیستم‌های ERP (برنامه‌ریزی منابع سازمانی) امروزه به یکی از ارکان اصلی مدیریت سازمان‌ها تبدیل شده‌اند. در این مقاله، به بررسی مفاهیم پایه و پیشرفته ERP می‌پردازیم.

مفاهیم کلیدی ERP:
۱. مدیریت یکپارچه فرآیندها
۲. مدیریت مالی و حسابداری
۳. مدیریت منابع انسانی
۴. مدیریت زنجیره تأمین
۵. مدیریت ارتباط با مشتری

مزایای پیاده‌سازی ERP:
- یکپارچگی اطلاعات
- کاهش هزینه‌های عملیاتی
- بهبود تصمیم‌گیری
- افزایش بهره‌وری
- مدیریت بهتر منابع

مراحل پیاده‌سازی موفق:
۱. نیازسنجی دقیق
۲. انتخاب سیستم مناسب
۳. برنامه‌ریزی دقیق
۴. آموزش کاربران
۵. پشتیبانی و نگهداری`,
      image: "/images/blog/1.webp",
      date: '۱۴۰۲/۱۲/۱۵',
      author: 'دکتر کمیلیان',
      category: 'آموزش',
      tags: ['ERP', 'مدیریت سازمانی', 'آموزش', 'بهینه‌سازی']
    },
    'organizational-solutions-cost-reduction': {
      title: 'راهکارهای سازمانی و کاهش هزینه',
      content: `کاهش هزینه‌ها و بهینه‌سازی منابع از دغدغه‌های اصلی مدیران سازمان‌ها است. در این مقاله، به بررسی استراتژی‌های کاربردی برای کاهش هزینه‌ها می‌پردازیم.

راهکارهای کاهش هزینه:
۱. بهینه‌سازی فرآیندها
۲. مدیریت هوشمند موجودی
۳. کاهش ضایعات
۴. استفاده از فناوری‌های نوین
۵. آموزش و توسعه کارکنان

استراتژی‌های بهینه‌سازی:
- اتوماسیون فرآیندها
- مدیریت هوشمند انرژی
- بهینه‌سازی زنجیره تأمین
- مدیریت ریسک
- برنامه‌ریزی استراتژیک

نکات کلیدی موفقیت:
- مشارکت تمام سطوح سازمان
- اندازه‌گیری و پایش مستمر
- استفاده از داده‌های تحلیلی
- بهبود مستمر
- مدیریت تغییر`,
      image: "/images/blog/2.jpg",
      date: '۱۴۰۲/۱۲/۱۰',
      author: 'مهندس عابدینی',
      category: 'مدیریت هزینه',
      tags: ['کاهش هزینه', 'بهینه‌سازی', 'مدیریت سازمانی', 'استراتژی']
    },
    'reyhan-customer-experiences': {
      title: 'تجربه مشتریان با ریحان',
      content: `سیستم ریحان با ارائه راهکارهای جامع مدیریت سازمانی، تجربه‌های موفق متعددی را برای مشتریان خود رقم زده است. در این مقاله، به بررسی تجربیات موفق مشتریان می‌پردازیم.

موارد موفقیت:
۱. افزایش ۴۰ درصدی بهره‌وری
۲. کاهش ۳۰ درصدی هزینه‌های عملیاتی
۳. بهبود ۵۰ درصدی مدیریت موجودی
۴. افزایش ۶۰ درصدی رضایت مشتریان
۵. کاهش ۴۵ درصدی زمان فرآیندها

مزایای استفاده از ریحان:
- یکپارچگی کامل سیستم‌ها
- پشتیبانی ۲۴/۷
- رابط کاربری ساده
- گزارش‌گیری پیشرفته
- قابلیت توسعه

تجربیات مشتریان:
- شرکت تولیدی آلفا
- گروه صنعتی بتا
- مجموعه خدماتی گاما
- شرکت بازرگانی دلتا`,
      image: "/images/blog/3.webp",
      date: '۱۴۰۲/۱۲/۰۵',
      author: 'دکتر کمیلیان',
      category: 'تجربیات مشتریان',
      tags: ['ریحان', 'تجربیات مشتریان', 'موفقیت', 'مدیریت سازمانی']
    },
    'erp-comparison-selection': {
      title: 'مقایسه و انتخاب سیستم‌های ERP',
      content: `انتخاب سیستم ERP مناسب یکی از مهم‌ترین تصمیمات مدیریتی است. در این مقاله، به بررسی معیارهای کلیدی برای انتخاب بهترین سیستم ERP می‌پردازیم.

معیارهای انتخاب ERP:
۱. نیازهای سازمانی
۲. مقیاس‌پذیری
۳. هزینه‌های پیاده‌سازی
۴. پشتیبانی و خدمات
۵. قابلیت‌های فنی

مقایسه سیستم‌های مختلف:
- ریحان
- سپیدار
- پارسیان
- همکاران
- پیام‌گستر

نکات مهم در انتخاب:
- بررسی دقیق نیازها
- ارزیابی هزینه‌های کل
- بررسی تجربیات مشتریان
- قابلیت توسعه
- پشتیبانی فنی`,
      image: "/images/blog/4.webp",
      date: '۱۴۰۲/۱۲/۰۱',
      author: 'مهندس طلوع',
      category: 'مقایسه سیستم‌ها',
      tags: ['ERP', 'مقایسه', 'انتخاب سیستم', 'مدیریت سازمانی']
    },
    'organizational-management-trends': {
      title: 'چالش‌ها و ترندهای مدیریت سازمانی',
      content: `مدیریت سازمانی در عصر دیجیتال با چالش‌ها و فرصت‌های جدیدی مواجه شده است. در این مقاله، به بررسی چالش‌های نوین و روندهای آینده می‌پردازیم.

چالش‌های نوین:
۱. تحول دیجیتال
۲. مدیریت داده‌های کلان
۳. امنیت سایبری
۴. مدیریت منابع انسانی
۵. تغییرات سریع بازار

ترندهای آینده:
- هوش مصنوعی و یادگیری ماشین
- اینترنت اشیاء
- بلاکچین
- رایانش ابری
- اتوماسیون هوشمند

راهکارهای مقابله:
- سرمایه‌گذاری در فناوری
- توسعه مهارت‌های دیجیتال
- مدیریت تغییر
- نوآوری مستمر
- همکاری استراتژیک`,
      image: "/images/blog/5.jpg",
      date: '۱۴۰۲/۱۱/۲۵',
      author: 'دکتر کمیلیان',
      category: 'مدیریت',
      tags: ['مدیریت سازمانی', 'چالش‌ها', 'ترندها', 'تحول دیجیتال']
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