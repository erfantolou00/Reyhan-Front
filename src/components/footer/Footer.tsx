'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft } from 'react-icons/fa';
import { getIcon } from '@/helper/renderIcon';
import footerData from './footer.json';
import { toast } from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('لطفاً ایمیل خود را وارد کنید');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success(footerData.newsletter.successMessage);
        setEmail('');
      } else {
        toast.error(footerData.newsletter.errorMessage);
      }
    } catch (error) {
      toast.error(footerData.newsletter.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  // کلاس‌های ثابت برای رنگ شبکه‌های اجتماعی (Tailwind این‌ها را می‌بیند)
  const socialColorMap: Record<string, string> = {
    'blue-600': 'hover:bg-blue-600 hover:border-blue-600',
    'pink-600': 'hover:bg-pink-600 hover:border-pink-600',
    'blue-400': 'hover:bg-blue-400 hover:border-blue-400',
    'red-600': 'hover:bg-red-600 hover:border-red-600',
    'sky-500': 'hover:bg-sky-500 hover:border-sky-500',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <footer
      className="relative text-white overflow-hidden border-t border-white/5"
      style={{ backgroundColor: '#020617' }}
      dir="rtl"
    >
      {/* دکوراسیون پس‌زمینه */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* بخش برندینگ */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                <Image
                  src={footerData.brand.logo}
                  alt="Reyhan Logo"
                  width={80}
                  height={80}
                  className="relative rounded-2xl p-2 border border-white/10 bg-slate-300"
                  priority
                />
              </div>
              <div>
                <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-white to-slate-400">
                  {footerData.brand.name}
                </h3>
                <p className="text-xs text-blue-400 font-medium tracking-widest mt-1 uppercase">
                  {footerData.brand.tagline}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                  {footerData.brand.badge}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-base leading-8 max-w-sm">
              {footerData.brand.description}
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-3 flex-wrap">
              {footerData.socialMedia.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all duration-300 ${
                    socialColorMap[social.color] || ''
                  }`}
                  aria-label={social.name}
                >
                  {renderIcon(social.icon, 'w-4 h-4')}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* دسترسی سریع */}
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:mr-auto">
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              دسترسی سریع
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-blue-600 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center group text-slate-400 hover:text-white transition-colors"
                  >
                    <FaChevronLeft className="w-3 h-3 ml-2 text-blue-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:mr-1 transition-all">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* اطلاعات تماس */}
          <motion.div variants={itemVariants} className="lg:col-span-5 lg:pr-12">
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              {footerData.contactInfo.address.label}
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-indigo-600 rounded-full" />
            </h4>

            <div className="space-y-6">
              {/* آدرس */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-4 group"
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  {renderIcon(footerData.contactInfo.address.icon, 'text-blue-500 text-xl')}
                </div>
                <div>
                  <p className="text-slate-400 text-sm leading-7">سمنان، بلوار دانشگاه،</p>
                  <p className="text-white font-medium">{footerData.contactInfo.address.value}</p>
                </div>
              </motion.div>

              {/* تلفن */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 group"
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  {renderIcon(footerData.contactInfo.phone.icon, 'text-blue-500 text-lg')}
                </div>
                <div dir="ltr" className="text-right">
                  <p className="text-white font-bold text-lg tracking-wider">
                    {footerData.contactInfo.phone.value}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {footerData.contactInfo.phone.description}
                  </p>
                </div>
              </motion.div>

              {/* ایمیل */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 group"
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  {renderIcon(footerData.contactInfo.email.icon, 'text-blue-500 text-lg')}
                </div>
                <div>
                  <p className="text-slate-400 text-sm">
                    {footerData.contactInfo.email.description}
                  </p>
                  <p className="text-white font-medium">
                    {footerData.contactInfo.email.value}
                  </p>
                </div>
              </motion.div>

              {/* ساعات کاری */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 group"
                whileHover={{ x: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  {renderIcon(footerData.contactInfo.workingHours.icon, 'text-blue-500 text-lg')}
                </div>
                <div>
                  <p className="text-slate-400 text-sm">
                    {footerData.contactInfo.workingHours.label}
                  </p>
                  <p className="text-white font-medium">
                    {footerData.contactInfo.workingHours.value}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {footerData.contactInfo.workingHours.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* خبرنامه */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold mb-2">{footerData.newsletter.title}</h4>
              <p className="text-slate-400 text-sm">{footerData.newsletter.description}</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footerData.newsletter.placeholder}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-600/25 transition-all disabled:opacity-70 whitespace-nowrap"
              >
                {isSubmitting ? 'در حال ارسال...' : footerData.newsletter.button}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* کپی‌رایت */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="text-slate-300 font-bold">{footerData.brand.name}</span>.{' '}
            {footerData.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-slate-500">
              {renderIcon(footerData.footer.badge.icon, 'w-3 h-3')}
              {footerData.footer.badge.text}
            </span>
            <div className="flex gap-6 text-slate-500 text-sm">
              {footerData.footer.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}