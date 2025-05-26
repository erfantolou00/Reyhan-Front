import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ریحان</h3>
            <p className="text-gray-400">
              یک رایحه تازه در مدیریت سازمانی
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white">
                  خدمات
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  محصولات
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">تماس با ما</h4>
            <ul className="space-y-2 text-gray-400">
              <li>تهران، خیابان فرشته</li>
              <li>کنار رستوران ریواس</li>
              <li>تلفن: ۰۲۱-XXXXXXXX</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">خبرنامه</h4>
            <p className="text-gray-400 mb-4">
              برای اطلاع از آخرین اخبار و محصولات ما عضو خبرنامه شوید
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white flex-1"
              />
              <button className="btn btn-primary">عضویت</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ریحان. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
} 