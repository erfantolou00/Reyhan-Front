'use client';
import { useState, useEffect } from 'react';

interface PostFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function PostForm({ initialData, onSubmit }: PostFormProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    slug: initialData?.slug || '',
    image_url: initialData?.image_url || '',
    content: initialData?.content || '',
    category_id: initialData?.category_id || '',
    reading_time: initialData?.reading_time || 5,
    published_at: initialData?.published_at ? initialData.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
    status: initialData?.status || 'published',
  });

  // گرفتن دسته‌بندی‌ها
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-10 max-w-4xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">عنوان اصلی</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary" required />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">زیرعنوان (اختیاری)</label>
          <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسلاگ</label>
          <input type="text" name="slug" value={form.slug} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary">
            <option value="">بدون دسته‌بندی</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">آدرس تصویر</label>
          <input type="text" name="image_url" value={form.image_url} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">زمان مطالعه (دقیقه)</label>
          <input type="number" name="reading_time" value={form.reading_time} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">محتوا</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={16} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary font-light" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">تاریخ انتشار</label>
          <input type="date" name="published_at" value={form.published_at} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">وضعیت</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border border-white/60 focus:border-primary">
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full text-lg py-4">
        {initialData ? 'بروزرسانی نوشته' : 'انتشار نوشته'}
      </button>
    </form>
  );
}