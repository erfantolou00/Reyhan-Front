import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  { label: 'درباره ما', href: '/about' },
  { label: 'خدمات', href: '/products' },
  { label: 'بلاگ', href: '/blog' },
  { label: 'نمونه‌کارها', href: '/portfolio' },
  { label: 'تماس با ما ', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-4">
            <Image src={"/logo2.webp"} alt='logo2' width={320} height={320} className='' priority />
          <div>
            <h3 className="text-2xl font-black text-white">ریحان</h3>
            <p className="mt-4 max-w-md text-base leading-8 text-slate-400">
              یک تجربه مدرن و حرفه‌ای برای مدیریت سازمانی، طراحی‌شده با دقت برای رشد و بهره‌وری.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">دسترسی سریع</h4>
            <ul className="mt-4 space-y-3 text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white">تماس با ما</h4>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-400">
              <li>پارک علم و فناوری دانشگاه سمنان</li>
              <li>۰۲۳-۳۳۶۰۵۰۰۰</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ریحان. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
} 