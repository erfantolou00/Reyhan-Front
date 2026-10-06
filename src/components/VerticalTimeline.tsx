'use client';

import { motion } from 'framer-motion';
import type { Section } from '@/lib/sections';
import { useSectionTracker } from '@/lib/useSectionTracker';

interface VerticalTimelineProps {
  sections: Section[];
}

export default function VerticalTimeline({ sections }: VerticalTimelineProps) {
  const { activeSection, scrollProgress, scrollToSection } = useSectionTracker(sections, 96);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200/50 -translate-x-1/2 overflow-hidden">
          <motion.div
            className="h-full w-full origin-top bg-[#F97316]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: scrollProgress / 100 }}
            transition={{ type: "tween", duration: 0.2 }}
          />
        </div>
        
        {/* Timeline dots */}
        <div className="relative flex flex-col items-center gap-8">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="relative flex items-center justify-center"
              >
                <span
                  className={`relative block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-200 ${
                    isActive ? 'border-primary bg-primary' : 'border-white bg-slate-300'
                  }`}
                />
                <span
                  className={`pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-2 py-0.5 text-sm shadow-sm dark:bg-[#0c1a2c] dark:text-slate-200 ${
                    isActive ? 'font-semibold text-primary' : 'text-slate-600'
                  }`}
                >
                  {section.icon} {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 