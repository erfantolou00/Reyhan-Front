"use client";

import Image from 'next/image';
import Link from 'next/link';
import { 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaChevronLeft, 
  FaLinkedinIn, 
  FaInstagram, 
  FaTwitter 
} from "react-icons/fa";

const quickLinks = [
  { label: 'درباره ما', href: '/about' },
  { label: 'خدمات و ماژول‌ها', href: '/products' },
  { label: 'بلاگ آموزشی', href: '/blog' },
  { label: 'ویترین نمونه‌کارها', href: '/portfolio' },
  { label: 'تماس با تیم فروش', href: '/contact' },
];

const socialLinks = [
  { icon: <FaLinkedinIn />, href: '#', label: 'Linkedin' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#020617] text-white overflow-hidden border-t border-white/5" dir="rtl">
      {/* دکوراسیون پس‌زمینه (نورهای ملایم) */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[150px] rounded-full" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* بخش برندینگ و معرفی */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <Image 
                  src="/logo.webp" 
                  alt="Reyhan Logo" 
                  width={80} 
                  height={80} 
                  className="relative rounded-2xl p-2 border border-white/10 bg-slate-300" 
                  priority 
                />
              </div>
              <div>
                <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-white to-slate-400">
                  ریحان
                </h3>
                <p className="text-xs text-blue-400 font-medium tracking-widest mt-1 uppercase">Smart ERP Solution</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-base leading-8 max-w-sm">
              تجربه‌ای مدرن در مدیریت هوشمند منابع سازمانی. ما با تکیه بر دانش فنی و نگاهی نوآورانه، مسیر رشد و بهره‌وری کسب‌وکار شما را هموار می‌کنیم.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* بخش دسترسی سریع */}
          <div className="lg:col-span-3 lg:mr-auto">
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              دسترسی سریع
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
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
          </div>

          {/* بخش اطلاعات تماس */}
          <div className="lg:col-span-5 lg:pr-12">
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              اطلاعات تماس
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-indigo-600 rounded-full"></span>
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <FaMapMarkerAlt className="text-blue-500 text-xl" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm leading-7">سمنان، بلوار دانشگاه،</p>
                  <p className="text-white font-medium">پارک علم و فناوری دانشگاه سمنان</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <FaPhoneAlt className="text-blue-500 text-lg" />
                </div>
                <div dir="ltr" className="text-right">
                  <p className="text-white font-bold text-lg tracking-wider">۰۲۳-۳۳۶۰۵۰۰۰</p>
                  <p className="text-slate-500 text-xs">ساعات پاسخگویی: ۸ الی ۱۶</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <FaEnvelope className="text-blue-500 text-lg" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">ایمیل سازمانی:</p>
                  <p className="text-white font-medium">info@reyhanerp.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* بخش کپی‌رایت */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} <span className="text-slate-300 font-bold">ریحان</span>. تمامی حقوق مادی و معنوی محفوظ است.
          </p>
          <div className="flex gap-8 text-slate-500 text-sm">
            <Link href="#" className="hover:text-white transition-colors">قوانین و مقررات</Link>
            <Link href="#" className="hover:text-white transition-colors">حریم خصوصی</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
