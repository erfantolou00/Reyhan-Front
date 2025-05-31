'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = ''
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  
  // Color transitions based on scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)']
  )
  
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']
  )

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ 
        opacity, 
        backgroundColor,
        borderColor,
        borderStyle: 'solid',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease-in-out'
      }}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: 0.8 }
      }}
    >
      {children}
    </motion.div>
  )
} 