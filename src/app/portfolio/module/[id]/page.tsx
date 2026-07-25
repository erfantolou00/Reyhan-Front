"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ۱. ایمپورت فایل JSON
import modulesData from '@/app/portfolio/module.json';

import { 
  FaArrowLeft,
  FaArrowRight,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserShield,
  FaCheckCircle,
  FaFilePdf,
  FaLightbulb,
  FaTimes,
  FaSearchPlus
} from "react-icons/fa";

// ۲. تعریف استایل‌های ثابت برای تب‌ها جهت اطمینان از خروجی گرفتن درست Tailwind در پروداکشن
const tabStylesMap: Record<string, { active: string; inactive: string; badge: string; badgeLabel: string }> = {
  overview: {
    active: "bg-slate-700 text-white border-slate-700 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300",
    badge: "bg-white",
    badgeLabel: "bg-slate-100 text-slate-800 border-slate-200"
  },
  mr: {
    active: "bg-rose-600 text-white border-rose-600 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-300",
    badge: "bg-white",
    badgeLabel: "bg-rose-50 text-rose-800 border-rose-200"
  },
  pr: {
    active: "bg-amber-500 text-white border-amber-500 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300",
    badge: "bg-white",
    badgeLabel: "bg-amber-50 text-amber-800 border-amber-200"
  },
  rfq: {
    active: "bg-sky-500 text-white border-sky-500 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-300",
    badge: "bg-white",
    badgeLabel: "bg-sky-50 text-sky-800 border-sky-200"
  },
  quo: {
    active: "bg-violet-600 text-white border-violet-600 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-violet-50 hover:text-violet-800 hover:border-violet-300",
    badge: "bg-white",
    badgeLabel: "bg-violet-50 text-violet-800 border-violet-200"
  },
  pro: {
    active: "bg-teal-600 text-white border-teal-600 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300",
    badge: "bg-white",
    badgeLabel: "bg-teal-50 text-teal-800 border-teal-200"
  },
  po: {
    active: "bg-emerald-500 text-white border-emerald-500 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300",
    badge: "bg-white",
    badgeLabel: "bg-emerald-50 text-emerald-800 border-emerald-200"
  },
  qc: {
    active: "bg-cyan-600 text-white border-cyan-600 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-cyan-50 hover:text-cyan-800 hover:border-cyan-300",
    badge: "bg-white",
    badgeLabel: "bg-cyan-50 text-cyan-800 border-cyan-200"
  },
  proc: {
    active: "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105 -translate-y-0.5",
    inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50 hover:text-indigo-800 hover:border-indigo-300",
    badge: "bg-white",
    badgeLabel: "bg-indigo-50 text-indigo-800 border-indigo-200"
  }
};

// فال‌بک (پشتیبان پیش‌فرض در صورت عدم تطابق شناسه)
const defaultTabStyle = {
  active: "bg-blue-600 text-white border-blue-600 shadow-md scale-105 -translate-y-0.5",
  inactive: "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100",
  badge: "bg-white",
  badgeLabel: "bg-blue-50 text-blue-800 border-blue-200"
};

interface TabContent {
  title: string;
  subtitle: string;
  goal: string;
  steps: { num: string; title: string; desc: string }[];
  inputs: string[];
  outputs: string[];
  roles: { name: string; duty: string }[];
}

interface Tab {
  id: string;
  label: string;
  pdfUrl?: string;
  images?: string[];
  image?: string;
  content: TabContent;
}

interface Feature {
  title: string;
  description: string;
  iconKey: string;
  image: string;
}

interface Module {
  title: string;
  mainImage: string;
  description: string;
  longDescription: string;
  features: Feature[];
  benefits: string[];
  screenshot: string;
  gradient: string;
  pdfUrl?: string;
  tabs?: Tab[];
}

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const typedModulesData = modulesData as Record<string, Module>;
  const module = typedModulesData[id];

  const defaultTab = module?.tabs?.find((t) => t.id === "overview")?.id || module?.tabs?.[0]?.id || "mr";
  const [activeTabId, setActiveTabId] = useState(defaultTab);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentTab = module?.tabs?.find((t) => t.id === activeTabId) || module?.tabs?.[0];

  const getCarouselImages = (): string[] => {
    if (module?.tabs && currentTab) {
      if (currentTab.images && currentTab.images.length > 0) {
        return currentTab.images;
      }
      if (currentTab.image) {
        return [currentTab.image];
      }
    }
    return [module?.mainImage || "/images/placeholder.png"];
  };

  const images = getCarouselImages();

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [activeTabId]);

  // بستن لایت‌باکس با فشردن دکمه Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const activePdfUrl = currentTab?.pdfUrl || module?.pdfUrl;

  if (!id || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900">ماژول مورد نظر یافت نشد</h1>
          <Link href="/portfolio" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
            بازگشت به لیست ماژول‌ها
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-32 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <Link href="/portfolio" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium group text-sm">
          <FaArrowLeft className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform rotate-180" />
          بازگشت به لیست ماژول‌ها
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ستون راست - کاروسل تصاویر */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{module.title}</h1>
              <p className="text-base text-gray-600 leading-relaxed">{module.description}</p>
            </motion.div>

            <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-gray-200/80">
              {/* قاب نمایش تصویر با افکت بک‌گراند بلور شده برای فیت شدن تصاویر در ابعاد مختلف */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative h-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-inner bg-gray-950 group/image cursor-zoom-in"
              >
                {/* تصویر پس‌زمینه بلور شده جهت پر کردن کناره‌های خالی عکس‌های نامتقارن */}
                <div className="absolute inset-0 opacity-30 blur-xl scale-110 select-none pointer-events-none">
                  <Image
                    src={images[currentImgIndex]}
                    alt="Background blur"
                    fill
                    className="object-cover"
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTabId}-${currentImgIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center p-2"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={images[currentImgIndex]}
                        alt={`${module.title} - تصویر ${currentImgIndex + 1}`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* هاور افکت دکمه زوم */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-black/60 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-sm">
                    <FaSearchPlus /> بزرگ‌نمایی تصویر
                  </span>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors z-10 cursor-pointer"
                    >
                      <FaArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors z-10 cursor-pointer"
                    >
                      <FaArrowLeft className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/35 px-3 py-1 rounded-full backdrop-blur-sm">
                      {images.map((_, idx) => (
                        <span
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImgIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* دکمه‌های ناوبری تب‌ها با استفاده از نگاشت کلاس استاتیک */}
              {module.tabs && (
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {module.tabs.map((tab, idx) => {
                    const isActive = tab.id === activeTabId;
                    const style = tabStylesMap[tab.id] || defaultTabStyle;
                    const activeColorClass = isActive ? style.active : style.inactive;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`relative px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${activeColorClass}`}
                      >
                        {isActive && (
                          <motion.span layoutId="activeFolderTab" className="absolute inset-0 bg-inherit rounded-inherit -z-10" />
                        )}
                        <span className={`w-4 h-4 text-center rounded-full text-[10px] flex items-center justify-center ${isActive ? 'bg-white text-gray-800' : 'bg-gray-400 text-white'}`} >
                          {idx === 0 ? "★" : idx}
                        </span>
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ستون چپ - مستندات و جزئیات تب */}
          <div className="lg:col-span-7 space-y-6">
            {module.tabs ? (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/80 min-h-[480px] relative overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 w-2.5 bg-gradient-to-b from-gray-200 to-gray-300 rounded-r-3xl" />
                
                <AnimatePresence mode="wait">
                  {currentTab && (
                    <motion.div
                      key={currentTab.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8 pr-4"
                    >
                      <div className="border-b border-gray-100 pb-4 flex justify-between items-start gap-4">
                        <div>
                          <span className={`px-2.5 py-1 rounded text-xs font-bold border ${(tabStylesMap[currentTab.id] || defaultTabStyle).badgeLabel}`}>
                            شناسه فرآیند: {currentTab.id.toUpperCase()}
                          </span>
                          <h2 className="text-2xl font-extrabold text-gray-800 mt-2">{currentTab.content.title}</h2>
                          <p className="text-gray-500 text-sm mt-1">{currentTab.content.subtitle}</p>
                        </div>
                        
                        {currentTab.pdfUrl && (
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={currentTab.pdfUrl}
                            download
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                          >
                            <FaFilePdf className="text-sm" />
                            PDF فرآیند
                          </motion.a>
                        )}
                      </div>

                      {currentTab.content.goal && (
                        <div className="bg-blue-50/50 border-r-4 border-blue-500 p-4 rounded-l-xl">
                          <h4 className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-1.5">
                            <FaLightbulb className="text-blue-500" /> هدف اصلی فرآیند:
                          </h4>
                          <p className="text-gray-700 text-xs md:text-sm leading-relaxed">{currentTab.content.goal}</p>
                        </div>
                      )}

                      {currentTab.content.steps && currentTab.content.steps.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-800 text-base">مراحل اجرایی</h3>
                          <div className="relative border-r border-gray-200 pr-6 mr-3 space-y-6">
                            {currentTab.content.steps.map((step, index) => (
                              <div key={index} className="relative">
                                <span className="absolute -right-[35px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold ring-4 ring-white">
                                  {step.num}
                                </span>
                                <h4 className="font-bold text-gray-800 text-sm">{step.title}</h4>
                                <p className="text-gray-600 text-xs mt-1 leading-relaxed">{step.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <h4 className="font-bold text-gray-700 text-xs mb-3 flex items-center gap-1.5">
                            <FaSignInAlt className="text-amber-500" /> داده‌های ورودی
                          </h4>
                          <ul className="space-y-2">
                            {currentTab.content.inputs.map((inp, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                {inp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <h4 className="font-bold text-gray-700 text-xs mb-3 flex items-center gap-1.5">
                            <FaSignOutAlt className="text-emerald-500" /> خروجی‌ها
                          </h4>
                          <ul className="space-y-2">
                            {currentTab.content.outputs.map((out, idx) => (
                              <li key={idx} className="text-xs text-gray-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {out}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {currentTab.content.roles && currentTab.content.roles.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                            <FaUserShield className="text-indigo-500" /> نقش‌های درگیر در فرآیند
                          </h3>
                          <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-right text-xs">
                              <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                  <th className="px-4 py-2 font-bold">سمت / نقش</th>
                                  <th className="px-4 py-2 font-bold">وظیفه و حیطه مسئولیت</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {currentTab.content.roles.map((role, idx) => (
                                  <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-2.5 font-bold text-gray-800">{role.name}</td>
                                    <td className="px-4 py-2.5 text-gray-600 leading-relaxed">{role.duty}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <p className="text-gray-600 leading-relaxed">{module.longDescription}</p>
              </div>
            )}

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">مزایای پیاده‌سازی سیستم</h2>
              <ul className="space-y-3">
                {module.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center text-gray-700 text-sm"
                  >
                    <FaCheckCircle className="text-emerald-500 ml-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md text-center"
              >
                درخواست دمو و مشاوره
              </Link>

              {activePdfUrl && (
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={activePdfUrl}
                  download
                  className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold rounded-2xl text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm text-center gap-2"
                >
                  <FaFilePdf className="text-red-500 text-lg" />
                  دانلود مستند فرآیند جاری (PDF)
                </motion.a>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* بخش مدال لایت‌باکس با انیمیشن‌های ورود و خروج نرم */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 cursor-pointer"
            >
              <FaTimes className="text-xl" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10 cursor-pointer"
                >
                  <FaArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10 cursor-pointer"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
            >
              <Image
                src={images[currentImgIndex]}
                alt={`${module.title} - نمای بزرگ`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full">
              تصویر {currentImgIndex + 1} از {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
