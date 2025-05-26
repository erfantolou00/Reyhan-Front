"use client";


import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import GridPattern from "@/components/GridPattern";
import VerticalTimeline from "@/components/VerticalTimeline";
import ModernCard from "@/components/ModernCard";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import Image from "next/image";

export default function Home() {
  const sections = [
    { id: "hero", label: "صفحه اصلی" },
    { id: "features", label: "ویژگی‌های کلیدی" },
    { id: "modules", label: "ماژول‌های نرم‌افزار" },
    { id: "advantages", label: "چرا ریحان را انتخاب کنید؟" },
  ];

  const [openVideoModal, setOpenVideoModal] = useState<boolean>(false);

  return (
    <>
    
      <VerticalTimeline sections={sections} />
      <main className="overflow-hidden">
        <GridPattern />
        <AnimatedSection direction="up">
          <section
            id="hero"
            className="relative bg-gradient-to-b from-primary/40 to-white pt-32 pb-10 overflow-hidden"
          >
        <VideoModal 
          openVideoModal={openVideoModal} 
          onClose={() => setOpenVideoModal(false)} 
        />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-3xl mx-auto text-center">
                <AnimatedCard className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  ریحان، یک رایحه تازه در مدیریت سازمانی
                </AnimatedCard>
                <AnimatedCard
                  delay={0.2}
                  className="text-xl text-gray-700 mb-12 leading-relaxed"
                >
                  نرم‌افزار ERP پیشرفته با قابلیت‌های کامل برای مدیریت هوشمند
                  کسب و کار شما
                </AnimatedCard>
                <AnimatedCard delay={0.4} className="flex gap-6 justify-center">
                  <Link
                    href="/contact"
                    className="btn btn-primary transform hover:scale-105 w-48 transition-all duration-300 hover:shadow-xl hover:bg-primary/90"
                  >
                    درخواست دمو
                  </Link>
                  <Link
                    href="/products"
                    className="btn btn-secondary transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:bg-secondary/90"
                  >
                    مشاهده محیط برنامه
                  </Link>
                </AnimatedCard>
                <AnimatedCard
                  delay={0.4}
                  className="flex gap-6 justify-center mt-10"
                >
                  <button
                    onClick={() => setOpenVideoModal(true)}
                    className="p-8 bg-gradient-to-tr from-primary-light to-secondary-light rounded-full hover:scale-105 transition-all duration-300 hover:bg-gradient-to-bl"
                  >
                    <FaPlay className="text-white text-xl" />
                  </button>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="left">
          <section
            id="features"
            className="py-32 relative bg-gradient-to-b from-white to-primary-light/30"
          >
            <div className="container mx-auto px-4">
              <AnimatedCard className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                ویژگی‌های کلیدی
              </AnimatedCard>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                {[
                  {
                    title: "سفارشی‌سازی ۱۰۰٪",
                    description:
                      "تطبیق کامل با نیازهای منحصر به فرد سازمان شما",
                    icon: "🎯",
                    gradient: "primary",
                  },
                  {
                    title: "رابط کاربری مدرن",
                    description:
                      "طراحی زیبا و کاربرپسند برای تجربه کاربری بهتر",
                    icon: "✨",
                    gradient: "mixed",
                  },
                  {
                    title: "عملکرد بالا",
                    description:
                      "سرعت و کارایی برتر در اجرای عملیات‌های سازمانی",
                    icon: "⚡",
                    gradient: "secondary",
                  },
                ].map((feature, index) => (
                  <ModernCard
                    key={index}
                    delay={0.2 + index * 0.1}
                    className="transform-gpu hover:scale-105 transition-all duration-500"
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    gradient={
                      feature.gradient as "primary" | "secondary" | "mixed"
                    }
                  >
                    <div className="h-full" />
                  </ModernCard>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="right">
          <section
            id="modules"
            className="py-32 bg-gradient-to-b from-primary-light/30 to-white relative overflow-hidden"
          >
            <GridPattern />
            <div className="container mx-auto px-4 relative">
              <AnimatedCard className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                ماژول‌های نرم‌افزار
              </AnimatedCard>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    title: "مدیریت زمان", 
                    icon: "⏰",
                    image: "/images/modules/1.png",
                    description: "مدیریت هوشمند زمان و برنامه‌ریزی کارکنان",
                    gradient: "from-blue-500/20 to-blue-600/20"
                  },
                  { 
                    title: "مدیریت مرخصی", 
                    icon: "📅",
                    image: "/images/modules/leave.png",
                    description: "سیستم جامع مدیریت درخواست‌های مرخصی",
                    gradient: "from-green-500/20 to-green-600/20"
                  },
                  { 
                    title: "مدیریت ماموریت", 
                    icon: "✈️",
                    image: "/images/modules/mission.png",
                    description: "پیگیری و مدیریت سفرهای کاری",
                    gradient: "from-purple-500/20 to-purple-600/20"
                  },
                  { 
                    title: "مدیریت مالی", 
                    icon: "💰",
                    image: "/images/modules/financial.png",
                    description: "مدیریت هوشمند امور مالی سازمان",
                    gradient: "from-yellow-500/20 to-yellow-600/20"
                  },
                  { 
                    title: "مدیریت انبار", 
                    icon: "📦",
                    image: "/images/modules/warehouse.png",
                    description: "کنترل و مدیریت موجودی انبار",
                    gradient: "from-red-500/20 to-red-600/20"
                  },
                  { 
                    title: "مدیریت قراردادها", 
                    icon: "📄",
                    image: "/images/modules/contract.png",
                    description: "مدیریت هوشمند قراردادها و اسناد",
                    gradient: "from-indigo-500/20 to-indigo-600/20"
                  },
                ].map((module, index) => (
                  <AnimatedCard
                    key={index}
                    delay={0.2 + index * 0.1}
                    className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                          {module.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-primary/90">
                          {module.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-6 flex-grow">
                        {module.description}
                      </p>
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <Image 
                          src={module.image} 
                          alt={module.title}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <button className="w-full py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                        <span>مشاهده جزئیات</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <section id="advantages" className="py-32 bg-gradient-to-b from-white to-primary-light/20 relative overflow-hidden">
            <GridPattern />
            <div className="container mx-auto px-4 relative">
              <AnimatedCard className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                چرا ریحان را انتخاب کنید؟
              </AnimatedCard>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "هوش مصنوعی پیشرفته",
                    description: "با استفاده از الگوریتم‌های هوش مصنوعی، پیش‌بینی دقیق نیازهای سازمان و بهینه‌سازی فرآیندها",
                    stats: "40% افزایش بهره‌وری",
                    icon: "🤖",
                    gradient: "from-primary/20 to-primary/40"
                  },
                  {
                    title: "یکپارچگی کامل",
                    description: "ارتباط بی‌نقص بین تمام ماژول‌ها و امکان مدیریت متمرکز تمام فرآیندهای سازمانی",
                    stats: "100% یکپارچگی",
                    icon: "🔄",
                    gradient: "from-secondary/20 to-secondary/40"
                  },
                  {
                    title: "امنیت فوق‌العاده",
                    description: "سیستم امنیتی چندلایه با رمزنگاری پیشرفته و پشتیبان‌گیری خودکار از داده های سیستم",
                    stats: "99.99% امنیت",
                    icon: "🔒",
                    gradient: "from-green-500/20 to-green-600/40"
                  },
                  {
                    title: "پشتیبانی ۲۴/۷",
                    description: "تیم پشتیبانی حرفه‌ای و متخصص در تمام ساعات شبانه‌روز برای پاسخگویی به نیازهای شما",
                    stats: "۲۴/۷ پشتیبانی",
                    icon: "💬",
                    gradient: "from-purple-500/20 to-purple-600/40"
                  }
                ].map((advantage, index) => (
                  <AnimatedCard
                    key={index}
                    delay={0.2 + index * 0.1}
                    className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative p-8 flex flex-col h-full">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                          {advantage.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-primary/90 mb-2">
                            {advantage.title}
                          </h3>
                          <div className="text-lg font-semibold text-secondary/80 mb-4">
                            {advantage.stats}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-lg h-20 leading-relaxed">
                        {advantage.description}
                      </p>
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link href="/blog" className="flex items-center gap-2 text-primary/80 cursor-pointer">
                          <span className="text-sm font-medium ">اطلاعات بیشتر</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>

              <div className="mt-16 text-center">
                <AnimatedCard delay={0.4}>
                  <div className="inline-block p-4 bg-primary/10 rounded-full">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">✨</span>
                      <span className="text-lg font-medium text-primary/90">بیش از ۵۰۰ سازمان موفق از ریحان استفاده می‌کنند</span>
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </section>
        </AnimatedSection>

        
      </main>
    </>
  );
}
