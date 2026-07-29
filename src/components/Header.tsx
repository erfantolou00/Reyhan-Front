'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// لیست زیرمنوهای سامانه ها (بر اساس اهمیت فرایندهای سازمانی)
const portfolioSubMenu = [
  { id: 1, name: 'منابع انسانی (HRM)', icon: '👥' },
  { id: 2, name: 'مدیریت مالی و حسابداری', icon: '💵' },
  { id: 3, name: 'مدیریت زنجیره تأمین (SCM)', icon: '🤝' },
  { id: 4, name: 'انبار و کالا', icon: '📦' },
  { id: 5, name: 'پروژه و وظایف', icon: '📅' },
  { id: 6, name: 'اتوماسیون اداری', icon: '📁' },
  { id: 7, name: 'فروش و مشتریان (CRM)', icon: '📈' },
  { id: 8, name: 'مدیریت تولید و کارخانه', icon: '🏭' },
  { id: 9, name: 'تعمیرات و نگهداری (PM)', icon: '🔧' },
  { id: 10, name: 'گزارشات مدیریتی (BI)', icon: '📊' },
];

const navigation = [
  { name: 'خانه', href: '/', icon: '🏠' },
  { name: 'وبلاگ', href: '/blog', icon: '📝' },
  { name: 'سامانه‌ها', href: '/portfolio', icon: '🎯', hasDropdown: true },
  { name: 'درباره ما', href: '/about', icon: 'ℹ️' },
  { name: 'تماس با ما', href: '/contact', icon: '📞' },
  {
    name: 'کاتالوگ',
    href: '/reyhan-catalog.pdf',
    icon: '📩',
    isDownload: true,
  },
];

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  
  // وضعیت باز بودن زیرمنو در دسکتاپ و موبایل
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تابع دانلود PDF
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.endsWith('.pdf')) {
      e.preventDefault();

      const link = document.createElement('a');
      link.href = href;
      link.download = 'کاتالوگ-ریحان.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // تابع ارسال آیدی ماژول به سرور و ریدایرکت به صفحه آن ماژول
  const handleModuleClick = async (id: number) => {
    console.log(`ارسال شناسه سامانه به سرور: ${id}`);
    
    // در صورت تمایل به ارسال لاگ یا آمار به بک‌اند قبل از انتقال:
    try {
      /*
      await fetch('/api/track-module-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: id }),
      });
      */
    } catch (error) {
      console.error("خطا در ارسال داده به سرور:", error);
    }

    // بستن منو‌ها
    setIsSubMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileSubMenuOpen(false);

    // انتقال به صفحه ماژول اختصاصی
    router.push(`/portfolio`);
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-lg shadow-lg'
        : 'bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6 }}
              style={{ perspective: 1000 }}
            >
              <Image
                src="/logo.webp"
                alt="Reyhan Logo"
                width={40}
                height={40}
                className="rounded-xl shadow-lg"
                priority
              />
            </motion.div>
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent relative group"
            >
              ریحان
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 space-x-reverse">
              {navigation.map((item) => {
                const isDownload = item.isDownload || item.href.endsWith('.pdf');

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => {
                        setActiveHover(item.name);
                        setIsSubMenuOpen(true);
                      }}
                      onMouseLeave={() => {
                        setActiveHover(null);
                        setIsSubMenuOpen(false);
                      }}
                    >
                      <button
                        className="relative text-gray-700 hover:text-primary px-3 py-2 text-lg font-medium group flex items-center gap-2 outline-none cursor-pointer"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: activeHover === item.name ? 1 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          className="text-xl"
                        >
                          {item.icon}
                        </motion.span>
                        {item.name}
                        {/* آیکون فلش رو به پایین */}
                        <svg className={`w-4 h-4 transition-transform duration-250 ${isSubMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: isSubMenuOpen ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isSubMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 p-2 grid grid-cols-1 gap-1"
                          >
                            <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-50 mb-1">
                              فرایندهای سازمانی سیستم ریحان
                            </div>
                            {portfolioSubMenu.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleModuleClick(sub.id)}
                                className="flex items-center gap-3 w-full px-3 py-2.5 text-right text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 rounded-xl transition-all duration-150 text-sm font-medium"
                              >
                                <span className="text-xl bg-gray-100 p-1.5 rounded-lg group-hover:bg-white">{sub.icon}</span>
                                <span>{sub.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={item.name}
                    onHoverStart={() => setActiveHover(item.name)}
                    onHoverEnd={() => setActiveHover(null)}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {isDownload ? (
                      <a
                        href={item.href}
                        onClick={(e) => handleDownload(e, item.href)}
                        className="relative text-gray-700 hover:text-primary px-3 py-2 text-lg font-medium group flex items-center gap-2"
                        download
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: activeHover === item.name ? 1 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="relative text-gray-700 hover:text-primary px-3 py-2 text-lg font-medium group flex items-center gap-2"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: activeHover === item.name ? 1 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                className="w-6 h-0.5 bg-gray-700 rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 },
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gray-700 rounded-full mt-1.5"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-gray-700 rounded-full mt-1.5"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 },
                }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
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
                {navigation.map((item, index) => {
                  const isDownload = item.isDownload || item.href.endsWith('.pdf');

                  if (item.hasDropdown) {
                    return (
                      <div key={item.name} className="flex flex-col">
                        <button
                          onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
                          className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.icon}</span>
                            {item.name}
                          </div>
                          <svg className={`w-4 h-4 transition-transform duration-200 ${isMobileSubMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* زیرمنوی موبایل به صورت آکاردئونی */}
                        <AnimatePresence>
                          {isMobileSubMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mr-4 pl-2 space-y-1 border-r border-gray-100 mt-1"
                            >
                              {portfolioSubMenu.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => handleModuleClick(sub.id)}
                                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md text-right"
                                >
                                  <span>{sub.icon}</span>
                                  <span>{sub.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {isDownload ? (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            handleDownload(e, item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                          download
                        >
                          <span className="text-xl transform group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                          </span>
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                        >
                          <span className="text-xl transform group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
