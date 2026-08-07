import "server-only";
import { readFile } from "node:fs/promises";
import { unstable_cache } from "next/cache";

export type BlogPost = {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  image_url?: string;
  published_at: string;
  reading_time?: number;
  categories?: {
    name: string;
  };
};

// تابع داخلی برای خواندن مستقیم فایل از دیسک
const readBlogPostsFromFile = async (): Promise<BlogPost[]> => {
  // توصیه شدید: استفاده از مسیر UNC به جای :W
  const filePath = String.raw`W:\blog.json`; 
  
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content) as BlogPost[];
  } catch (error) {
    console.error("خطا در خواندن فایل بلاگ از شبکه:", error);
    // بازگرداندن آرایه خالی در صورت خطا برای جلوگیری از کرش کل وب‌سایت
    return []; 
  }
};

// کش کردن داده‌ها به مدت ۳۶۰۰ ثانیه (۱ ساعت)
export const getBlogPosts = unstable_cache(
  async () => readBlogPostsFromFile(),
  ["blog-posts-cache-key"],
  {
    revalidate: 3600, // هر یک ساعت کش نامعتبر شده و فایل دوباره خوانده می‌شود
    tags: ["posts"]
  }
);
