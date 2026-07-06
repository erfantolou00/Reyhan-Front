'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/app/admin/components/PostForm';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/blog/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    const res = await fetch(`/api/blog/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/posts');
    } else {
      alert('خطا در بروزرسانی');
    }
  };

  if (loading) return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (!post) return <div className="text-center py-20 text-red-500">نوشته پیدا نشد</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">ویرایش نوشته</h2>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}