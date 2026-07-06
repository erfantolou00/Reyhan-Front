'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Typewriter from './Typewriter';
import Link from 'next/link';
import { useState } from 'react';

const transformationStats = [
  {
    title: 'بهینه‌سازی فرآیندها',
    description: 'کاهش ۶۰ درصدی زمان انجام فرآیندهای سازمانی',
    icon: '⚡',
    color: 'from-blue-100 to-blue-400'
  },
  {
    title: 'تصمیم‌گیری هوشمند',
    description: 'دسترسی به تحلیل‌های پیشرفته در لحظه',
    icon: '📊',
    color: 'from-orange-100 to-orange-400'
  },
  {
    title: 'مدیریت یکپارچه',
    description: 'ادغام تمام بخش‌های سازمان در یک پلتفرم',
    icon: '🔄',
    color: 'from-pink-100 to-pink-400'
  }
];

const features = [
  {
    title: 'هوش مصنوعی پیشرفته',
    description: 'استفاده از الگوریتم‌های هوشمند برای پیش‌بینی و بهینه‌سازی',
    icon: '🤖'
  },
  {
    title: 'گزارش‌گیری لحظه‌ای',
    description: 'داشبوردهای مدیریتی با قابلیت شخصی‌سازی',
    icon: '📈'
  },
  {
    title: 'امنیت پیشرفته',
    description: 'محافظت از داده‌ها با استانداردهای جهانی',
    icon: '🔒'
  },
  {
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم متخصص در تمام ساعات شبانه‌روز',
    icon: '💬'
  }
];


const TransformationSection = () => {
  const [bool ,setbool] = useState(false)
  
  const handleclick = ()=> {
    setbool(true)
  }
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-primary/10 to-white">
      {bool && (
        <video 
        src="/33.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="h-full w-full object-cover absolute z-50"
      />
      
      )}
      <div className="absolute  bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            تحول دیجیتال با <span className="text-primary-light">ریحان</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed italic">
            "با ریحان، سازمان خود را به عصر دیجیتال وارد کنید و از مزایای مدیریت هوشمند بهره‌مند شوید"
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {transformationStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className={`relative bg-white p-8 rounded-2xl shadow-xl bg-gradient-to-br hover:bg-gradient-to-br hover:from-primary/20 hover:to-primary/5 transition-colors duration-1000 text-gray-900 ${stat.color}`}>
                <div className="text-4xl mb-4">{stat.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{stat.title}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-secondary/30 to-primary/30 p-8 rounded-2xl shadow-xl">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <Image
                  src="/images/testimonials/3.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                whileHover={{ scale: 1.05 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className=" rounded-2xl shadow-xl p-2 cursor-pointer hover:bg-white"
              >
              <Link href="/blog"                 className="flex items-center gap-2 "
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div></Link>
            </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-secondary-dark">آماده تحول دیجیتال هستید؟</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            onClick={()=> setbool(true)}
          >
            شروع کنید
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection; 