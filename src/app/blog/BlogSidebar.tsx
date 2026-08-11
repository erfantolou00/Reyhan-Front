// components/BlogSidebar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getIcon } from '@/helper/renderIcon';
import blogData from '@/app/blog/blog.json';

export default function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجوی مقالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
            <FaSearch />
          </button>
        </div>
      </form>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 mb-4">دسته‌بندی‌ها</h3>
        <div className="space-y-2">
          {blogData.categories.map((category: any) => {
            const count = blogData.posts.filter(p => p.category_id === category.id).length;
            const Icon = getIcon(category.icon) as React.ReactNode;
            return (
              <Link
                key={category.id}
                href={`/blog/category/${category.id}`}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <span className="flex items-center gap-2 text-gray-700 group-hover:text-primary transition-colors">
                  {Icon && (Icon as React.ReactNode)}
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
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <button className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
            عضویت
          </button>
        </form>
      </div>
    </div>
  );
}