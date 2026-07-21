import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

export const revalidate = 3600; // هر ساعت بروزرسانی شود

async function getBlogPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`, {
    next: { revalidate: 3600 },
    cache: 'force-cache'
  });

  if (!res.ok) {
    throw new Error('خطا در دریافت مقالات');
  }

  return res.json();
}

export default async function BlogPage() {
  let posts = [];

  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-white py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">بلاگ</h1>
          <p className="text-xl text-gray-600">آخرین مقالات و تجربیات ما</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group h-full">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image_url || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {post.categories?.name && (
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-4 py-1 rounded-full text-xs font-medium">
                      {post.categories.name}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                    {post.subtitle}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-primary" />
                      <span>{new Date(post.published_at).toLocaleDateString('fa-IR')}</span>
                    </div>
                    {post.reading_time && (
                      <div className="flex items-center gap-1">
                        <FaClock className="text-primary" />
                        <span>{post.reading_time} دقیقه</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}