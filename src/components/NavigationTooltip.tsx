'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface Section {
  id: string;
  label: string;
  icon: string;
  preview: string;
  description: string;
}

const sections: Section[] = [
  { 
    id: 'hero', 
    label: 'صفحه اصلی', 
    icon: '🏠',
    preview: '/previews/hero.png',
    description: 'معرفی شرکت و خدمات ما'
  },
  { 
    id: 'benefits', 
    label: 'مزایا', 
    icon: '✨',
    preview: '/previews/benefits.png',
    description: 'مزایای استفاده از خدمات ما'
  },
  { 
    id: 'features', 
    label: 'ویژگی‌ها', 
    icon: '🚀',
    preview: '/previews/features.png',
    description: 'ویژگی‌های منحصر به فرد محصولات ما'
  },
  { 
    id: 'testimonials', 
    label: 'نظرات', 
    icon: '💬',
    preview: '/previews/testimonials.png',
    description: 'نظرات مشتریان راضی ما'
  },
  { 
    id: 'contact', 
    label: 'تماس', 
    icon: '📞',
    preview: '/previews/contact.png',
    description: 'راه‌های ارتباطی با ما'
  },
];

const NavigationTooltip = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionProgress, setSectionProgress] = useState<{ [key: string]: number }>({});

  // Optimize scroll handling with useCallback and throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let newActiveSection = activeSection;
    const newProgress: { [key: string]: number } = {};

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { top, bottom, height } = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress
        const progress = Math.min(
          Math.max(
            (viewportHeight - top) / (viewportHeight + height),
            0
          ),
          1
        );
        newProgress[section.id] = progress;

        // Update active section
        if (top <= viewportHeight / 2 && bottom >= viewportHeight / 2) {
          newActiveSection = section.id;
        }
      }
    }

    setSectionProgress(newProgress);
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection);
    }
  }, [activeSection]);

  // Use Intersection Observer for better performance
  const { ref: containerRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Optimize scroll event listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const throttledScroll = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null as any;
      }, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Smooth scroll with offset
  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyPress = useCallback((e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSectionClick(sectionId);
    }
  }, [handleSectionClick]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      role="navigation"
      aria-label="منوی اصلی"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Company Logo */}
        <div className="mb-8 relative">
          <Image
            src="/logo.webp"
            alt="لوگوی شرکت"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => setError('خطا در بارگذاری لوگو')}
            priority
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
              <div className="w-6 h-6 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;
          const progress = sectionProgress[section.id] || 0;
          
          return (
            <motion.div
              key={section.id}
              className="group relative"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredSection(section.id)}
              onHoverEnd={() => setHoveredSection(null)}
            >
              {/* Progress Ring */}
              <svg className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-200"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-[#F97316]"
                  strokeDasharray="138.2"
                  style={{ strokeDashoffset: 138.2 * (1 - progress) }}
                />
              </svg>

              <button
                onClick={() => handleSectionClick(section.id)}
                onKeyPress={(e) => handleKeyPress(e, section.id)}
                className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 ${
                  isActive
                    ? 'bg-[#F97316] text-white'
                    : 'bg-white/80 text-gray-600 hover:bg-white'
                } shadow-lg hover:shadow-xl`}
                aria-label={section.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-xl" aria-hidden="true">{section.icon}</span>
              </button>

              {/* Hover Preview */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
                    role="tooltip"
                  >
                    <div className="relative h-24 w-full">
                      <Image
                        src={section.preview}
                        alt={`پیش‌نمایش ${section.label}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800">{section.label}</h3>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          );
        })}

        {/* Digital Business Card */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-lg w-48">
          <h3 className="font-semibold text-gray-800 mb-2">تماس با ما</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <a href="tel:02112345678" className="flex items-center gap-2 hover:text-[#F97316] transition-colors">
              <span>📞</span>
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
            <a href="mailto:info@company.com" className="flex items-center gap-2 hover:text-[#F97316] transition-colors">
              <span>📧</span>
              <span>info@company.com</span>
            </a>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#F97316] transition-colors">
              <span>📍</span>
              <span>تهران، خیابان ولیعصر</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationTooltip; 