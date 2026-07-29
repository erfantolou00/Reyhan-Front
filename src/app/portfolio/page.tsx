"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaCheckCircle, FaUsers, FaFileContract, FaMoneyBillWave, FaWarehouse, FaTruckMoving } from "react-icons/fa";
import { FiFile } from "react-icons/fi";
import { motion } from "framer-motion";

// ایمپورت دیتای کامل
import modulesData from '@/app/portfolio/module.json';

// مپ آیکون‌ها بر اساس id
const iconMap: Record<number, React.ReactNode> = {
  1: <FaUsers className="w-8 h-8" />,
  2: <FaMoneyBillWave className="w-8 h-8" />,
  3: <FaFileContract className="w-8 h-8" />,
  4: <FaWarehouse className="w-8 h-8" />,
  5: <FiFile className="w-8 h-8" />,
  6: <FaTruckMoving className="w-8 h-8" />,
};

// مپ گرادیانت‌ها بر اساس id (اینلاین)
const gradientMap: Record<number, string> = {
  1: "from-purple-400 to-indigo-400",
  2: "from-purple-500 to-indigo-400",
  3: "from-sky-800 to-blue-300",
  4: "from-slate-700 to-amber-500",
  5: "from-blue-400 to-yellow-400",
  6: "from-orange-200 to-amber-400/60",
};

interface Module {
  id: number;
  title: string;
  description: string;
  benefits: string[];
  screenshot: string;
}

export default function Portfolio() {
  const modules = modulesData as Module[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-gray-100 py-32 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* هدر صفحه */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
            سامانه‌های سیستم ریحان
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            سیستم یکپارچه مدیریتی با سامانه‌های تخصصی برای مدیریت هوشمند کسب و کار
          </p>
        </motion.div>
  
        {/* گرید کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {modules.map((module, index) => {
            const gradient = gradientMap[module.id] || "from-blue-500 to-cyan-400";

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                {/* افکت هاور رنگی */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                />
                
                {/* تصویر */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  <Image
                    src={module.screenshot}
                    alt={module.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* بدنه کارت */}
                <div className="p-6 flex flex-col flex-grow">
                  
                  {/* عنوان + آیکون */}
                  <div className="flex items-center mb-5">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white transform group-hover:rotate-6 transition-transform duration-300 shadow-md shrink-0`}>
                      {iconMap[module.id] || <FaLightbulb className="w-8 h-8" />}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 ms-4">
                      {module.title}
                    </h2>
                  </div>
  
                  {/* توضیحات */}
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                    {module.description}
                  </p>
  
                  {/* قابلیت‌های کلیدی */}
                  <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-gray-900 flex items-center text-sm">
                      <FaLightbulb className="text-yellow-400 me-2 shrink-0" />
                      قابلیت‌های کلیدی
                    </h3>
                    <ul className="space-y-3">
                      {module.benefits.slice(0, 4).map((benefit, bIndex) => (
                        <motion.li
                          key={bIndex}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: bIndex * 0.05 }}
                          className="flex items-start group/item"
                        >
                          <FaCheckCircle className="text-green-500 mt-1 me-2 flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors duration-200 text-sm leading-relaxed">
                            {benefit}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
  
                  {/* دکمه */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/portfolio/module/${module.id}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.01] transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      مشاهده جزئیات و درخواست دمو
                    </Link>
                  </div>
  
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}