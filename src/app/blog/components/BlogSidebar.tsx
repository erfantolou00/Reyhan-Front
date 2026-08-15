// components/BlogSidebar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getIcon } from '@/helper/renderIcon';
import blogData from '@/app/blog/blog.json';
import { Category, Post } from '@/types';
interface BlogData {
  posts: Post[];
  categories: Category[];
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    stats: {
      posts: number;
      readingTime: number;
      authors: number;
    };
  };
  sidebar: {
    popularTags: Array<{ name: string; count: number }>;
  };
}
export default function BlogSidebar({
  categories,
  posts,
  sidebar,
  onSearch,
}: {
  categories: Category[];
  posts: Post[];
  sidebar: BlogData['sidebar'];
  onSearch: (term: string) => void;
}) {
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
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی مقالات..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
  
        {/* Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">دسته‌بندی‌ها</h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const count = posts.filter(
                (p) => p.category_id === category.id && p.status === 'published'
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
        {sidebar?.popularTags?.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">برچسب‌های پرکاربرد</h3>
            <div className="flex flex-wrap gap-2">
              {sidebar.popularTags.slice(0, 10).map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${encodeURIComponent(tag.name)}`}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-primary/10 text-gray-600 hover:text-primary rounded-full text-xs transition-colors"
                >
                  #{tag.name}
                  <span className="text-gray-400 mr-1">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
  
        {/* Newsletter */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 shadow-lg border border-primary/10">
          <h3 className="text-lg font-bold text-gray-900 mb-2">📬 خبرنامه</h3>
          <p className="text-sm text-gray-600 mb-4">
            جدیدترین مقالات را در ایمیل خود دریافت کنید
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.querySelector('input') as HTMLInputElement;
              if (input.value) {
                alert(`ایمیل ${input.value} با موفقیت ثبت شد!`);
                input.value = '';
              }
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              required
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white rounded-xl py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>
    );
}