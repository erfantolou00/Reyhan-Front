import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa';

import ParticleBackground from '@/components/ParticleBackground';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'هوش مصنوعی در مدیریت سازمانی',
    subtitle: 'چگونه هوش مصنوعی می‌تواند بهره‌وری سازمان را تا ۴۰٪ افزایش دهد؟',
    image: "/images/blog/1.png",
    date: '۱۴۰۲/۱۲/۱۵',
    author: 'دکتر کمیلیان',
    slug: 'ai-in-enterprise-management',
    category: 'هوش مصنوعی'
  },
  {
    id: 2,
    title: 'یکپارچگی سیستم‌های سازمانی',
    subtitle: 'راهنمای جامع برای ایجاد یکپارچگی کامل بین ماژول‌های مختلف نرم‌افزار',
    image: "/images/blog/1.png",
    date: '۱۴۰۲/۱۲/۱۰',
    author: 'مهندس عابدینی',
    slug: 'enterprise-system-integration',
    category: 'یکپارچگی'
  },
  {
    id: 3,
    title: 'امنیت پیشرفته در نرم‌افزارهای سازمانی',
    subtitle: 'بررسی لایه‌های امنیتی و روش‌های رمزنگاری پیشرفته برای محافظت از داده‌ها',
    image: "/images/blog/1.png",
    date: '۱۴۰۲/۱۲/۰۵',
    author: 'دکتر کمیلیان',
    slug: 'advanced-enterprise-security',
    category: 'امنیت'
  },
  {
    id: 4,
    title: 'پشتیبانی ۲۴/۷ در نرم‌افزارهای سازمانی',
    subtitle: 'چگونه یک سیستم پشتیبانی حرفه‌ای می‌تواند به موفقیت سازمان کمک کند؟',
    image: "/images/blog/1.png",
    date: '۱۴۰۲/۱۲/۰۱',
    author: 'مهندس طلوع',
    slug: '24-7-enterprise-support',
    category: 'پشتیبانی'
  }
];

export default function BlogPage() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-white py-24 px-4 sm:px-6 lg:px-8">
        <ParticleBackground />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 relative">
            <span className="relative z-10">بلاگ</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">آخرین مقالات و آموزش‌های ما را در اینجا دنبال کنید</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id}>
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-1 rounded-full text-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-lg">{post.subtitle}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <FaCalendarAlt className="ml-2 text-primary" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUser className="ml-2 text-secondary" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
