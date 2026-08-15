'use client'

import Image from 'next/image';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEye,
  FaHeart,
  FaComment,
  FaSearch,
  FaSpinner,
} from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import { getIcon } from '@/helper/renderIcon';
import { useEffect, useState, useMemo, useCallback } from 'react';
import BlogSidebar from './components/BlogSidebar';
import { BlogData, Category, Post } from '@/types';
import BlogHero from './components/BlogHero';
import FeaturedPosts from './components/FeaturedPosts';
import LoadingState from './components/LoadingSstate';
import ErrorState from './components/ErrorState';
import RegularPosts from './components/RegularPosts';

export const revalidate = 3600;






// ---------------- Main Component ----------------
export default function BlogPage() {
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBlogData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // دریافت از localStorage با fallback
      let gateway = localStorage.getItem('gateway_url');

      // اگر gateway در localStorage نبود، از آدرس پیش‌فرض استفاده کن
      if (!gateway) {
        // می‌توانید آدرس پیش‌فرض خود را اینجا قرار دهید
        gateway = process.env.NEXT_PUBLIC_DEFAULT_GATEWAY_URL || '/api';
        console.warn('Gateway URL not found in localStorage, using default');
      }

      // ساخت URL با حذف اسلش اضافی
      const baseUrl = gateway.replace(/\/+$/, '');
      const url = `${baseUrl}/data/blog.json`;

      const response = await fetch(url, {
        // کش کردن برای بهبود عملکرد
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const json = await response.json();

      // اعتبارسنجی داده‌ها
      if (!json.posts || !Array.isArray(json.posts)) {
        throw new Error('داده‌های دریافتی نامعتبر هستند');
      }

      setData(json);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'خطای ناشناخته در دریافت اطلاعات';
      setError(errorMessage);
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  // Memoized data processing
  const processedData = useMemo(() => {
    if (!data) return null;

    const publishedPosts = data.posts?.filter((p) => p.status === 'published') || [];
    const featuredPosts = publishedPosts.filter((p) => p.featured === true);
    const regularPosts = publishedPosts.filter((p) => !p.featured);

    // فیلتر بر اساس جستجو
    const filteredRegularPosts = searchTerm
      ? regularPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.subtitle && post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      : regularPosts;

    return {
      ...data,
      publishedPosts,
      featuredPosts,
      regularPosts: filteredRegularPosts,
      totalPosts: publishedPosts.length,
    };
  }, [data, searchTerm]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchBlogData} />;
  }

  if (!processedData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <div className="text-lg text-gray-600">هیچ مقاله‌ای یافت نشد</div>
        </div>
      </div>
    );
  }

  const { posts, categories, hero, sidebar, featuredPosts, regularPosts } = processedData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-white to-gray-50">
      {/* Hero Section */}
      <BlogHero hero={hero} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Posts */}
          <div className="lg:col-span-3">
            {featuredPosts.length > 0 && (
              <FeaturedPosts
                posts={featuredPosts}
                categories={categories}
              />
            )}

            <RegularPosts
              posts={regularPosts}
              categories={categories}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {/* Sidebar */}
          <BlogSidebar
            categories={categories}
            posts={posts}
            sidebar={sidebar}
            onSearch={setSearchTerm}
          />
        </div>
      </div>
    </div>
  );
}

