"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCog, FaChartLine, FaLightbulb, FaCheckCircle, FaUsers, FaFileContract, FaMoneyBillWave, FaWarehouse } from "react-icons/fa";
import { motion } from "framer-motion";

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
    title: "ماژول منابع انسانی",
    description: "سیستم جامع مدیریت منابع انسانی با قابلیت‌های پیشرفته مدیریت پرسنل، حقوق و دستمزد، و مدیریت عملکرد",
    benefits: [
      "مدیریت خودکار محاسبات حقوق و دستمزد",
      "سیستم حضور و غیاب هوشمند",
      "مدیریت مرخصی‌ها و شیفت‌ها",
      "گزارش‌گیری پیشرفته از عملکرد پرسنل"
    ],
    screenshot: "/images/portfolio/1.png",
    icon: <FaUsers className="w-8 h-8" />,
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "ماژول مالی",
    description: "سیستم جامع مدیریت مالی با قابلیت‌های پیشرفته حسابداری، خزانه‌داری و مدیریت بودجه",
    benefits: [
      "مدیریت خودکار عملیات مالی",
      "گزارش‌گیری لحظه‌ای از وضعیت مالی",
      "مدیریت بودجه و کنترل هزینه‌ها",
      "سیستم خزانه‌داری هوشمند"
    ],
    screenshot: "/images/portfolio/2.png",
    icon: <FaMoneyBillWave className="w-8 h-8" />,
    gradient: "from-green-500 to-emerald-400"
  },
  {
    id: 3,
    title: "ماژول قرارداد",
    description: "سیستم مدیریت قراردادها با قابلیت‌های پیشرفته ثبت، پیگیری و مدیریت چرخه حیات قراردادها",
    benefits: [
      "مدیریت هوشمند چرخه حیات قراردادها",
      "هشدارهای خودکار برای تمدید و انقضا",
      "گزارش‌گیری پیشرفته از وضعیت قراردادها",
      "مدیریت اسناد و پیوست‌های قرارداد"
    ],
    screenshot: "/images/portfolio/3.png",
    icon: <FaFileContract className="w-8 h-8" />,
    gradient: "from-purple-500 to-indigo-400"
  },
  {
    id: 4,
    title: "ماژول انبار",
    description: "سیستم مدیریت انبار با قابلیت‌های پیشرفته کنترل موجودی، مدیریت کالا و عملیات انبارداری",
    benefits: [
      "مدیریت هوشمند موجودی کالا",
      "سیستم بارکدینگ و کدگذاری کالا",
      "گزارش‌گیری پیشرفته از موجودی‌ها",
      "مدیریت خودکار عملیات انبارداری"
    ],
    screenshot: "/images/portfolio/4.png",
    icon: <FaWarehouse className="w-8 h-8" />,
    gradient: "from-orange-500 to-amber-400"
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-gray-100 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
            ماژول‌های سیستم ریحان
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            سیستم یکپارچه مدیریتی با ماژول‌های تخصصی برای مدیریت هوشمند کسب و کار
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                   style={{ backgroundImage: `linear-gradient(to right, ${module.gradient})` }} />
              
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={module.screenshot}
                  alt={module.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`mr-4 p-3 rounded-xl bg-gradient-to-r ${module.gradient} text-white transform group-hover:rotate-12 transition-transform duration-300`}>
                    {module.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {module.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {module.description}
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <FaLightbulb className="text-yellow-400 mr-2" />
                    قابلیت‌های کلیدی
                  </h3>
                  <ul className="space-y-3">
                    {module.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start group/item"
                      >
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-200" />
                        <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors duration-200">
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/portfolio/module/${module.id}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
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
