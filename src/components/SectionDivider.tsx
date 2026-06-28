'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = '' }: SectionDividerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`relative h-16 w-full overflow-hidden bg-transparent ${className}`}
    >
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-white shadow-sm">
        <div className="h-3 w-3 rounded-full bg-primary" />
      </div>
    </motion.div>
  );
};

export default SectionDivider; 