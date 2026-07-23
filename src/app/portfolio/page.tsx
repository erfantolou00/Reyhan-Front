"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCog, FaChartLine, FaLightbulb, FaCheckCircle, FaUsers, FaFileContract, FaMoneyBillWave, FaWarehouse, FaTruckMoving } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiFile } from "react-icons/fi";

interface ModuleFeature {
  id: number;
  title: string;
  description: string;
  benefits: string[];
  screenshot: string;
  icon: React.ReactNode;
  gradient: string;
}

const modules: ModuleFeature[] = [
  {
    id: 1,
    title: "سامانه منابع انسانی",
    description: "سیستم جامع مدیریت منابع انسانی با قابلیت‌های پیشرفته مدیریت پرسنل، حقوق و دستمزد، و مدیریت عملکرد",
    benefits: [
      "مدیریت خودکار محاسبات حقوق و دستمزد",
      "سیستم حضور و غیاب هوشمند",
      "مدیریت مرخصی‌ها و شیفت‌ها",
      "گزارش‌گیری پیشرفته از عملکرد پرسنل"
    ],
    screenshot: "/images/portfolio/5.jpg",
    icon: <FaUsers className="w-8 h-8" />,
    gradient: "from-purple-400 to-indigo-400"
  },
  {
    id: 2,
    title: "سامانه مالی",
    description: "سیستم جامع مدیریت مالی با قابلیت‌های پیشرفته حسابداری، خزانه‌داری و مدیریت بودجه",
    benefits: [
      "مدیریت خودکار عملیات مالی",
      "گزارش‌گیری لحظه‌ای از وضعیت مالی",
      "مدیریت بودجه و کنترل هزینه‌ها",
      "سیستم خزانه‌داری هوشمند"
    ],
    screenshot: "/images/portfolio/6.webp",
    icon: <FaMoneyBillWave className="w-8 h-8" />,
    gradient: "from-purple-500 to-indigo-400"
  },
  {
    id: 3,
    title: "سامانه قرارداد",
    description: "سیستم مدیریت قراردادها با قابلیت‌های پیشرفته ثبت، پیگیری و مدیریت چرخه حیات قراردادها",
    benefits: [
      "مدیریت هوشمند چرخه حیات قراردادها",
      "هشدارهای خودکار برای تمدید و انقضا",
      "گزارش‌گیری پیشرفته از وضعیت قراردادها",
      "مدیریت اسناد و پیوست‌های قرارداد"
    ],
    screenshot: "/images/portfolio/7.jpg",
    icon: <FaFileContract className="w-8 h-8" />,
    gradient: "from-sky-800 to-blue-300"
  },
  {
    id: 4,
    title: "سامانه انبار",
    description: "سیستم مدیریت انبار با قابلیت‌های پیشرفته کنترل موجودی، مدیریت کالا و عملیات انبارداری",
    benefits: [
      "مدیریت هوشمند موجودی کالا",
      "سیستم بارکدینگ و کدگذاری کالا",
      "گزارش‌گیری پیشرفته از موجودی‌ها",
      "مدیریت خودکار عملیات انبارداری"
    ],
    screenshot: "/images/portfolio/4.jpg",
    icon: <FaWarehouse className="w-8 h-8" />,
    gradient: "from-slate-700 to-amber-500"
  },
  {
    id: 5,
    title: "سامانه فایل و مدیریت اسناد",
    description: "سیستم یکپارچه آرشیو دیجیتال، ذخیره‌سازی امن و مدیریت دسترسی فایل‌ها و مکاتبات سازمانی",
    benefits: [
      "آرشیو دیجیتال و دسته‌بندی هوشمند اسناد",
      "سیستم پیشرفته سطوح دسترسی کاربران",
      "جستجوی سریع و فیلترینگ پیشرفته فایل‌ها",
      "نسخه‌گذاری (Versioning) و تاریخچه ویرایش اسناد"
    ],
    screenshot: "/images/portfolio/8.webp",
    icon: <FiFile className="w-8 h-8" />,
    gradient: "from-blue-400 to-yellow-400"
  },
  {
    id: 6,
    title: "سامانه زنجیره تامین",
    description: "سیستم مدیریت و آرشیو دیجیتال اسناد، مکاتبات و فایل‌های سازمانی با قابلیت‌های امنیتی پیشرفته",
    benefits: [
      "کاهش 60% زمان جستجو و بازیابی اسناد",
      "افزایش 45% امنیت اطلاعات و اسناد حساس",
      "کاهش 30% فضای فیزیکی مورد نیاز برای بایگانی",
      "بهبود 55% در سرعت گردش و اشتراک‌گذاری اسناد"
    ],
    screenshot: "/images/portfolio/9.jpg",
    icon: <FaTruckMoving className="w-8 h-8" />,
    gradient: "from-orange-200 to-amber-400/60"
  },

];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-gray-100 py-32 px-4 sm:px-6 lg:px-8 bg-" dir="rtl">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              {/* افکت هاور رنگی پس‌زمینه */}
              <div 
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: `linear-gradient(to left, ${module.gradient})` }} 
              />
              
              {/* بخش تصویر با ارتفاع دقیق ثابت */}
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
              
              {/* بدنه کارت - استفاده از flex-grow برای یکدستی کامل */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* عنوان و آیکون سامانه */}
                <div className="flex items-center mb-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient} text-white transform group-hover:rotate-6 transition-transform duration-300 shadow-md shrink-0`}>
                    {module.icon}
                  </div>
                  {/* تغییر mr-4 به ms-4 برای ایجاد فاصله استاندارد در راست‌چین */}
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 ms-4">
                    {module.title}
                  </h2>
                </div>
  
                {/* توضیحات با تعداد خطوط کنترل شده */}
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                  {module.description}
                </p>
  
                {/* قابلیت‌های کلیدی */}
                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-gray-900 flex items-center text-sm">
                    {/* تغییر mr-2 به me-2 برای آیکون */}
                    <FaLightbulb className="text-yellow-400 me-2 shrink-0" />
                    قابلیت‌های کلیدی
                  </h3>
                  <ul className="space-y-3">
                    {module.benefits.map((benefit, bIndex) => (
                      <motion.li
                        key={bIndex}
                        initial={{ opacity: 0, x: 15 }} // در RTL حرکت انیمیشن را از راست به چپ می‌کنیم
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: bIndex * 0.05 }}
                        className="flex items-start group/item"
                      >
                        {/* تغییر mr-2 به me-2 برای آیکون چک‌باکس */}
                        <FaCheckCircle className="text-green-500 mt-1 me-2 flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors duration-200 text-sm leading-relaxed">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
  
                {/* کانتینر دکمه - با mt-auto همیشه به کف کارت می‌چسبد */}
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
          ))}
        </div>
      </div>
    </div>
  );
  
}
