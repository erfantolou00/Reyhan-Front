"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUsers, FaMoneyBillWave, FaFileContract, FaWarehouse, FaCheckCircle, FaChartLine, FaCog, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

const moduleDetails = {
  1: {
    title: "ماژول منابع انسانی",
    mainImage: '/images/modules/main/1.jpg',
    description: "سیستم جامع مدیریت منابع انسانی با قابلیت‌های پیشرفته مدیریت پرسنل، حقوق و دستمزد، و مدیریت عملکرد",
    longDescription: "ماژول منابع انسانی ریحان یک راه‌حل جامع برای مدیریت تمامی جنبه‌های منابع انسانی سازمان شماست. این ماژول با استفاده از هوش مصنوعی و اتوماسیون، فرآیندهای HR را بهینه‌سازی می‌کند و به شما کمک می‌کند تا نیروی انسانی خود را به بهترین شکل مدیریت کنید.",
    features: [
      {
        title: "مدیریت پرسنل",
        description: "ثبت و مدیریت اطلاعات کامل پرسنل، سوابق کاری، مدارک و مهارت‌ها",
        icon: <FaUsers className="w-6 h-6" />,
        image: "/images/portfolio/hr/1.png"
      },
      {
        title: "مدیریت حقوق و دستمزد",
        description: "محاسبه خودکار حقوق، کسورات، اضافه کاری و مزایا با قابلیت شخصی‌سازی",
        icon: <FaMoneyBillWave className="w-6 h-6" />,
        image: "/images/portfolio/hr/2.png"
      },
      {
        title: "حضور و غیاب",
        description: "سیستم هوشمند ثبت تردد با پشتیبانی از دستگاه‌های مختلف",
        icon: <FaChartLine className="w-6 h-6" />,
        image: "/images/portfolio/hr/3.png"
      },
      {
        title: "مدیریت مرخصی",
        description: "ثبت و پیگیری مرخصی‌ها، شیفت‌ها و درخواست‌های پرسنل",
        icon: <FaCog className="w-6 h-6" />,
        image: "/images/portfolio/hr/4.png"
      }
    ],
    benefits: [
      "کاهش 60% زمان پردازش اطلاعات پرسنلی",
      "کاهش 40% خطاهای محاسباتی حقوق و دستمزد",
      "بهبود 50% در مدیریت زمان و منابع انسانی",
      "گزارش‌گیری پیشرفته و آنی از وضعیت پرسنل"
    ],
    screenshot: "/images/portfolio/1.png",
    gradient: "from-blue-500 to-cyan-400"
  },
  2: {
    title: "ماژول مالی",
    mainImage: '/images/modules/main/2.jpg',

    description: "سیستم جامع مدیریت مالی با قابلیت‌های پیشرفته حسابداری، خزانه‌داری و مدیریت بودجه",
    longDescription: "ماژول مالی ریحان یک راه‌حل یکپارچه برای مدیریت تمامی جنبه‌های مالی سازمان شماست. این ماژول با استفاده از تکنولوژی‌های پیشرفته، فرآیندهای مالی را بهینه‌سازی می‌کند و به شما کمک می‌کند تا منابع مالی خود را به بهترین شکل مدیریت کنید.",
    features: [
      {
        title: "حسابداری جامع",
        description: "مدیریت حساب‌ها، اسناد مالی، دفاتر قانونی و گزارش‌های مالی",
        icon: <FaMoneyBillWave className="w-6 h-6" />,
        image: "/images/portfolio/finance/1.png"
      },
      {
        title: "خزانه‌داری",
        description: "مدیریت نقدینگی، چک‌ها، بانک‌ها و عملیات خزانه",
        icon: <FaWarehouse className="w-6 h-6" />,
        image: "/images/portfolio/finance/2.png"
      },
      {
        title: "بودجه‌ریزی",
        description: "طراحی و پیگیری بودجه، کنترل هزینه‌ها و تحلیل انحرافات",
        icon: <FaChartLine className="w-6 h-6" />,
        image: "/images/portfolio/finance/3.png"
      },
      {
        title: "گزارش‌گیری",
        description: "گزارش‌های مالی پیشرفته، داشبوردهای مدیریتی و تحلیل‌های مالی",
        icon: <FaCog className="w-6 h-6" />,
        image: "/images/portfolio/finance/4.png"
      }
    ],
    benefits: [
      "کاهش 45% زمان پردازش عملیات مالی",
      "کاهش 35% خطاهای محاسباتی",
      "بهبود 55% در مدیریت نقدینگی",
      "گزارش‌گیری لحظه‌ای از وضعیت مالی"
    ],
    screenshot: "/images/portfolio/finance-module.png",
    gradient: "from-green-500 to-emerald-400"
  },
  3: {
    title: "ماژول قرارداد",
    mainImage: '/images/modules/main/4.webp',

    description: "سیستم مدیریت قراردادها با قابلیت‌های پیشرفته ثبت، پیگیری و مدیریت چرخه حیات قراردادها",
    longDescription: "ماژول قرارداد ریحان یک راه‌حل جامع برای مدیریت چرخه حیات قراردادهای سازمان شماست. این ماژول با استفاده از هوش مصنوعی و اتوماسیون، فرآیندهای مدیریت قرارداد را بهینه‌سازی می‌کند و به شما کمک می‌کند تا ریسک‌های قراردادی را به حداقل برسانید.",
    features: [
      {
        title: "مدیریت چرخه حیات",
        description: "ثبت، پیگیری و مدیریت تمام مراحل چرخه حیات قراردادها",
        icon: <FaFileContract className="w-6 h-6" />,
        image: "/images/portfolio/contract/lifecycle.png"
      },
      {
        title: "هشدارهای هوشمند",
        description: "سیستم هشدار خودکار برای تمدید، انقضا و تعهدات قراردادی",
        icon: <FaLightbulb className="w-6 h-6" />,
        image: "/images/portfolio/contract/alerts.png"
      },
      {
        title: "مدیریت اسناد",
        description: "ذخیره‌سازی و مدیریت اسناد و پیوست‌های قرارداد",
        icon: <FaCog className="w-6 h-6" />,
        image: "/images/portfolio/contract/documents.png"
      },
      {
        title: "گزارش‌گیری",
        description: "گزارش‌های پیشرفته از وضعیت و عملکرد قراردادها",
        icon: <FaChartLine className="w-6 h-6" />,
        image: "/images/portfolio/contract/reporting.png"
      }
    ],
    benefits: [
      "کاهش 50% زمان مدیریت قراردادها",
      "کاهش 40% ریسک‌های قراردادی",
      "بهبود 45% در پیگیری تعهدات",
      "گزارش‌گیری پیشرفته از وضعیت قراردادها"
    ],
    screenshot: "/images/portfolio/contract-module.png",
    gradient: "from-purple-500 to-indigo-400"
  },
  4: {
    title: "ماژول انبار",
    mainImage: '/images/modules/main/3.jpg',

    description: "سیستم مدیریت انبار با قابلیت‌های پیشرفته کنترل موجودی، مدیریت کالا و عملیات انبارداری",
    longDescription: "ماژول انبار ریحان یک راه‌حل جامع برای مدیریت تمامی جنبه‌های انبارداری سازمان شماست. این ماژول با استفاده از تکنولوژی‌های پیشرفته، فرآیندهای انبارداری را بهینه‌سازی می‌کند و به شما کمک می‌کند تا موجودی‌های خود را به بهترین شکل مدیریت کنید.",
    features: [
      {
        title: "مدیریت موجودی",
        description: "کنترل دقیق موجودی کالا، حداقل و حداکثر موجودی و نقطه سفارش",
        icon: <FaWarehouse className="w-6 h-6" />,
        image: "/images/modules/warehouse/1.png"
      },
      {
        title: "بارکدینگ",
        description: "سیستم بارکدینگ و کدگذاری کالا برای مدیریت سریع و دقیق",
        icon: <FaCog className="w-6 h-6" />,
        image: "/images/modules/warehouse/2.png"
      },
      {
        title: "عملیات انبار",
        description: "مدیریت ورود و خروج کالا، جابجایی و شمارش موجودی",
        icon: <FaChartLine className="w-6 h-6" />,
        image: "/images/modules/warehouse/3.png"
      },
      {
        title: "گزارش‌گیری",
        description: "گزارش‌های پیشرفته از موجودی‌ها و عملیات انبار",
        icon: <FaChartLine className="w-6 h-6" />,
        image: "/images/modules/warehouse/4.png"
      }
    ],
    benefits: [
      "کاهش 40% هزینه‌های انبارداری",
      "کاهش 35% خطاهای موجودی",
      "بهبود 50% در سرعت عملیات انبار",
      "گزارش‌گیری پیشرفته از موجودی‌ها"
    ],
    screenshot: "/images/portfolio/warehouse-module.png",
    gradient: "from-orange-500 to-amber-400"
  }
};

export default function ModuleDetail() {
  const params = useParams();
  if (!params?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">ماژول مورد نظر یافت نشد</h1>
          <Link href="/portfolio" className="mt-4 text-blue-600 hover:text-blue-800">
            بازگشت به لیست ماژول‌ها
          </Link>
        </div>
      </div>
    );
  }
  const moduleId = Number(params.id);
  const module = moduleDetails[moduleId as keyof typeof moduleDetails];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-gray-100 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/portfolio" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          بازگشت به لیست ماژول‌ها
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Right Column - Fixed */}
          <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-12rem)]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
                {module.title}{' '}<span className="text-primary-light">ریحان</span>
              </h1>
              <p className="text-xl text-gray-600">
                {module.description}
              </p>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={module.mainImage}
                  alt={module.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Left Column - Scrollable */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">توضیحات کامل</h2>
              <p className="text-gray-600 leading-relaxed">
                {module.longDescription}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">قابلیت‌های اصلی</h2>
              <div className="grid grid-cols-1 gap-12">
                {module.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col gap-8">
                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-md">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 100vw"
                          priority={index === 0}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient} text-white ml-4`}>
                            {feature.icon}
                          </div>
                          <h3 className="font-bold text-gray-900 text-2xl">{feature.title}</h3>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مزایای استفاده</h2>
              <ul className="space-y-3">
                {module.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <FaCheckCircle className="text-green-500 ml-2" />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="pt-6"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                درخواست دمو و مشاوره رایگان
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 