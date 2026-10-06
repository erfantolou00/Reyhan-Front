"use client";

import { FiTrendingUp, FiShield, FiZap, FiBarChart2 } from "react-icons/fi";
import SoftGlow from "@/components/home/SoftGlow";

type Benefit = {
  icon: any;
  title: string;
  description: string;
  color: string;
};

const benefits: Benefit[] = [
  {
    icon: FiTrendingUp,
    title: "سفارشی‌سازی ۱۰۰٪",
    description: "از صفر تا اجرا، بر اساس فرآیندهای واقعی سازمان شما طراحی می‌شود؛ نه نسخه‌ای عمومی و آماده.",
    color: "#F97316",
  },
  {
    icon: FiShield,
    title: "سرعت واقعی در عمل",
    description: "از ورود داده تا گزارش‌گیری، همه چیز با سرعت و دقت بالا در محیطی روان اجرا می‌شود.",
    color: "#2563EB",
  },
  {
    icon: FiZap,
    title: "طراحی مدرن و کاربرمحور",
    description: "رابط کاربری ساده، شفاف و خوش‌ساخت به شما کمک می‌کند بدون سردرگمی کار کنید.",
    color: "#F97316",
  },
  {
    icon: FiBarChart2,
    title: "پشتیبانی تا پیاده‌سازی کامل",
    description: "از مرحله نصب تا آموزش و بهرهبرداری، همراه شما هستیم تا نتیجه‌ای پایدار و حرفه‌ای داشته باشید.",
    color: "#2563EB",
  },
];

const BenefitsSection = () => {
  return (
    <section className="relative py-20 sm:py-24">
      <SoftGlow tone="blue" className="top-8 right-[8%]" delay="-5s" />
      <SoftGlow className="left-[18%] top-full -mt-48" delay="-12s" />
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-primary/30 bg-white px-3 py-1 text-sm font-semibold text-primary dark:border-primary/40 dark:bg-primary/10">
            چرا ریحان؟
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
            ساده‌تر فکر کنید، سریع‌تر تصمیم بگیرید
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            ریحان فقط یک نرم‌افزار نیست؛ یک تجربه منظم و مطمئن برای مدیریت حرفه‌ای سازمان شماست.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0c1a2c]"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${benefit.color}16`, color: benefit.color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
