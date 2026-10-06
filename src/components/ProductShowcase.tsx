'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SoftGlow from '@/components/home/SoftGlow';

const features = [
  {
    title: 'کنترل مرکزی و یکپارچه',
    description: 'همه ماژول‌ها در یک محیط منظم و قابل‌فهم برای تصمیم‌گیری سریع و بدون سردرگمی.',
  },
  {
    title: 'دید روشن و تحلیلی',
    description: 'داده‌ها به زبان ساده، برای تحلیل دقیق، گزارش‌گیری حرفه‌ای و مدیریت لحظه‌ای.',
  },
  {
    title: 'اتوماسیون هوشمند',
    description: 'فرآیندهای تکراری را حذف کنید و زمان تیم را برای رشد و بهبود صرف کنید.',
  },
];

const highlights = ['پشتیبانی حرفه‌ای', 'رابط کاربری مدرن', 'سفارشی‌سازی کامل'];

const ProductShowcase = () => {
  const [shouldLoadGif, setShouldLoadGif] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShouldLoadGif(true);
      window.removeEventListener('scroll', handleScroll);
    };

    // فقط بعد از لود کامل صفحه و شروع اسکرول
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-20 sm:py-24">
      <SoftGlow className="top-16 left-[42%]" delay="-7s" />
      <SoftGlow tone="blue" className="left-[78%] top-full -mt-48" delay="-14s" />
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="text-right">
            <span className="inline-flex rounded-full border border-primary/30 bg-white px-3 py-1 text-sm font-semibold text-primary dark:border-primary/40 dark:bg-primary/10">
              امکانات اصلی
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
              به‌جای پیچیدگی، تجربه‌ای روان و مدرن
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              ماژول‌های ریحان طوری طراحی شده‌اند که کار با سیستم برای مدیران و کارکنان ساده، سریع و مطمئن باشد.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0c1a2c]"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-lg text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#0c1a2c]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
              {shouldLoadGif ? (
                <Image
                  src="/homeGif.webp"
                  alt="نمایش ماژول‌های ریحان"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                // placeholder تا زمانی که اسکرول شروع نشده
                <div className="absolute inset-0 animate-pulse bg-slate-200" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="rounded-[20px] border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-slate-200">نمایش زنده</p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    تجربه‌ای شفاف برای مدیران و کارکنان
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {highlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-slate-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;