// ======================
// تایپ‌های عمومی پروژه
// ======================

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at?: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    subtitle?: string;
    slug: string;
    image_url: string;
    content: string;
    category_id?: number;
    category?: Category;
    reading_time?: number;
    published_at: string;
    status: 'draft' | 'published';
    created_at?: string;
    updated_at?: string;
  }
  
  // اگر بعداً کاربر، کامنت و ... اضافه شد اینجا می‌ذاریم
  export interface User {
    id: string;
    email: string;
    full_name?: string;
    role: 'admin' | 'user';
  }
  
  // تایپ‌های فرم
  export type PostFormData = Omit<Post, 'id' | 'created_at' | 'updated_at' | 'category'> & {
    category_id?: number | string;
  };