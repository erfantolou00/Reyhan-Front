'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Section } from '@/lib/sections';
import { useSectionTracker } from '@/lib/useSectionTracker';

interface FloatingNavbarProps {
  sections: Section[];
}

const FloatingNavbar = ({ sections }: FloatingNavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { activeSection, scrollProgress, isScrolled, scrollToSection } = useSectionTracker(sections, 96);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-xl backdrop-blur-xl dark:bg-[#0c1a2c]/95 dark:shadow-none' : 'bg-transparent'
          }`}
        initial={{ y: -120 }}
        animate={{ y: isScrolled ? 0 : -120, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        dir="rtl"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img className="h-9 w-9 rounded-2xl shadow-md" src="/logo.webp" loading='lazy' alt="لوگو ریحان" />
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">ریحان</p>
                <p className="text-xs text-slate-400">سیستم مدیریت سازمانی</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`relative rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? 'text-primary shadow-sm' : 'text-slate-600 hover:text-primary dark:text-slate-300'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{section.icon}</span>
                      <span>{section.label}</span>
                    </span>
                    {isActive && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-primary hover:text-primary dark:border-white/10 dark:bg-[#0c1a2c] dark:text-slate-200 md:hidden"
              aria-expanded={isMobileOpen}
              aria-label="باز کردن منوی ناوبری"
              onClick={() => setIsMobileOpen((current) => !current)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={isMobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="border-t border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0c1a2c]/95 md:hidden">
            <div className="space-y-2 px-4 py-4">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      scrollToSection(section.id);
                      setIsMobileOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-right text-sm font-medium transition ${isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5'
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
        )}
      </motion.nav>
    </>
  );
};

export default FloatingNavbar;
