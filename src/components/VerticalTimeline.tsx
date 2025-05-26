'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface VerticalTimelineProps {
  sections: Section[];
}

export default function VerticalTimeline({ sections }: VerticalTimelineProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          const offsetBottom = bottom + window.scrollY;

          if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const heightProgress = activeSection !== "hero" ? scrollProgress + 25 : scrollProgress;


  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 overflow-hidden">
          <motion.div
            className="w-full bg-secondary"
            initial={{ height: 0 }}
            animate={{ height: `${heightProgress}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>
        
        {/* Timeline dots */}
        <div className="relative flex flex-col items-center gap-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              className="relative cursor-pointer group"
              onClick={() => {
                const element = document.getElementById(section.id);
                element?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'center'
                });
              }}
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
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-300 group-hover:bg-gray-400'
                  }`}
                />
                {activeSection === section.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/30"
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
                        ? 'text-blue-500 font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    {section.label}
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