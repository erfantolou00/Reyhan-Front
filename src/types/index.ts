// ======================
// تایپ‌های عمومی پروژه
// ======================

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at?: string;
    icon: string
    color: string
  }
  
  export interface Post {
    id: number;
    title: string;
    subtitle?: string;
    slug: string;
    image_url: string;
    content: string;
    category_id: number;
    category?: Category;
    reading_time?: number;
    published_at: string;
    status: 'draft' | 'published';
    created_at?: string;
    updated_at?: string;
    featured: boolean;
    views: number;
    likes: number;
    comments: number;
    author:string
    author_avatar:string
  }

  export interface BlogData {
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