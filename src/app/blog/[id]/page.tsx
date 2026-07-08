'use client';

import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaShareAlt,
} from 'react-icons/fa';

type BlogPostProps = {
  params: {
    id: number;
  };
};

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        <div className="h-6 w-36 bg-gray-200 rounded mb-8" />

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-[300px] md:h-[400px] w-full bg-gray-200" />

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-6">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
              </div>

              <div className="h-10 w-10 bg-gray-200 rounded-full" />
            </div>

            <div className="h-10 w-3/4 bg-gray-200 rounded mb-8" />
            <div className="h-1 w-24 bg-gray-200 rounded mb-10" />

            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-11/12 bg-gray-200 rounded" />
              <div className="h-4 w-10/12 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-9/12 bg-gray-200 rounded" />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded-full" />
                <div className="h-8 w-24 bg-gray-200 rounded-full" />
                <div className="h-8 w-16 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">خطا در بارگذاری مقاله</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-white hover:opacity-90 transition"
          >
            بازگشت به بلاگ
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">مقاله یافت نشد</h2>
          <p className="text-gray-600 mb-6">
            ممکن است مقاله حذف شده باشد یا آدرس وارد شده صحیح نباشد.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-white hover:opacity-90 transition"
          >
            بازگشت به بلاگ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPost({ params }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/blog/${params.id}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        if (res.status === 404) {
          setPost(null);
          return;
        }

        throw new Error('دریافت اطلاعات مقاله با مشکل مواجه شد.');
      }

      const data = await res.json();
      setPost(data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای ناشناخته رخ داده است.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const handleShare = async () => {
    const shareData = {
      title: post?.title ?? 'مقاله',
      text: post?.title ?? 'مشاهده مقاله',
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      alert('لینک مقاله کپی شد.');
    } catch {
      alert('امکان اشتراک‌گذاری وجود ندارد.');
    }
  };

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!post) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary hover:text-primary-dark mb-8 transition-colors duration-300 group"
        >
          <FaArrowLeft className="ml-2 transition-transform durati300 group-hover:translate-x-1" />
          <span>بازگشت به بلاگ</span>
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="relative h-[300px] md:h-[400px] w-full">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-1.5 rounded-full text-sm backdrop-blur-sm">
              {post.category_id}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="ml-2 text-primary shrink-0" />
                  <span>{post.created_at}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <FaUser className="ml-2 text-secondary shrink-0" />
                  {/* <span>{post.author ?? 'نویسنده'}</span> */}
                </div>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 self-start md:self-auto px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-colors duration-300"
              >
                <FaShareAlt size={16} />
                <span>اشتراک‌گذاری</span>
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 relative leading-tight">
              {post.title}
              <span className="absolute -bottom-4 right-0 w-24 h-1 bg-primary rounded-full"></span>
            </h1>

            <div className="prose prose-lg max-w-none prose-p:leading-8 prose-p:text-gray-700">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>

            {/* {!!post.tags?.length && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <span
                      key={`${tag}-${index}`}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </article>
      </div>
    </div>
  );
}
