"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ۱. ایمپورت کردن مستقیم فایل JSON
import modulesData from '@/app/portfolio/module.json';

// ۲. ایمپورت کردن آیکون‌های مورد نیاز
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaCog, 
  FaWarehouse, 
  FaFileContract, 
  FaLightbulb, 
  FaArrowLeft,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserShield,
  FaCheckCircle,
  FaFilePdf
} from "react-icons/fa";
import { FiFile, FiLock, FiSearch, FiLayers } from "react-icons/fi";

// ۳. تعریف ساختار تایپ‌ها (TypeScript) برای امنیت کد
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
  tabs?: {
    id: string;
    label: string;
    color: string;
    tabColor: string;
    tabBadge: string;
    image: string;
    content: {
      title: string;
      subtitle: string;
      goal: string;
      steps: { num: string; title: string; desc: string }[];
      inputs: string[];
      outputs: string[];
      roles: { name: string; duty: string }[];
    };
  }[];
}

// ۴. ایجاد دیکشنری آیکون‌ها برای تبدیل رشته به کامپوننت
const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaCog,
  FaWarehouse,
  FaFileContract,
  FaLightbulb,
  FiFile,
  FiLock,
  FiSearch,
  FiLayers,
};

// تابع کمکی رندر آیکون
const renderIcon = (iconKey: string, className = "w-6 h-6 text-white") => {
  const IconComponent = iconComponents[iconKey];
  if (!IconComponent) return <FaCog className={className} />; // آیکون پیش‌فرض در صورت نبود کلید
  return <IconComponent className={className} />;
};

// ۵. کامپوننت اصلی صفحه جزئیات ماژول
export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // استخراج داده‌های ماژول از فایل JSON بر اساس شناسه مسیر (ID)
  const typedModulesData = modulesData as Record<string, Module>;
  const module = typedModulesData[id];

  // مدیریت استیت تب فعال
  const [activeTabId, setActiveTabId] = useState("mr");

  // بررسی صحت وجود پارامتر و داده ماژول
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

  const currentTab = module.tabs?.find((t) => t.id === activeTabId) || module.tabs?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-32 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <Link href="/portfolio" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium group">
          <FaArrowLeft className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform rotate-180" />
          بازگشت به لیست ماژول‌ها
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ستون راست - اطلاعات ثابت و تب‌های زونکنی */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${module.gradient} text-white`}>
                سازوکار فرآیندها
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {module.title}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                {module.description}
              </p>
            </motion.div>

            {/* کادر تصویر و تب‌های پوشه */}
            <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-gray-200/80">
              <div className="relative h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-inner bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={module.tabs ? currentTab?.id : 'static'}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={module.tabs && currentTab ? currentTab.image : module.mainImage}
                      alt={module.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {module.tabs && (
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {module.tabs.map((tab) => {
                    const isActive = tab.id === activeTabId;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`relative px-3 py-2 text-xs font-bold rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer border
                          ${isActive
                            ? `${tab.color} shadow-md scale-105 -translate-y-1`
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeFolderTab"
                            className="absolute inset-0 bg-inherit rounded-inherit -z-10"
                          />
                        )}
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : tab.tabBadge}`} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ستون چپ - بدنه تفصیلی سند (کارتابل اداری) */}
          <div className="lg:col-span-7 space-y-6">
            {module.tabs ? (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/80 min-h-[500px] relative overflow-hidden">
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
                      {/* هدر سند */}
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2.5 py-1 rounded text-xs font-bold border ${currentTab.tabColor}`}>
                            شناسه فرآیند: {currentTab.id.toUpperCase()}
                          </span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-800">
                          {currentTab.content.title}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">{currentTab.content.subtitle}</p>
                      </div>

                      {/* هدف کلی */}
                      {currentTab.content.goal && (
                        <div className="bg-blue-50/50 border-r-4 border-blue-500 p-4 rounded-l-xl">
                          <h4 className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-1.5">
                            <FaLightbulb className="text-blue-500" /> هدف اصلی فرآیند:
                          </h4>
                          <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                            {currentTab.content.goal}
                          </p>
                        </div>
                      )}

                      {/* گام‌های اجرایی (Timeline) */}
                      {currentTab.content.steps && currentTab.content.steps.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-bold text-gray-800 text-base">مراحل و گام‌های گردش کار</h3>
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

                      {/* ورودی‌ها و خروجی‌ها */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <h4 className="font-bold text-gray-700 text-xs mb-3 flex items-center gap-1.5">
                            <FaSignInAlt className="text-amber-500" /> داده‌های ورودی (Inputs)
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
                            <FaSignOutAlt className="text-emerald-500" /> خروجی‌های فرآیند (Outputs)
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

                      {/* نقش‌ها و مسئولیت‌ها */}
                      {currentTab.content.roles && currentTab.content.roles.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                            <FaUserShield className="text-indigo-500" /> ماتریس مسئولیت‌ها (RACI)
                          </h3>
                          <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-right text-xs">
                              <thead className="bg-gray-50 text-gray-700 uppercase">
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
              // سایر حالت‌های عادی
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">توضیحات کامل</h2>
                  <p className="text-gray-600 leading-relaxed">{module.longDescription}</p>
                </div>
              </div>
            )}

            {/* بخش ویژگی‌های کلیدی در صورتی که ماژول زونکنی نباشد */}
            {!module.tabs && module.features && module.features.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">ویژگی‌های کلیدی ماژول</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {module.features.map((feature, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${module.gradient}`}>
                        {renderIcon(feature.iconKey, "w-5 h-5 text-white")}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* بخش مزایای ثابت */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">مزایای ساختاری سیستم</h2>
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

            {/* باکس اکشن‌ها (درخواست دمو + دانلود فایل پی‌دی‌اف مستندات) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                  درخواست دمو و مشاوره رایگان
                </Link>
              </motion.div>

              {module.pdfUrl && (
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <a
                    href={module.pdfUrl}
                    download
                    className="inline-flex items-center justify-center w-full px-6 py-4 text-base font-bold rounded-2xl text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md text-center gap-2"
                  >
                    <FaFilePdf className="text-red-500 text-lg" />
                    دانلود مستندات فنی (PDF)
                  </a>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
