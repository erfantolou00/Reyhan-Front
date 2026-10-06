'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { getGatewayUrl } from '@/helper/FindOut_WhereWeAre';
import heroData from '@/components/hero/hero.json';
import SoftGlow from '@/components/home/SoftGlow';

function HeroConsole() {
  return (
    <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[#0c1a2c] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="mr-2 text-xs text-slate-500 dark:text-slate-400">reyhan / operations</span>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          فعال
        </span>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">داشبورد یکپارچه سازمان</p>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {heroData.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-slate-50 px-4 py-3 dark:bg-white/[0.04]">
              <dd className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</dd>
              <dt className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <ul className="mt-4 space-y-2">
          {heroData.highlights.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
              <span className="h-1.5 w-8 rounded-full bg-primary/80" />
            </li>
          ))}
        </ul>

        <Link
          href={heroData.buttons.tertiary.href}
          className="mt-5 inline-flex text-sm font-semibold text-primary hover:text-primary-dark"
        >
          {heroData.buttons.tertiary.text}
        </Link>
      </div>
    </aside>
  );
}

const Hero = () => {
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemo = async () => {
    if (demoLoading) return;
    setDemoLoading(true);
    try {
      const url = await getGatewayUrl();
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <section className="relative">
      <SoftGlow className="top-20 left-[6%]" delay="-2s" />
      <SoftGlow tone="blue" className="left-[62%] top-full -mt-48" delay="-8s" />
      <div className="container relative z-20 mx-auto px-4 pb-16 pt-28 sm:px-6 lg:pb-20 lg:pl-8 lg:pr-44 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-lg:flex max-lg:min-h-[calc(100svh-8rem)] max-lg:flex-col max-lg:justify-center max-lg:pb-24">
            <p className="inline-flex w-fit items-center self-start rounded-full border border-primary/30 bg-white px-3 py-1 text-sm font-semibold text-primary dark:border-primary/40 dark:bg-primary/10">
              {heroData.badge.text}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.25] sm:text-5xl lg:text-6xl">
              <span className="block text-slate-950 dark:text-white">{heroData.title.main}</span>
              <span className="mt-2 block text-primary">{heroData.title.highlight}</span>
            </h1>

            <p className="mt-5 text-xl font-semibold text-secondary dark:text-sky-200">
              {heroData.typewriter.texts[0]}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {heroData.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={heroData.buttons.primary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white hover:bg-primary-dark"
              >
                {heroData.buttons.primary.text}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={handleDemo}
                disabled={demoLoading}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/30 bg-white px-6 py-3.5 text-base font-semibold text-secondary hover:bg-secondary hover:text-white disabled:opacity-70 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                {demoLoading ? 'در حال آماده‌سازی دمو' : heroData.buttons.secondary.text}
              </button>
            </div>
          </div>

          <HeroConsole />
        </div>
      </div>
    </section>
  );
};

export default Hero;
