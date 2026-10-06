'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi';
import SoftGlow from '@/components/home/SoftGlow';

const CTASection = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,           // اختیاری
          message: `درخواست دمو از شرکت: ${formData.company}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'خطا در ارسال درخواست');

      toast.success('درخواست شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.');

      // پاک کردن فرم
      setFormData({ full_name: '', email: '', phone: '', company: '' });

    } catch (error: any) {
      toast.error(error.message || 'خطا در ارسال درخواست');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 sm:py-24" dir="rtl">
      <SoftGlow className="top-10 right-[10%]" delay="-9s" />
      <SoftGlow tone="blue" className="bottom-6 left-[30%]" delay="-16s" />
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-slate-950 dark:text-white md:text-5xl">
            آماده تحول در <span className="bg-gradient-to-r from-[#F97316] to-[#EA580C] bg-clip-text text-transparent">کسب و کار</span> خود هستید؟
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
            به صدها شرکت موفق بپیوندید که با راهکارهای هوشمند ما، راندمان کاری خود را متحول کرده‌اند.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">

          {/* فرم درخواست دمو */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c1a2c] lg:p-10"
          >
            <div className="relative">
              <h3 className="mb-2 text-2xl font-bold text-slate-950 dark:text-white">درخواست دمو رایگان</h3>
              <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">برای دریافت مشاوره اختصاصی فرم زیر را تکمیل کنید.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="نام و نام خانوادگی"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="نشانی ایمیل"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="شماره همراه"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-right text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="نام شرکت / سازمان"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-[#F97316]/20 transition-all duration-300 disabled:opacity-70"
                >
                  {isLoading ? 'در حال ارسال...' : 'شروع دمو رایگان'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* باکس کارت ویزیت دیجیتال */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c1a2c] lg:p-10"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-bl from-[#2563EB]/5 to-transparent rounded-full -ml-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#F97316]/5 to-transparent rounded-full -mr-16 -mb-16 pointer-events-none" />

            <div className="relative flex flex-col h-full justify-between">
              {/* بخش لوگو و عنوان شرکت */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-2 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Image src="/logo.webp" alt="Logo" width={56} height={56} className="object-contain"  />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">راهکارهای هوشمند ریحان</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">توسعه‌دهنده نرم‌افزارهای یکپارچه سازمانی</p>
                </div>
              </div>

              {/* راه‌های ارتباطی */}
              <div className="space-y-4 flex-grow">
                {/* تلفن تماس */}
                <a
                  href="tel:02333605000"
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-3.5 transition hover:border-slate-100 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FiPhone className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500 mb-0.5">تلفن پشتیبانی و فروش</span>
                    <span className="font-bold tracking-wider text-slate-800 transition-colors group-hover:text-secondary dark:text-slate-100">۰۲۳-۳۳۶۰۵۰۰۰</span>
                  </div>
                </a>

                {/* ایمیل */}
                <a
                  href="mailto:saeed@komeylian.com"
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-3.5 transition hover:border-slate-100 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FiMail className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500 mb-0.5">پست الکترونیکی</span>
                    <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-primary dark:text-slate-200">saeed@komeylian.com</span>
                  </div>
                </a>

                {/* آدرس دفتر */}
                <a
                  href="https://maps.app.goo.gl/V4oJJXW8rTVu2WDv5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-3.5 transition hover:border-slate-100 hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FiMapPin className="w-5 h-5 text-[#F97316]" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500 mb-0.5">نشانی مرکزی</span>
                    <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-primary dark:text-slate-200">پارک علم و فناوری دانشگاه سمنان</span>
                  </div>
                </a>
              </div>

              {/* شبکه‌های اجتماعی */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-white/10">
                <span className="text-xs text-slate-400 dark:text-slate-500">ما را در شبکه‌های اجتماعی دنبال کنید</span>
                <div className="flex gap-3">
                  <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-[#F97316]/5 flex items-center justify-center hover:bg-[#F97316] hover:text-white text-[#F97316] transition-all duration-300">
                    <FiLinkedin className="w-4.5 h-4.5" />
                  </a>
                  <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-[#2563EB]/5 flex items-center justify-center hover:bg-[#2563EB] hover:text-white text-[#2563EB] transition-all duration-300">
                    <FiInstagram className="w-4.5 h-4.5" />
                  </a>
                  <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-[#F97316]/5 flex items-center justify-center hover:bg-[#F97316] hover:text-white text-[#F97316] transition-all duration-300">
                    <FiTwitter className="w-4.5 h-4.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;