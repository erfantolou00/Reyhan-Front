'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface Section {
  id: string;
  label: string;
  icon: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'صفحه اصلی', icon: '🏠' },
  { id: 'benefits', label: 'مزایا', icon: '✨' },
  { id: 'features', label: 'ویژگی‌ها', icon: '🚀' },
  { id: 'testimonials', label: 'نظرات', icon: '💬' },
  { id: 'contact', label: 'تماس', icon: '📞' },
];

const FloatingNavbar = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { ref: navbarRef, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { top, bottom } = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (top <= viewportHeight / 2 && bottom >= viewportHeight / 2) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSectionClick = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#F97316] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Navbar */}
      <motion.nav
        ref={navbarRef}
        initial={{ y: -100 }}
        animate={{ 
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : ''
        }`}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="لوگوی شرکت"
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4 space-x-reverse">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'text-[#F97316]'
                          : 'text-gray-600 hover:text-[#F97316]'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center gap-2">
                        <span>{section.icon}</span>
                        <span>{section.label}</span>
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#F97316] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F97316]"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">باز کردن منو</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 space-y-reverse">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`block w-full text-right px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-[#F97316] text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#F97316]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{section.icon}</span>
                    <span>{section.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default FloatingNavbar; 