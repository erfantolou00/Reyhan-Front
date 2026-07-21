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
    published_at: initialData?.published_at 
      ? initialData.published_at.split('T')[0] 
      : new Date().toISOString().split('T')[0],
    status: initialData?.status || 'published',
  });

  // گرفتن دسته‌بندی‌ها
  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  // تولید خودکار اسلاگ از عنوان
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      setForm(prev => ({
        ...prev,
        title: value,
        slug: prev.slug === '' || prev.slug === generateSlug(prev.title) 
          ? generateSlug(value) 
          : prev.slug
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-10 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {initialData ? 'ویرایش نوشته' : 'نوشته جدید'}
        </h2>
        <p className="text-gray-500 mt-2">اطلاعات نوشته را با دقت وارد کنید</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* عنوان اصلی */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-3 text-gray-700">عنوان اصلی</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all text-lg"
            placeholder="عنوان جذاب نوشته..."
            required
          />
        </div>

        {/* زیرعنوان */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-3 text-gray-700">زیرعنوان (اختیاری)</label>
          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
            placeholder="توضیح کوتاهی از محتوای نوشته"
          />
        </div>

        {/* اسلاگ + دسته‌بندی */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">اسلاگ</label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-mono"
            placeholder="slug-post-title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">دسته‌بندی</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* تصویر + زمان مطالعه */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">آدرس تصویر اصلی</label>
          <input
            type="text"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">زمان مطالعه (دقیقه)</label>
          <input
            type="number"
            name="reading_time"
            value={form.reading_time}
            onChange={handleChange}
            min="1"
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* محتوا */}
      <div>
        <label className="block text-sm font-medium mb-3 text-gray-700">محتوای نوشته</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={18}
          className="w-full px-6 py-5 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-light resize-y min-h-[420px]"
          placeholder="محتوای کامل نوشته را اینجا بنویسید..."
          required
        />
        <p className="text-xs text-gray-500 mt-2 text-right">
          {form.content.length} کاراکتر
        </p>
      </div>

      {/* متادیتا */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">تاریخ انتشار</label>
          <input
            type="date"
            name="published_at"
            value={form.published_at}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700">وضعیت انتشار</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-3xl border border-white/60 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
          >
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>
      </div>

      {/* دکمه ارسال */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-5 rounded-3xl text-lg font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-primary/30 mt-6"
      >
        {initialData ? 'بروزرسانی نوشته' : 'انتشار نوشته'}
      </button>
    </form>
  );
}