'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'خانه', href: '/', icon: '🏠' },
  { name: 'وبلاگ', href: '/blog', icon: '📝' },
  { name: 'نمونه کارها', href: '/portfolio', icon: '🎯' },
  { name: 'گالری تصاویر', href: '/products', icon: '🖼️' },
  { name: 'درباره ما', href: '/about', icon: 'ℹ️' },
  { name: 'تماس با ما', href: '/contact', icon: '📞' },
  {
    name: 'کاتالوگ',
    href: '/reyhan-catalog.pdf',
    icon: '📩',
    isDownload: true
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تابع دانلود
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // اگر لینک دانلود باشه، جلوی navigation رو بگیریم
    if (href.endsWith('.pdf')) {
      e.preventDefault();

      const link = document.createElement('a');
      link.href = href;
      link.download = 'کاتالوگ-ریحان.pdf';   // نام دلخواه برای فایل دانلود شده
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          {/* Logo with 3D effect */}
          <motion.div
            className="flex-shrink-0 flex items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              style={{ perspective: 1000 }}
            >
              <Image src="/logo.webp" alt="Reyhan Logo" 
                width={60} height={60} className="rounded-xl shadow-lg" priority />
            </motion.div>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative group">
              ریحان
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation with enhanced effects */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 space-x-reverse">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  onHoverStart={() => setActiveHover(item.name)}
                  onHoverEnd={() => setActiveHover(null)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleDownload(e, item.href)}
                    className="relative text-gray-700 hover:text-primary px-3 py-2 text-lg font-medium group flex items-center gap-2"
                    {...(item.isDownload && { download: true })} // attribute دانلود
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: activeHover === item.name ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="text-xl"
                    >
                      {item.icon}
                    </motion.span>
                    {item.name}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                className="w-6 h-0.5 bg-gray-700 rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gray-700 rounded-full mt-1.5"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gray-700 rounded-full mt-1.5"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg rounded-lg mt-2 shadow-lg"
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleDownload(e, item.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                    >
                      <span className="text-xl transform group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </span>
                      {item.name}
                      <motion.span
                        className="w-0 h-0.5 bg-gradient-to-r from-primary to-secondary absolute bottom-0 left-0"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
} 