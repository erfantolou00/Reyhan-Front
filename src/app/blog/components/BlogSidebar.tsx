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
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0c1a2c]">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی مقالات..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 transition focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
  
        {/* Categories */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0c1a2c]">
          <h3 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">دسته‌بندی‌ها</h3>
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
                  className="group flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <span className="flex items-center gap-2 text-slate-700 transition-colors group-hover:text-primary dark:text-slate-200">
                    {CategoryIcon && (
                      <span className="text-primary">
                        <CategoryIcon className="w-4 h-4" />
                      </span>
                    )}
                    {category.name}
                  </span>
  
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:bg-white/10 dark:text-slate-300">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
  
        {/* Popular Tags */}
        {sidebar?.popularTags?.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0c1a2c]">
            <h3 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">برچسب‌های پرکاربرد</h3>
            <div className="flex flex-wrap gap-2">
              {sidebar.popularTags.slice(0, 10).map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${encodeURIComponent(tag.name)}`}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:bg-primary/10 hover:text-primary dark:bg-white/10 dark:text-slate-300"
                >
                  #{tag.name}
                  <span className="text-gray-400 mr-1">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}
  
        {/* Newsletter */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0c1a2c]">
          <h3 className="mb-2 text-lg font-bold text-slate-950 dark:text-white">خبرنامه</h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
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
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-transparent focus:ring-2 focus:ring-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>
    );
}