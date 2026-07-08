'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Typewriter from './Typewriter';

const highlights = ['اتوماسیون فرآیندها', 'داشبورد تحلیلی', 'پشتیبانی تخصصی'];

const stats = [
  { value: '۵۰۰+', label: 'سازمان فعال' },
  { value: '۲۴/۷', label: 'پشتیبانی' },
  { value: '۹۸٪', label: 'رضایت مشتری' },
];

const Hero = () => {
  const handleDemo = () => {
    window.open('http://demo.reyhanehsoft.ir', '_blank');
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://png.pngtree.com/background/20250108/original/pngtree-abstract-secure-technology-background-with-lock-and-circuit-image-picture-image_15492692.jpg)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.23)_0%,rgba(255,255,255,0.92)_50%,rgba(255,255,255,0.25)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.16),transparent_30%)]" />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-right"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              راهکار دیجیتال سازمانی
            </div>

            <h1 className="text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block">مدیریت هوشمند،</span>
              <span className="mt-3 pb-3 block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                برای رشد سریع‌تر
              </span>
            </h1>

            <div className="mt-6 min-h-[3.5rem] text-2xl font-semibold text-slate-700 sm:text-3xl">
              <Typewriter
                texts={[
                  'راهکار یکپارچه مدیریت سازمان',
                  'سفارشی‌سازی‌شده برای نیازهای شما',
                  'سریع، دقیق، قابل اعتماد',
                ]}
              />
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              ریحان، تمام فرایندهای سازمانی شما را در یک تجربه روان، شفاف و حرفه‌ای یکپارچه می‌کند.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-primary px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark">
                درخواست مشاوره
              </button>
              <button
                onClick={handleDemo}
                className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-lg font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                مشاهده دمو
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="glass-card rounded-[32px] p-4 sm:p-6"
          >
            <div className="overflow-hidden rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-xl">
              <div className="rounded-[22px] bg-gradient-to-br from-primary/15 via-white to-secondary/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">پلتفرم سازمانی مدرن</p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-800">عملکردی شفاف و سریع</h2>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <Image src="/logo.png" alt="لوگوی ریحان" width={44} height={44} className="rounded-xl" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/70 bg-white/80 p-3 text-center shadow-sm">
                      <p className="text-xl font-bold text-slate-900">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[20px] border border-slate-200/80 bg-slate-900 p-5 text-right text-white shadow-lg">
                  <p className="text-sm text-slate-300">عملکرد لحظه‌ای</p>
                  <p className="mt-2 text-xl font-semibold">یکپارچه، مطمئن و آماده برای رشد</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-slate-500">اسکرول کنید</span>
          <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 