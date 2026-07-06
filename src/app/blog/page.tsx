'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaTimesCircle, FaClock } from 'react-icons/fa';

import ParticleBackground from '@/components/ParticleBackground';
import { createClient } from '@/lib/supabase/server';
import { useEffect, useState } from 'react';
import { Category, Post } from '@/types';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'آموزش ERP و مفاهیم آن',
    subtitle: 'راهنمای جامع برای درک مفاهیم پایه و پیشرفته سیستم‌های ERP',
    image: "/images/blog/1.webp",
    date: '۱۴۰۲/۱۲/۱۵',
    author: 'دکتر کمیلیان',
    slug: 'erp-concepts-and-training',
    category: 'آموزش'
  },
  {
    id: 2,
    title: 'راهکارهای سازمانی و کاهش هزینه',
    subtitle: 'استراتژی‌های کاربردی برای بهینه‌سازی هزینه‌ها و افزایش کارایی سازمان',
    image: "/images/blog/2.jpg",
    date: '۱۴۰۲/۱۲/۱۰',
    author: 'مهندس عابدینی',
    slug: 'organizational-solutions-cost-reduction',
    category: 'مدیریت هزینه'
  },
  {
    id: 3,
    title: 'تجربه مشتریان با ریحان',
    subtitle: 'داستان موفقیت مشتریان ما در پیاده‌سازی و استفاده از سیستم ریحان',
    image: "/images/blog/3.webp",
    date: '۱۴۰۲/۱۲/۰۵',
    author: 'دکتر کمیلیان',
    slug: 'reyhan-customer-experiences',
    category: 'تجربیات مشتریان'
  },
  {
    id: 4,
    title: 'مقایسه و انتخاب سیستم‌های ERP',
    subtitle: 'معیارهای کلیدی برای انتخاب بهترین سیستم ERP متناسب با نیازهای سازمان شما',
    image: "/images/blog/4.webp",
    date: '۱۴۰۲/۱۲/۰۱',
    author: 'مهندس طلوع',
    slug: 'erp-comparison-selection',
    category: 'مقایسه سیستم‌ها'
  },
  {
    id: 5,
    title: 'چالش‌ها و ترندهای مدیریت سازمانی',
    subtitle: 'بررسی چالش‌های نوین و روندهای آینده در مدیریت سازمانی',
    image: "/images/blog/5.jpg",
    date: '۱۴۰۲/۱۱/۲۵',
    author: 'دکتر کمیلیان',
    slug: 'organizational-management-trends',
    category: 'مدیریت'
  }
];

export default async function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
      try {
          const res = await fetch('/api/blog');
          const data = await res.json();
          setPosts(data);
      } catch (error) {
          console.error('خطا در دریافت پست‌ها:', error);
      } finally {
          setLoading(false);
      }
  };
  const fetchCategories = async () => {
      try {
          const res = await fetch('/api/categories');
          const data = await res.json();
          setCategories(data);
      } catch (error) {
          console.error('خطا در دریافت پست‌ها:', error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchPosts();
      fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white py-32 px-4 sm:px-6 lg:px-8">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 relative">
            <span className="relative z-10">بلاگ</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
          </h1>
        </div>

        {/* استفاده از grid با ابعاد ثابت برای کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group h-full">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                
                {/* بخش تصویر: ارتفاع ثابت */}
                <div className="relative h-56 w-full overflow-hidden shrink-0">
                  <Image
                    src={post.image_url || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-1 rounded-full text-xs font-medium">
                    {categories?.find((c: any) => c.id === post.category_id)?.name || 'بدون دسته'}
                  </div>
                </div>

                {/* بخش متن: flex-grow برای پر کردن فضای خالی */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                    {post.subtitle}
                  </p>
                  
                  {/* فوتر کارت: همیشه پایین قرار می‌گیرد */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-primary" />
                      <span>{new Date(post.published_at).toLocaleDateString('fa-IR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-primary" />
                      <span>{post.reading_time} دقیقه</span>
                    </div>
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
