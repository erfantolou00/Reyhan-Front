'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

type StatItem = {
  label: string;
  value: string;
};

type CardItem = {
  id: number;
  eyebrow: string;
  title: string;
  footerLabel: string;
  footerTitle: string;
  stats: StatItem[];
  theme: {
    from: string;
    to: string;
    badgeBg: string;
  };
};

const cards: CardItem[] = [
  {
    id: 1,
    eyebrow: 'پلتفرم سازمانی مدرن',
    title: 'عملکردی شفاف و سریع',
    footerLabel: 'عملکرد لحظه‌ای',
    footerTitle: 'یکپارچه، مطمئن و آماده برای رشد',
    theme: { from: 'from-blue-500/15', to: 'to-indigo-500/10', badgeBg: 'bg-blue-50' },
    stats: [
      { label: 'کاربران فعال', value: '12.4K' },
      { label: 'درخواست موفق', value: '98.7%' },
      { label: 'زمان پاسخ', value: '0.8s' },
    ],
  },
  {
    id: 2,
    eyebrow: 'زیرساخت داده هوشمند',
    title: 'تصمیم‌گیری دقیق‌تر در لحظه',
    footerLabel: 'تحلیل داده',
    footerTitle: 'بینش سریع برای تیم‌های در حال توسعه',
    theme: { from: 'from-emerald-500/15', to: 'to-teal-500/10', badgeBg: 'bg-emerald-50' },
    stats: [
      { label: 'گزارش روزانه', value: '1.2K' },
      { label: 'دقت تحلیل', value: '96.3%' },
      { label: 'به‌روزرسانی', value: 'لحظه‌ای' },
    ],
  },
  {
    id: 3,
    eyebrow: 'اتوماسیون عملیاتی',
    title: 'مدیریت روان و بدون اصطکاک',
    footerLabel: 'فرآیندها',
    footerTitle: 'کاهش خطا و افزایش سرعت اجرا',
    theme: { from: 'from-amber-500/15', to: 'to-orange-500/10', badgeBg: 'bg-amber-50' },
    stats: [
      { label: 'تسک تکمیل‌شده', value: '8.9K' },
      { label: 'کاهش خطا', value: '43%' },
      { label: 'بهره‌وری', value: '+28%' },
    ],
  },
  {
    id: 4,
    eyebrow: 'رشد‌پذیری سازمانی',
    title: 'آماده برای مقیاس‌های بزرگ‌تر',
    footerLabel: 'مقیاس‌پذیری',
    footerTitle: 'پایدار، سریع و مناسب توسعه بلندمدت',
    theme: { from: 'from-rose-500/15', to: 'to-purple-500/10', badgeBg: 'bg-rose-50' },
    stats: [
      { label: 'تیم‌های فعال', value: '320+' },
      { label: 'آپ‌تایم', value: '99.9%' },
      { label: 'رشد ماهانه', value: '18%' },
    ],
  },
];

// موقعیت‌های ثابت کارت‌های پشت در حالت سکون
const stackStyles = [
  { x: -420, y: -50, rotate: -8, scale: 0.88, opacity: 0.65, zIndex: 10 },
  { x: 20, y: 12, rotate: 6, scale: 0.82, opacity: 0.50, zIndex: 5 },
  { x: -30, y: 85, rotate: 9, scale: 0.76, opacity: 0.40, zIndex: 1 },
];

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 22 });
  const springY = useSpring(y, { stiffness: 150, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-12deg', '12deg']);
  const sheenX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const sheenY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, rotateX, rotateY, sheenX, sheenY, handleMouseMove, handleMouseLeave };
}

export default function CinematicCardStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const activeCard = cards[activeIndex];

  // محاسبه ۳ کارت پشتی بر اساس کارت فعال فعلی
  const backCards = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 3; i++) {
      list.push({
        card: cards[(activeIndex + i) % cards.length],
        style: stackStyles[i - 1],
      });
    }
    return list;
  }, [activeIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 900); // همگام با زمان انیمیشن Shuffle
  };

  // ریست و شروع مجدد تایمر خودکار ۲۰ ثانیه‌ای
  useEffect(() => {
    timerRef.current = window.setInterval(handleNext, 20000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [activeIndex, isAnimating]);

  const {
    ref: tiltRef,
    rotateX,
    rotateY,
    sheenX,
    sheenY,
    handleMouseMove,
    handleMouseLeave,
  } = useTilt();

  return (
    <div className="relative mx-auto flex min-h-[640px] w-full max-w-5xl items-center justify-center px-4 py-16 [perspective:2000px] select-none">

      {/* دکمه‌های کنترل دستی کوچک و شیک در پایین یا کنار */}
      <div className="absolute bottom-4 z-30 flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (isAnimating || idx === activeIndex) return;
              setIsAnimating(true);
              setActiveIndex(idx);
              setTimeout(() => setIsAnimating(false), 900);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-slate-800' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
          />
        ))}
      </div>

      <div className="relative h-[480px] w-full max-w-[620px]">
        {/* ۱. کارت‌های استک پشتی */}
        {backCards.map(({ card, style }, index) => (
          <motion.div
            key={`back-${card.id}`}
            style={{
              zIndex: style.zIndex,
              transformStyle: 'preserve-3d',
            }}
            initial={false}
            animate={{
              x: style.x,
              y: style.y,
              scale: style.scale,
              rotate: style.rotate,
              opacity: style.opacity,
            }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 18,
            }}
            className="absolute left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 pointer-events-none origin-center"
          >
            <div
              className={`
               rounded-[28px]
               border border-white/20
               bg-white/45
               backdrop-blur-2xl
               shadow-[0_30px_80px_rgba(0,0,0,.18)]
              `} 
            >
              <div
                className={`rounded-[24px] bg-gradient-to-br ${card.theme.from} ${card.theme.to} p-6`}
              >
                <p className="text-xs text-slate-500">
                  {card.eyebrow}
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {card.title}
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-3">

                  {card.stats.map(stat => (
                    <div
                      key={stat.label}
                      className="
                    rounded-xl
                    bg-white/70
                    p-3
                    backdrop-blur-md
                    "
                    >
                      <div className="font-bold">
                        {stat.value}
                      </div>

                      <div className="text-[11px] opacity-70">
                        {stat.label}
                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>
          </motion.div>
        ))}

        {/* ۲. کارت اصلی فعال با قابلیت حرکت انیمیشنی پیشرفته خروج و ورود (Shuffle & Flip) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`active-${activeCard.id}`}
            // انیمیشن خروج سه‌بعدی (پرت شدن به راست، چرخیدن دور محور Y و رفتن به عمق بک‌گراند)
            exit={{
              x: [0, 260, -90],
              y: [0, -40, 16],
              scale: [1, 0.9, 0.88],
              rotate: [0, 18, -8],
              opacity: [1, 0.8, 0.6],
              zIndex: [30, 30, 10],
              transition: {
                duration: 0.85,
                times: [0, 0.45, 1],
                ease: "easeInOut"
              }
            }}
            style={{
              zIndex: 30,
              transformStyle: 'preserve-3d',
            }}
            className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          >
            {/* افکت ورود سه‌بعدی (Flip نود درجه از عمق و بزرگ شدن) */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
                rotateY: 90,
                z: -150
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                z: 0
              }}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 17,
                mass: 1.1
              }}
            >
              {/* کامپوننت داخلی کارت با سیستم Tilt ماوس */}
              <motion.div
                ref={tiltRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="glass-card relative rounded-[32px] p-5 sm:p-6 shadow-2xl transition-shadow duration-300 border border-white/60 bg-white/40 backdrop-blur-xl"
              >
                {/* افکت براق بودن شیشه (Glare) */}
                <motion.div
                  style={{
                    background: `radial-gradient(circle 240px at ${sheenX} ${sheenY}, rgba(255,255,255,0.22), transparent)`,
                    transform: 'translateZ(2px)',
                  }}
                  className="pointer-events-none absolute inset-0 z-10 rounded-[32px]"
                />

                <div className="overflow-hidden rounded-[24px] shadow-lg">
                  <div
                    style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
                    className={`rounded-[22px] bg-gradient-to-br ${activeCard.theme.from} via-white to-secondary/10 p-6`}
                  >
                    <div
                      style={{ transform: 'translateZ(40px)' }}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-500/90">{activeCard.eyebrow}</p>
                        <h2 className="mt-1.5 text-2xl font-bold text-slate-800 tracking-tight">{activeCard.title}</h2>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        className="rounded-2xl bg-white p-3 shadow-md border border-slate-100"
                      >
                        <Image
                          src="/logo.webp"
                          alt="لوگوی ریحان"
                          width={44}
                          height={44}
                          className="rounded-xl"
                        />
                      </motion.div>
                    </div>

                    {/* بخش Stats با انیمیشن ورود پله‌ای روان */}
                    <div
                      style={{ transform: 'translateZ(30px)' }}
                      className="mt-6 grid gap-3.5 grid-cols-3"
                    >
                      {activeCard.stats.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + index * 0.08, type: 'spring', stiffness: 130 }}
                          whileHover={{ scale: 1.04, y: -2, translateZ: 10 }}
                          className="rounded-2xl border border-white/80 bg-white/90 p-3.5 text-center shadow-sm"
                        >
                          <p className="text-xl font-extrabold text-slate-900">{item.value}</p>
                          <p className="mt-1 text-xs text-slate-500 font-medium">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* بنر تیره پایینی */}
                    <motion.div
                      style={{ transform: 'translateZ(45px)' }}
                      whileHover={{ scale: 1.015, y: -1 }}
                      className="mt-6 rounded-[20px] border border-slate-700/30 bg-slate-900 p-5 text-right text-white shadow-xl"
                    >
                      <p className="text-xs text-slate-400 font-medium">{activeCard.footerLabel}</p>
                      <p className="mt-2 text-lg font-bold leading-relaxed">{activeCard.footerTitle}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
