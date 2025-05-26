import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">صفحه مورد نظر یافت نشد</h2>
        <p className="text-gray-600 mb-8">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <IoArrowBack />
          بازگشت به صفحه قبل
        </button>
      </div>
    </div>
  );
} 