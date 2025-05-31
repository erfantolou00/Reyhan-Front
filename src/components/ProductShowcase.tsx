'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const features = [
  {
    title: '🧭 کنترل یکپارچه، بدون پیچیدگی',
    description: 'تمام ماژول‌ها در یک سیستم منسجم، برای تصمیم‌گیری سریع و مطمئن.',
    image: 'images/products/1.png',
    color: '#F97316',
  },
  {
    title: '📊 دید عمیق، تصمیم‌های دقیق',
    description: 'داده‌ها به زبان ساده، برای تحلیل‌های هوشمندانه و مدیریت لحظه‌ای.',
    image: 'images/products/2.png',
    color: '#2563EB',
  },
  {
    title: '⚙️ فرایندهای خودکار، مدیریت بدون فرسایش',
    description: 'با اتوماسیون هوشمند، زمان‌تان را صرف رشد سازمان کنید، نه کارهای تکراری.',
    image: 'images/products/3.png',
    color: '#F97316',
  },
];

const ProductShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-[#F3F4F6]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">
          قدرت مدیریت
          در دستان شما          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            با قابلیت‌های پیشرفته و طراحی کاربرپسند ما، تحول در عملیات کسب و کار خود را تجربه کنید
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Feature Navigation */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const x = useMotionValue(0);
              const y = useMotionValue(0);

              const mouseXSpring = useSpring(x);
              const mouseYSpring = useSpring(y);

              const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
              const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

              const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
              const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
              const shadowBlur = useTransform(mouseYSpring, [-0.5, 0.5], [20, 40]);
              const shadowSpread = useTransform(mouseYSpring, [-0.5, 0.5], [-5, 5]);

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const xPct = mouseX / width - 0.5;
                const yPct = mouseY / height - 0.5;
                x.set(xPct);
                y.set(yPct);
              };

              const handleMouseLeave = () => {
                x.set(0);
                y.set(0);
              };

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-white shadow-2xl scale-110 border-2 border-primary/30'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Dynamic Shadow Layer */}
                  <motion.div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10, transparent)`,
                      filter: `blur(20px)`,
                      x: shadowX,
                      y: shadowY,
                      boxShadow: `0 0 30px 0 ${feature.color}30`
                    }}
                  />

                  {/* Enhanced Glow Effect */}
                  <motion.div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-500 -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}50, ${feature.color}30)`,
                      filter: `blur(20px)`,
                      x: shadowX,
                      y: shadowY
                    }}
                  />

                  <div
                    className="absolute inset-0 rounded-2xl opacity-10"
                    style={{ backgroundColor: feature.color }}
                  />
                  <div className="relative">
                    <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>

                  {/* Enhanced Shine Effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <motion.div
                      className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Feature Preview */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              style={{ backgroundColor: `${features[activeFeature].color}20` }}
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: '۹۸٪', label: 'رضایت مشتریان' },
            { number: '۲۴/۷', label: 'پشتیبانی شبانه‌روزی' },
            { number: '۵۰۰+', label: 'مشتریان سازمانی' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl    hover:scale-110 transition-all duration-300"
            >
              <div className="text-4xl font-bold text-[#F97316] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase; 