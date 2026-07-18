'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_35%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              امکانات اصلی
            </span>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              به‌جای پیچیدگی، تجربه‌ای روان و مدرن
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              ماژول‌های ریحان طوری طراحی شده‌اند که کار با سیستم برای مدیران و کارکنان ساده، سریع و مطمئن باشد.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <div key={feature.title} className="rounded-[24px] border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-lg text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.3)]"
>
  <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-slate-200">
    <Image
      src="/homeGif.webp"
      alt="نمایش ماژول‌های ریحان"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />

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
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase; 