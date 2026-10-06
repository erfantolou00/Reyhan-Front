'use client';

import Link from 'next/link';
import SoftGlow from '@/components/home/SoftGlow';

const outcomes = [
  {
    title: 'بهینه‌سازی فرآیندها',
    description: 'کاهش ۶۰ درصدی زمان انجام فرآیندهای سازمانی',
  },
  {
    title: 'تصمیم‌گیری هوشمند',
    description: 'دسترسی به تحلیل‌های پیشرفته در لحظه',
  },
  {
    title: 'مدیریت یکپارچه',
    description: 'ادغام تمام بخش‌های سازمان در یک پلتفرم',
  },
];

const features = [
  {
    title: 'هوش مصنوعی پیشرفته',
    description: 'استفاده از الگوریتم‌های هوشمند برای پیش‌بینی و بهینه‌سازی',
  },
  {
    title: 'گزارش‌گیری لحظه‌ای',
    description: 'داشبوردهای مدیریتی با قابلیت شخصی‌سازی',
  },
  {
    title: 'امنیت پیشرفته',
    description: 'محافظت از داده‌ها با استانداردهای جهانی',
  },
  {
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم متخصص در تمام ساعات شبانه‌روز',
  },
];

const cardClass =
  'rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0c1a2c]';

export default function TransformationSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <SoftGlow tone="blue" className="top-12 left-[8%]" delay="-3s" />
      <SoftGlow className="left-[46%] top-full -mt-48" delay="-11s" />
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-primary/30 bg-white px-3 py-1 text-sm font-semibold text-primary dark:border-primary/40 dark:bg-primary/10">
            تحول دیجیتال
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
            تحول دیجیتال با ریحان
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            با ریحان، سازمان خود را به عصر دیجیتال وارد کنید و از مزایای مدیریت هوشمند بهره‌مند شوید.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {outcomes.map((item) => (
            <article key={item.title} className={cardClass}>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href="/blog"
              className={`${cardClass} block hover:border-primary/40`}
            >
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
