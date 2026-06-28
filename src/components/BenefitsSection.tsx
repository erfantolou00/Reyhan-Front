"use client";

import { motion } from "framer-motion";
import { FiTrendingUp, FiShield, FiZap, FiBarChart2 } from "react-icons/fi";

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
    <section className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_45%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            چرا ریحان؟
          </span>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            ساده‌تر فکر کنید، سریع‌تر تصمیم بگیرید
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            ریحان فقط یک نرم‌افزار نیست؛ یک تجربه منظم و مطمئن برای مدیریت حرفه‌ای سازمان شماست.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur transition"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl p-3 shadow-sm" style={{ backgroundColor: `${benefit.color}16`, color: benefit.color }}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{benefit.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{benefit.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
