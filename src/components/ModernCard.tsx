'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface ModernCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  gradient?: 'primary' | 'secondary' | 'mixed';
}

export default function ModernCard({
  children,
  delay = 0,
  className = '',
  icon,
  title,
  description,
  gradient = 'mixed'
}: ModernCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  // Dynamic shadow values based on mouse position
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
  const shadowBlur = useTransform(mouseYSpring, [-0.5, 0.5], [20, 40]);
  const shadowSpread = useTransform(mouseYSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const gradientStyles = {
    primary: 'from-primary/20 via-primary/10 to-transparent',
    secondary: 'from-secondary/20 via-secondary/10 to-transparent',
    mixed: 'from-primary/20 via-secondary/10 to-transparent'
  };

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Shadow Layer - Now behind the card */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background: `linear-gradient(135deg, ${gradientStyles[gradient]})`,
          filter: `blur(20px)`,
          x: shadowX,
          y: shadowY,
          boxShadow: `0 0 30px 0 rgba(var(--primary-rgb), 0.3)`
        }}
      />

      {/* Enhanced Glow Effect - Also behind the card */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-75 transition duration-500 -z-10"
        style={{
          background: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.5), rgba(var(--secondary-rgb), 0.5))`,
          filter: `blur(20px)`,
          x: shadowX,
          y: shadowY
        }}
      />

      {/* Card Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
           style={{ background: `linear-gradient(135deg, ${gradientStyles[gradient]})` }} />

      {/* Card Content */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/50">
        {/* Icon with Animation */}
        {icon && (
          <motion.div
            className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
            animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Title with Gradient */}
        {title && (
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-700 leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Children Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Enhanced Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, 
              rgba(var(--primary-rgb), 0.1), 
              rgba(var(--secondary-rgb), 0.1)
            )`,
            x: shadowX,
            y: shadowY
          }}
        />

        {/* Enhanced Shine Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: isHovered ? ['-100%', '100%'] : '-100%'
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1
            }}
          />
        </div>
      </div>
    </motion.div>
  );
} 