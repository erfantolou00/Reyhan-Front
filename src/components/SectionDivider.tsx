'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  type?: 'wave' | 'curve' | 'angle' | 'zigzag' | 'doubleWave';
  color?: string;
  className?: string;
  flip?: boolean;
}

const SectionDivider = ({
  type = 'doubleWave',
  color = 'var(--primary)',
  className = '',
  flip = false,
}: SectionDividerProps) => {
  const getPath = () => {
    switch (type) {
      case 'wave':
        return flip
          ? 'M0,0 C150,100 350,0 500,100 C650,200 850,100 1000,0 L1000,100 L0,100 Z'
          : 'M0,100 C150,0 350,100 500,0 C650,-100 850,0 1000,100 L1000,0 L0,0 Z';
      case 'curve':
        return flip
          ? 'M0,0 C250,100 750,100 1000,0 L1000,100 L0,100 Z'
          : 'M0,100 C250,0 750,0 1000,100 L1000,0 L0,0 Z';
      case 'angle':
        return flip
          ? 'M0,0 L1000,100 L1000,0 Z'
          : 'M0,100 L1000,0 L1000,100 Z';
      case 'zigzag':
        return flip
          ? 'M0,0 L250,100 L500,0 L750,100 L1000,0 L1000,100 L0,100 Z'
          : 'M0,100 L250,0 L500,100 L750,0 L1000,100 L1000,0 L0,0 Z';
      case 'doubleWave':
        return flip
          ? 'M0,0 C200,150 800,-50 1000,100 L1000,100 L0,100 Z'
          : 'M0,100 C200,-50 800,150 1000,0 L1000,0 L0,0 Z';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`relative h-24 w-full bg-primary/10  overflow-hidden ${className}`}
    >
      <svg
        className="absolute left-0 top-0 h-full w-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          d={getPath()}
          fill={color}
          opacity={0.5}
          className="transition-colors duration-500 "
        />
      </svg>
    </motion.div>
  );
};

export default SectionDivider; 