"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  ChevronRight
} from 'lucide-react';

import { getIcon } from '@/helper/renderIcon';
import heroData from '@/components/hero/hero.json';
import Typewriter from '../Typewriter';
import InteractiveCard from './InteractiveCard';

interface HeroProps {
  gatewayUrl: string | null;
}

const Hero = ({ gatewayUrl }: HeroProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleDemo = async () => {
    const url = gatewayUrl || null;
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error("دمو در دسترس نیست");
    }
  };

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={heroData.background.image}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={100}
            loading="eager"
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
        </motion.div>
      </div>

      {/* Overlays */}
      <div className={`absolute inset-0 ${heroData.background.overlays.gradient}`} />
      <div className={`absolute inset-0 ${heroData.background.overlays.radial}`} />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          {/* Left Content */}
          <div className="max-w-3xl text-right">
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur"
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-2.5 w-2.5 rounded-full bg-primary"
              />
              {heroData.badge.text}
              {renderIcon(heroData.badge.icon, "w-4 h-4 mr-1")}
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl"
            >
              <span className="block">{heroData.title.main}</span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className={`mt-3 pb-3 block bg-gradient-to-r ${heroData.title.gradient} bg-clip-text text-transparent`}
              >
                {heroData.title.highlight}
              </motion.span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mt-6 min-h-[3.5rem] text-2xl font-semibold text-slate-800 sm:text-3xl"
            >
              <Typewriter
                texts={heroData.typewriter.texts}
                speed={heroData.typewriter.speed}
                delay={heroData.typewriter.delay}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-8 text-slate-800 sm:text-xl"
            >
              {heroData.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={heroData.buttons.primary.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  {heroData.buttons.primary.text}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.button
                onClick={handleDemo}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-white/90 px-8 py-4 text-lg font-semibold text-primary shadow-sm backdrop-blur transition-all hover:border-primary hover:bg-white hover:shadow-lg"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {heroData.buttons.secondary.text}
              </motion.button>
            </motion.div>

            {/* Third Button - New */}
            <motion.div
              variants={itemVariants}
              className="mt-4"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary transition-colors group"
              >
                {heroData.buttons.tertiary.text}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3"
            >
              {heroData.highlights.map((item, index) => (
                <motion.span
                  key={index}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition-all hover:border-primary/30 hover:bg-white hover:shadow-md"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            {/* Trust Signals */}
            {/* {heroData.trustSignals.show && (
              <motion.div
                variants={itemVariants}
                className="mt-12 pt-8 border-t border-slate-200/50"
              >
                <p className="text-sm text-slate-500 mb-4">اعتماد سازمان‌های پیشرو</p>
                <div className="flex gap-6 items-center opacity-60">
                  {heroData.trustSignals.logos.map((logo, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="relative w-20 h-10"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )} */}
          </div>

          {/* Right Card with Stats */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <InteractiveCard />
            
           

            {/* Quick Stats Bar - Mobile */}
            <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
              {heroData.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/80 backdrop-blur rounded-xl p-3 text-center border border-white/50"
                >
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs font-medium">اسکرول</span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [4, 16, 4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-primary rounded-full mt-1"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;