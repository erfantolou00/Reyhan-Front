'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Typewriter from './Typewriter';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Animate scroll indicator
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Parallax effect for background
    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-bg',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  // Handle demo button click
  const handleDemo = () => {
    window.open('https://demo.sadodin.ir', '_blank');
  };

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#F3F4F6] to-white">
      {/* Background Image/Video */}
      <motion.div 
        className="absolute inset-0 z-0 hero-bg"
        style={{ y, opacity }}
      >
        <Image
          src="/hero-bg.avif"
          alt="پس‌زمینه سازمانی"
          fill
          className="object-cover opacity-10"
          priority
        />
      </motion.div>
      {/* <style jsx>{`
.custom-shape-divider-bottom-1748414865 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.custom-shape-divider-bottom-1748414865 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 271px;
    transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1748414865 .shape-fill {
    fill: var(--primary);
}
      `}</style>
      
      <div className="custom-shape-divider-bottom-1748414865">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path opacity={0.2} d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
    </svg>
</div> */}
      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6 h-20 text-4xl font-bold leading-tight text-[#111827] md:text-6xl"
          >
                <Typewriter
                  texts={[
                    "راهکار یکپارچه مدیریت سازمان",
                    "سفارشی‌سازی‌شده برای نیازهای شما",
                    "سریع، دقیق، قابل اعتماد",
                    "ریحان سامانه هوشمند"
                  ]}
                  
                />
              
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mb-8 text-lg text-gray-600 md:text-xl"
          >
ریحان، تمام فرایندهای سازمانی‌تان را با سرعت، دقت و انعطاف‌پذیری بالا یکپارچه می‌کند.          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex gap-4 justify-center"
          >
            <button className="rounded-full bg-[#F97316] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#EA580C] hover:shadow-lg hover:scale-105">
              درخواست مشاوره
            </button>
            <button onClick={handleDemo} className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#111827] transition-all hover:bg-gray-50 hover:shadow-lg hover:scale-105 border border-gray-200">
              مشاهده دمو
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-gray-600">اسکرول کنید</span>
          <svg
            className="h-6 w-6 text-[#F97316]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-[#2563EB] opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 transform rounded-full bg-[#F97316] opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
    </section>
  );
};

export default Hero; 