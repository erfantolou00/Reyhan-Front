'use client';
import { useEffect, useState } from 'react';

interface Stats {
  totalPosts: number;
  published: number;
  drafts: number;
  lastPost?: any;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    published: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then((posts) => {
        const published = posts.filter((p: any) => p.status === 'published').length;
        const drafts = posts.length - published;

        setStats({
          totalPosts: posts.length,
          published,
          drafts,
          lastPost: posts[0] || null,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl font-bold gradient-text">خوش آمدید به پنل مدیریت</h2>
        <p className="text-slate-600 text-lg mt-2">امروز چه محتوایی می‌خواهید بسازید؟</p>
      </div>

      {loading ? (
        <div className="text-center py-20">در حال بارگذاری آمار...</div>
      ) : (
        <>
          {/* کارت‌های آمار */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-8">
              <p className="text-slate-600 text-sm">کل نوشته‌ها</p>
              <p className="text-6xl font-bold mt-3 text-slate-900">{stats.totalPosts}</p>
            </div>

            <div className="glass-card p-8">
              <p className="text-slate-600 text-sm">منتشر شده</p>
              <p className="text-6xl font-bold mt-3 text-green-600">{stats.published}</p>
            </div>

            <div className="glass-card p-8">
              <p className="text-slate-600 text-sm">پیش‌نویس</p>
              <p className="text-6xl font-bold mt-3 text-amber-600">{stats.drafts}</p>
            </div>
          </div>

          {/* آخرین نوشته */}
          {stats.lastPost && (
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4">آخرین نوشته</h3>
              <div className="flex items-start gap-6">
                {stats.lastPost.image_url && (
                  <img 
                    src={stats.lastPost.image_url} 
                    alt={stats.lastPost.title}
                    className="w-28 h-28 object-cover rounded-2xl" 
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-2xl font-bold">{stats.lastPost.title}</h4>
                  {stats.lastPost.subtitle && (
                    <p className="text-slate-600 mt-2">{stats.lastPost.subtitle}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                    <span>{new Date(stats.lastPost.published_at).toLocaleDateString('fa-IR')}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {stats.lastPost.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}