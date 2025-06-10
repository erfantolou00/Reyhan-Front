"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { FiTrendingUp, FiShield, FiZap, FiBarChart2 } from "react-icons/fi";
import Image from "next/image";

type Benefit = {
  icon: any;
  title: string;
  description: string;
  color: string;
  image: string;
};

const benefits: Benefit[] = [
  {
    icon: FiTrendingUp,
    title: "سفارشی‌سازی ۱۰۰٪",
    description:
      "نرم‌افزار ما از صفر، بر اساس ساختار، نیاز و دغدغه‌های خاص سازمان شما طراحی می‌شود؛ نه یک نسخه عمومی برای همه.",
    color: "#F97316",
    image: "/images/benefits/1.png",
  },
  {
    icon: FiShield,
    title: "سرعت واقعی در عمل",
    description:
      "از بارگذاری صفحات تا پردازش داده‌ها، ریحان برای عملکرد سریع در سازمان‌های پرحجم و پرتراکنش بهینه شده است.",
    color: "#2563EB",
    image: "/images/benefits/2.png",
  },
  {
    icon: FiZap,
    title: "طراحی مدرن و کاربرمحور",
    description:
      "رابط کاربری ساده، زیبا و هوشمند به شما کمک می‌کند بدون پیچیدگی‌های فنی، با نرم‌افزار احساس راحتی کنید.",
    color: "#F97316",
    image: "/images/benefits/3.png",
  },
  {
    icon: FiBarChart2,
    title: "پشتیبانی تا پیاده‌سازی کامل",
    description:
      "از نصب تا آموزش، همراه شماییم تا نرم‌افزار دقیقاً آن‌طور که باید، اجرا شود.",
    color: "#2563EB",
    image: "/images/benefits/4.png",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
  hover: {
    scale: 1.05,
    y: -10,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const BenefitsSection = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState<Benefit | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary/10 py-24 min-h-screen flex items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-extrabold gradient-text">
            <span className="text-primary-light">ریحان،</span> فراتر از ERP
          </h2>
          <p className="mx-auto max-w-3xl text-xl italic text-gray-600">
            "ریحان تنها یک ERP نیست؛ راهکاری چابک، سفارشی و کارآمد برای ارتقای
            عملکرد سازمان شماست."
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{
                once: false,
                margin: "0px 0px -100px 0px",
                amount: 0.3,
              }}
              onHoverStart={() => setHoveredBenefit(benefit)}
              onHoverEnd={() => setHoveredBenefit(null)}
              className="group relative overflow-visible rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
            >
              <div
                className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
                style={{ backgroundColor: benefit.color }}
              />
              <div
                className="mb-6 inline-block rounded-xl p-3"
                style={{ backgroundColor: `${benefit.color}20` }}
              >
                <benefit.icon
                  className="h-8 w-8"
                  style={{ color: benefit.color }}
                />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#111827]">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        {hoveredBenefit && hoveredBenefit.image && (
          <div
            className="fixed  z-[9999] pointer-events-none bg-black/10 backdrop-blur-lg rounded-lg p-2"
            style={{
              left: mousePosition.x,
              top: mousePosition.y - 420,
              transform: "translateX(-50%)",
            }}
          >
            <Image
              src={hoveredBenefit.image}
              alt={hoveredBenefit.title}
              width={500}
              height={500}
              className="rounded-lg shadow-xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;
