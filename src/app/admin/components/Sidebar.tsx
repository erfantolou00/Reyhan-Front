'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-80 glass border-l border-white/60 h-screen p-8 flex-shrink-0 overflow-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold gradient-text">ادمین </h2>
        <p className="text-slate-500 mt-6">مدیریت محتوا</p>
      </div>

      <nav className="space-y-1">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover-lift ${
            pathname === '/admin' 
              ? 'bg-primary text-white shadow-lg' 
              : 'hover:bg-white/70'
          }`}
        >
          داشبورد
        </Link>

        <Link
          href="/admin/posts"
          className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover-lift ${
            pathname?.startsWith('/admin/posts') 
              ? 'bg-primary text-white shadow-lg' 
              : 'hover:bg-white/70'
          }`}
        >
          نوشته‌های بلاگ
        </Link>

        <Link
          href="/admin/posts/new"
          className="flex items-center gap-3 px-5 py-4 rounded-2xl text-primary hover:bg-white/70 transition-all hover-lift border border-primary/30"
        >
          + نوشته جدید
        </Link>
      </nav>
    </div>
  );
}