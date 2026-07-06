'use client';
import { useRouter } from 'next/navigation';
import PostForm from '../../components/PostForm';

export default function NewPostPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        alert('خطا در ثبت نوشته');
      }
    } catch (error) {
      console.error(error);
      alert('خطا در ارتباط با سرور');
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl font-bold">نوشته جدید</h2>
        <p className="text-slate-600 mt-2">محتوای جدید خود را اینجا بنویسید</p>
      </div>
      
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}