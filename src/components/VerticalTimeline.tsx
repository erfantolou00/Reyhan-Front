'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
  icon: string;
}

interface VerticalTimelineProps {
  sections: Section[];
}

export default function VerticalTimeline({ sections }: VerticalTimelineProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const calculateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    return Math.min(100, Math.max(0, scrollPercent));
  }, []);

  const findActiveSection = useCallback(() => {
    const viewportMiddle = window.scrollY + (window.innerHeight / 2);
    let closestSection = sections[0];
    let minDistance = Infinity;

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const sectionMiddle = rect.top + (rect.height / 2) + window.scrollY;
        const distance = Math.abs(viewportMiddle - sectionMiddle);

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      }
    });

    return closestSection.id;
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = calculateScrollProgress();
      setScrollProgress(progress);
      setActiveSection(findActiveSection());
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateScrollProgress, findActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight || 0;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    
    window.scrollTo({
      top: elementTop - headerHeight,
      behavior: 'smooth'
    });
  };

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
          {sections.map((section) => (
            <motion.div
              key={section.id}
              className="relative cursor-pointer group"
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Dot with glow effect */}
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-[#F97316] scale-125'
                      : 'bg-gray-300 group-hover:bg-gray-400'
                  }`}
                />
                {activeSection === section.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#F97316]/30"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              
              {/* Label with enhanced animation */}
              <AnimatePresence>
                {(activeSection === section.id || hoveredSection === section.id) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm ${
                      activeSection === section.id
                        ? 'text-[#F97316] font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{section.icon}</span>
                      <span>{section.label}</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 