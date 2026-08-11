'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import headerData from './header.json';
import { getIcon } from '@/helper/renderIcon';

interface SubMenuItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  hasDropdown: boolean;
  isDownload?: boolean;
}

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredModules, setFilteredModules] = useState<SubMenuItem[]>([]);
  
  const { user, logout, isLoading } = useAuth();
  const headerRef = useRef(null);
  const isInView = useInView(headerRef);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // جستجو در زیرمنو
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = headerData.portfolioSubMenu.filter((item: SubMenuItem) =>
        item.name.includes(searchQuery) || 
        item.description.includes(searchQuery)
      );
      setFilteredModules(filtered);
    } else {
      setFilteredModules(headerData.portfolioSubMenu);
    }
  }, [searchQuery]);

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

  const handleModuleClick = async (id: number) => {
    console.log(`ارسال شناسه سامانه به سرور: ${id}`);
    
    try {
      // ارسال به سرور برای آنالیز
      await fetch('/api/track-module-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId: id }),
      }).catch(() => {});
    } catch (error) {
      console.error("خطا در ارسال داده به سرور:", error);
    }

    setIsSubMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileSubMenuOpen(false);
    router.push(`/portfolio?id=${id}`);
  };

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  const renderNavItem = (item: NavItem, isMobile: boolean = false) => {
    const isDownload = item.isDownload || item.href.endsWith('.pdf');

    if (item.hasDropdown) {
      return (
        <div key={item.id} className={isMobile ? 'flex flex-col' : 'relative'}>
          {isMobile ? (
            <>
              <button
                onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {renderIcon(item.icon, "w-5 h-5")}
                  {item.name}
                </div>
                <motion.div
                  animate={{ rotate: isMobileSubMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderIcon('ChevronDown', "w-4 h-4")}
                </motion.div>
              </button>

              <AnimatePresence>
                {isMobileSubMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mr-4 pr-2 space-y-1 border-r-2 border-primary/20 mt-1"
                  >
                    {/* جستجو در موبایل */}
                    <div className="px-3 py-2">
                      <input
                        type="text"
                        placeholder="جستجوی سامانه..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    {filteredModules.map((sub: SubMenuItem) => (
                      <motion.button
                        key={sub.id}
                        onClick={() => handleModuleClick(sub.id)}
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md text-right transition-all"
                      >
                        {renderIcon(sub.icon, "w-4 h-4")}
                        <span>{sub.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div
              onMouseEnter={() => {
                setActiveHover(item.id);
                setIsSubMenuOpen(true);
              }}
              onMouseLeave={() => {
                setActiveHover(null);
                setIsSubMenuOpen(false);
              }}
            >
              <button
                className="relative text-gray-700  hover:text-primary px-3 py-2 text-lg font-medium group flex items-center gap-2 outline-none cursor-pointer"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: activeHover === item.id ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {renderIcon(item.icon, "w-5 h-5")}
                </motion.span>
                {item.name}
                <motion.div
                  animate={{ rotate: isSubMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderIcon('ChevronDown', "w-4 h-4")}
                </motion.div>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: isSubMenuOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>

              <AnimatePresence>
                {isSubMenuOpen && (
                  <motion.div
                    {...headerData.animations.dropdown}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 p-2"
                  >
                    {/* جستجو در دسکتاپ */}
                    <div className="px-3 py-2 mb-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="جستجوی سامانه..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                          {renderIcon('Search', "w-4 h-4")}
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-1 text-xs font-semibold text-gray-400 border-b border-gray-50 mb-1">
                      فرایندهای سازمانی سیستم ریحان
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      {filteredModules.map((sub: SubMenuItem) => (
                        <motion.button
                          key={sub.id}
                          onClick={() => handleModuleClick(sub.id)}
                          whileHover={{ x: -5 }}
                          className="flex items-center gap-3 w-full px-3 py-2.5 text-right text-gray-700 hover:text-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 rounded-xl transition-all duration-150 text-sm font-medium"
                        >
                          <span className="p-1.5 rounded-lg bg-gray-100">
                            {renderIcon(sub.icon, "w-5 h-5")}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium">{sub.name}</div>
                            <div className="text-xs text-gray-400">{sub.description}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      );
    }

    return (
      <motion.div
        key={item.id}
        onHoverStart={() => setActiveHover(item.id)}
        onHoverEnd={() => setActiveHover(null)}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        className={isMobile ? 'w-full' : ''}
      >
        {isDownload ? (
          <a
            href={item.href}
            onClick={(e) => {
              handleDownload(e, item.href);
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2 ${
              isMobile 
                ? 'px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg' 
                : 'relative text-gray-700 hover:text-primary px-3 py-2 text-lg font-medium group'
            } transition-colors duration-200`}
            download
          >
            {renderIcon(item.icon, isMobile ? "w-5 h-5" : "w-5 h-5")}
            {item.name}
            {!isMobile && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </a>
        ) : (
          <Link
            href={item.href}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2 ${
              isMobile 
                ? 'px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg' 
                : 'relative text-gray-700 hover:text-primary px-3 py-2 text-lg font-medium group'
            } transition-colors duration-200`}
          >
            {renderIcon(item.icon, isMobile ? "w-5 h-5" : "w-5 h-5")}
            {item.name}
            {!isMobile && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        )}
      </motion.div>
    );
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-gradient-to-r bg-white/50'
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
                src={headerData.logo.image}
                alt={headerData.logo.alt}
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
              {headerData.logo.text}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {headerData.navigation.map((item: NavItem) => renderNavItem(item, false))}
          </div>

          {/* Auth Button - Desktop */}
          <div className="hidden md:flex items-center mr-4 relative">
            {isLoading ? (
              <div className="w-24 h-10 bg-gray-200 rounded-xl animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 text-sm font-medium text-gray-800 hover:from-primary/20 hover:to-secondary/20 transition"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary text-white shrink-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      renderIcon('User', "w-4 h-4")
                    )}
                  </span>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <motion.div
                    animate={{ rotate: isProfileOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderIcon('ChevronDown', "w-4 h-4")}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.emailOrPhone}</p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-right text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        {renderIcon('UserCircle', "w-4 h-4")}
                        {headerData.auth.profileText}
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-right text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        {renderIcon('LogOut', "w-4 h-4")}
                        {headerData.auth.logoutText}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 text-sm font-medium text-white shadow-md hover:opacity-90 transition hover:shadow-lg"
              >
                {headerData.auth.loginText}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              renderIcon('X', "w-6 h-6 text-gray-700")
            ) : (
              renderIcon('Menu', "w-6 h-6 text-gray-700")
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="border-t border-gray-100 mt-2 pt-2">
                {user ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary text-white shrink-0">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          renderIcon('User', "w-5 h-5")
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.emailOrPhone}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full text-right text-sm text-gray-700 py-2 hover:bg-gray-50 px-3 rounded-lg transition"
                    >
                      {renderIcon('UserCircle', "w-4 h-4")}
                      {headerData.auth.profileText}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-right text-sm text-red-600 py-2 hover:bg-red-50 px-3 rounded-lg transition"
                    >
                      {renderIcon('LogOut', "w-4 h-4")}
                      {headerData.auth.logoutText}
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center mx-2 mb-1 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-sm font-medium text-white"
                  >
                    {headerData.auth.loginText}
                  </Link>
                )}
              </div>
              
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg rounded-lg mt-2 shadow-lg max-h-[70vh] overflow-y-auto"
              >
                {headerData.navigation.map((item: NavItem) => renderNavItem(item, true))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </motion.header>
  );
}