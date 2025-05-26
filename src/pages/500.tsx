import { useRouter } from 'next/router';
import { IoArrowBack } from 'react-icons/io5';

export default function Custom500() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">خطای سرور</h2>
        <p className="text-gray-600 mb-8">متأسفانه مشکلی در سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.</p>
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