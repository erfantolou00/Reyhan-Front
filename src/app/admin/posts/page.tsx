'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Post {
    id: number;
    title: string;
    subtitle?: string;
    slug: string;
    image_url?: string;
    category_id: number;
    reading_time?: number;
    published_at: string;
    status: 'draft' | 'published';
}

interface Categories {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
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

    const handleDelete = async (id: number) => {
        if (!confirm('آیا از حذف این نوشته مطمئن هستید؟ این عمل غیرقابل بازگشت است.')) return;

        const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchPosts();
        } else {
            alert('خطا در حذف پست');
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-lg">در حال بارگذاری نوشته‌ها...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-bold">نوشته‌های بلاگ</h2>
                    <p className="text-slate-600 mt-2">مدیریت تمام پست‌ها — {posts.length} نوشته</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="btn btn-primary flex items-center gap-2 text-lg"
                >
                    + نوشته جدید
                </Link>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/60 bg-white/50">
                            <th className="px-8 py-5 text-right">تصویر</th>
                            <th className="px-8 py-5 text-right">عنوان و زیرعنوان</th>
                            <th className="px-8 py-5 text-right">دسته‌بندی</th>
                            <th className="px-8 py-5 text-right">وضعیت</th>
                            <th className="px-8 py-5 text-right">زمان مطالعه</th>
                            <th className="px-8 py-5 text-right">تاریخ انتشار</th>
                            <th className="px-8 py-5 w-40"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/60">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-white/50 transition-colors">
                                <td className="px-8 py-5">
                                    {post.image_url && (
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-16 h-16 object-cover rounded-2xl border border-white/30"
                                        />
                                    )}
                                </td>

                                <td className="px-8 py-5">
                                    <div className="font-medium text-lg">{post.title}</div>
                                    {post.subtitle && (
                                        <div className="text-slate-600 text-sm mt-1 line-clamp-1">
                                            {post.subtitle}
                                        </div>
                                    )}
                                    <div className="text-xs text-slate-500 mt-2">/{post.slug}</div>
                                </td>

                                <td className="px-6 py-5">
                                    {post.category_id ? (
                                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {categories?.find((category: any) => category.id === post.category_id)?.name}
                                        </span>
                                    ) : (
                                        <span className="text-slate-400">—</span>
                                    )}
                                </td>

                                <td className="px-2 py-5">
                                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium
                    ${post.status === 'published'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                                    </span>
                                </td>

                                <td className="px-8 py-5 text-slate-600">
                                    {post.reading_time ? `${post.reading_time} دقیقه` : '—'}
                                </td>

                                <td className="px-8 py-5 text-slate-600">
                                    {new Date(post.published_at).toLocaleDateString('fa-IR')}
                                </td>

                                <td className="px-8 py-5 space-x-6 text-left flex gap-8 mt-6">
                                    <Link href={`/admin/posts/${post.id}/edit`} className="text-blue-600 hover:underline font-medium">
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-600 hover:underline font-medium"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {posts.length === 0 && (
                    <div className="text-center py-24 text-slate-500 text-lg">
                        هنوز هیچ نوشته‌ای ثبت نشده است.
                    </div>
                )}
            </div>
        </div>
    );
}