"use client";

import Image from 'next/image';
import Typewriter from './Typewriter';
import HeroCardStack from './InteractiveCard';
import { useRef } from 'react';
import Link from 'next/link';
import AdminLogin from '@/app/admin/login/page';

const highlights = ['اتوماسیون فرآیندها', 'داشبورد تحلیلی', 'پشتیبانی تخصصی'];

const stats = [
  { value: '۵+', label: 'سازمان فعال' },
  { value: '۲۴/۷', label: 'پشتیبانی' },
  { value: '۹۸٪', label: 'رضایت مشتری' },
];

const Hero = () => {
  // استفاده از useRef برای کش کردن بین رندرها
  const gatewayUrlRef = useRef<string | null>(null);
  const urlPromiseRef = useRef<Promise<string | null> | null>(null);

  const getLoginGatewayUrl = async (): Promise<string | null> => {
    const endpoints = [
      "http://server:9020/geturl",
      "http://v1:9020/geturl",
      "http://reyhansmart.ir:5020/geturl",
    ];

    try {
      const firstResponse = await Promise.any(
        endpoints.map(async (endpoint) => {
          const res = await fetch(endpoint);

          if (!res.ok) {
            throw new Error(`Request failed: ${endpoint}`);
          }

          return res.json();
        })
      );

      return firstResponse.demoURL ?? null;
    } catch (error) {
      console.error("No endpoint responded successfully", error);
      return null;
    }
  };

  const getGatewayUrl = async (): Promise<string | null> => {
    // اگر قبلاً گرفته شده، مستقیم برگردون
    if (gatewayUrlRef.current) {
      return gatewayUrlRef.current;
    }

    // اگر در حال گرفتنه، همون Promise رو برگردون (جلوگیری از درخواست تکراری)
    if (!urlPromiseRef.current) {
      urlPromiseRef.current = getLoginGatewayUrl().then((url) => {
        gatewayUrlRef.current = url;
        return url;
      });
    }

    return urlPromiseRef.current;
  };

  const handleDemo = async () => {
    const url = await getGatewayUrl();

    if (url) {
      window.open(url, '_blank');
    } else {
      console.error("دمو در دسترس نیست");
      // می‌تونی اینجا toast یا alert بذاری
    }
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bgHeroHappy.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover opacity-70"
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.18)_50%,rgba(0,0,0,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.52),transparent_40%)]" />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Left Content */}
          <div className="max-w-3xl text-right">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              راهکار دیجیتال سازمانی
            </div>

            <h1 className="text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block">مدیریت هوشمند،</span>
              <span className="mt-3 pb-3 block bg-gradient-to-r from-primary to-slate-900 bg-clip-text text-transparent">
                برای رشد سریع‌تر
              </span>
            </h1>

            <div className="mt-6 min-h-[3.5rem] text-2xl font-semibold text-slate-800 sm:text-3xl">
              <Typewriter
                texts={[
                  'راهکار یکپارچه مدیریت سازمان',
                  'سفارشی‌سازی‌شده برای نیازهای شما',
                  'سریع، دقیق، قابل اعتماد',
                ]}
              />
            </div>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-800 sm:text-xl">
              ریحان، تمام فرایندهای سازمانی شما را در یک تجربه روان، شفاف و حرفه‌ای یکپارچه می‌کند.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-primary px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark">
                <Link href={"/contact"}>
                
                درخواست مشاوره
                </Link>
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
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <HeroCardStack />
        </div>
      </div>
    </section>
  );
};

export default Hero;