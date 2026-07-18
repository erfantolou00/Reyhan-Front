import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaShareAlt } from 'react-icons/fa';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

type Props = { params: { id: string } };

async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('خطا در دریافت مقاله');
  }

  return res.json();
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.id);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-primary mb-8 hover:underline">
          <FaArrowLeft className="ml-2" /> بازگشت به بلاگ
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-[350px] md:h-[450px]">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  {new Date(post.published_at).toLocaleDateString('fa-IR')}
                </div>
              </div>

              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border hover:bg-gray-50 transition"
              >
              </button>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-10">{post.title}</h1>

            <div className="prose prose-lg max-w-none prose-p:leading-8 text-gray-700">
              <p className="whitespace-pre-line">{post.content}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}