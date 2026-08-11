'use client';

import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import heroData from './hero.json';

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

interface CinematicCardStackProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

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

export default function CinematicCardStack({ 
  className = "", 
  autoPlay = true,
  interval = 10000 
}: CinematicCardStackProps) {
  const cards: CardItem[] = heroData.cards.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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
  }, [activeIndex, cards]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsAnimating(false), 900);
  };

  const handleGoTo = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 900);
  };

  // ریست و شروع مجدد تایمر خودکار
  useEffect(() => {
    if (autoPlay && !isPaused) {
      timerRef.current = window.setInterval(handleNext, interval);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [activeIndex, isAnimating, autoPlay, isPaused, interval]);

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
    <div className={`relative mx-auto flex min-h-[640px] w-full max-w-5xl items-center justify-center px-4 py-16 [perspective:2000px] select-none ${className}`}>
      
      {/* دکمه‌های ناوبری */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handlePrev}
        className="absolute left-2 z-50 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/50 hover:bg-white transition-all hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleNext}
        className="absolute right-2 z-50 hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/50 hover:bg-white transition-all hover:scale-105"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </motion.button>

      {/* کنترل‌های پایین */}
      <div className="absolute bottom-4 z-30 flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-lg backdrop-blur-md">
        {/* دکمه Play/Pause */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          title={isPaused ? "ادامه پخش خودکار" : "توقف پخش خودکار"}
        >
          {isPaused ? (
            <Play className="w-4 h-4 text-slate-600" />
          ) : (
            <Pause className="w-4 h-4 text-slate-600" />
          )}
        </button>

        <div className="w-px h-6 bg-slate-200" />

        {/* Dot Indicators */}
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleGoTo(idx)}
            className={`relative h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex 
                ? 'w-8 bg-gradient-to-r from-primary to-secondary' 
                : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          >
            {idx === activeIndex && (
              <motion.span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </button>
        ))}

        <div className="w-px h-6 bg-slate-200" />

        {/* شمارنده */}
        <span className="text-xs font-medium text-slate-500 min-w-[40px] text-center">
          {activeIndex + 1}/{cards.length}
        </span>
      </div>

      <div className="relative h-[480px] w-full max-w-[620px]">
        {/* کارت‌های استک پشتی */}
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
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-500">
                    {card.eyebrow}
                  </p>
                </div>

                <h3 className="text-xl font-bold">
                  {card.title}
                </h3>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {card.stats.map(stat => (
                    <div
                      key={stat.label}
                      className="rounded-xl bg-white/70 p-3 backdrop-blur-md"
                    >
                      <div className="font-bold text-slate-800">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* کارت اصلی فعال */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`active-${activeCard.id}`}
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
                {/* افکت براق بودن شیشه */}
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
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <p className="text-xs font-semibold text-slate-500/90">{activeCard.eyebrow}</p>
                        </div>
                        <h2 className="mt-1.5 text-2xl font-bold text-slate-800 tracking-tight">
                          {activeCard.title}
                        </h2>
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

                    {/* بخش Stats */}
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

                    {/* بنر پایینی */}
                    <motion.div
                      style={{ transform: 'translateZ(45px)' }}
                      whileHover={{ scale: 1.015, y: -1 }}
                      className="mt-6 rounded-[20px] border border-slate-700/30 bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-right text-white shadow-xl"
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