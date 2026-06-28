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
            className="w-full bg-[#F97316]"
            initial={{ height: 0 }}
            animate={{ height: `${scrollProgress}%` }}
            transition={{ type: "spring", stiffness: 100 }}
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
                  className={`relative block h-4 w-4 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-primary scale-125 shadow-[0_0_0_10px_rgba(249,115,22,0.18)]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
                <span
                  className={`pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm transition-colors duration-200 ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-500'
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