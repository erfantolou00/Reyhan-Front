"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: 'email' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || 'خطا در ورود');
      }

      toast.success('ورود با موفقیت انجام شد');
      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.message || 'خطای غیرمنتظره');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold gradient-text">پنل ادمین</h1>
          <p className="text-slate-600 mt-3">ورود به حساب کاربری</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              ایمیل
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange('email')}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              required
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              رمز عبور
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange('password')}
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              required
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'در حال ورود...' : 'ورود به پنل'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8">
          فقط ادمین‌ها دسترسی دارند
        </p>
      </div>
    </div>
  );
}
