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
    views?: number;
    likes?: number;
    comments?: number;
    author?:string
    author_avatar?:string
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


  export interface FooterData {
    brand: {
      logo: string;
      name: string;
      tagline: string;
      badge: string;
      description: string;
    };
    socialMedia: Array<{
      name: string;
      href: string;
      icon: string;
      color: string;
    }>;
    quickLinks: Array<{
      label: string;
      href: string;
    }>;
    contactInfo: {
      address: { label: string; value: string; icon: string };
      phone: { value: string; description: string; icon: string };
      email: { value: string; description: string; icon: string };
      workingHours: { label: string; value: string; description: string; icon: string };
    };
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
      successMessage: string;
      errorMessage: string;
    };
    footer: {
      copyright: string;
      badge: { icon: string; text: string };
      links: Array<{ label: string; href: string }>;
    };
  }


  // ======================
// تایپ‌های دیتای صفحه تماس
// ======================
export interface ContactData {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  contactInfo: {
    address: { label: string; value: string | string[]; icon: string };
    phone: { label: string; value: string; icon: string };
    email: { label: string; value: string; icon: string };
    workingHours: { label: string; value: string | string[]; icon: string };
  };
  socialMedia: Array<{
    name: string;
    url: string;
    icon: string;
    color: string;
  }>;
  mapImage: string;
  form: {
    title: string;
    description: string;
    submitButton: string;
    loadingButton: string;
    successMessage: string;
    errorMessage: string;
    fields: {
      full_name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      subject: { label: string; placeholder: string; options: Array<{ value: string; label: string }> };
      message: { label: string; placeholder: string };
    };
  };
}

export interface FormData {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}