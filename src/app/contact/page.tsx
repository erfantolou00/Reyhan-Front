'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  AlertCircle,
  User,
  AtSign,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { useGatewayFetcher } from '@/hooks/useGatewayFetcher';
import { getIcon } from '@/helper/renderIcon';
import { ContactData, FormData, FormErrors } from '@/types';
import PageFrame, { PageHero } from '@/components/home/PageFrame';


export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // دریافت دیتای صفحه تماس از Gateway
  const {
    data: contactData,
    loading,
    error,
    refetch,
  } = useGatewayFetcher<ContactData>('data/contact.json');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  const sectionRef = useRef(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'نام و نام خانوادگی الزامی است';
    } else if (formData.full_name.trim().length < 3) {
      newErrors.full_name = 'نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره تماس الزامی است';
    } else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'شماره تماس باید ۱۱ رقم باشد';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'پیام الزامی است';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'پیام باید حداقل ۱۰ کاراکتر باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const allFields = new Set(['full_name', 'email', 'phone', 'message']);
    setTouchedFields(allFields);

    if (!validateForm()) {
      toast.error('لطفاً خطاهای فرم را برطرف کنید');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'خطا در ارسال پیام');

      toast.success(contactData?.form?.successMessage || 'پیام شما با موفقیت ارسال شد');
      
      setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setTouchedFields(new Set());

    } catch (error: any) {
      toast.error(error.message || contactData?.form?.errorMessage || 'خطا در ارسال پیام');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
  };

  const getFieldError = (fieldName: keyof FormErrors): string | undefined => {
    return touchedFields.has(fieldName) ? errors[fieldName] : undefined;
  };

  // رندر آیکون با استفاده از تابع getIcon (مشابه فوتر)
  const renderIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  const socialColorMap: Record<string, string> = {
    'blue-600': 'hover:bg-blue-600 hover:border-blue-600',
    'pink-600': 'hover:bg-pink-600 hover:border-pink-600',
    'blue-400': 'hover:bg-blue-400 hover:border-blue-400',
    'red-600': 'hover:bg-red-600 hover:border-red-600',
    'sky-500': 'hover:bg-sky-500 hover:border-sky-500',
    'emerald-600': 'hover:bg-emerald-600 hover:border-emerald-600',
    'purple-600': 'hover:bg-purple-600 hover:border-purple-600',
    'orange-600': 'hover:bg-orange-600 hover:border-orange-600',
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

// ===== بخش شرط‌ها =====
if (loading) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-slate-500 dark:text-slate-400">در حال بارگذاری صفحه تماس...</p>
      </div>
    </div>
  );
}

if (error) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">خطا در دریافت اطلاعات</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          {error || 'متأسفانه در دریافت اطلاعات صفحه تماس مشکلی پیش آمده است.'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}

if (!contactData) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">داده‌ای وجود ندارد</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">اطلاعات صفحه تماس در دسترس نیست.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}


  // حالا مطمئنیم که contactData وجود دارد
  return (
    <PageFrame>
      <PageHero
        eyebrow={contactData?.hero?.badge}
        title={<>تماس با <span className="text-primary">ریحان</span></>}
        subtitle={contactData.hero.subtitle}
      />

      {/* Contact Section */}
      <section className="py-20" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            {/* Contact Info - Left Side */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c1a2c]">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-950 dark:text-white">
                  <span className="text-primary">📞</span>
                  اطلاعات تماس
                </h2>
                
                <div className="space-y-4">
                  {/* آدرس */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-4 group p-3 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md"
                    whileHover={{ x: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {renderIcon(contactData.contactInfo.address.icon, 'text-primary w-5 h-5')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                        {contactData.contactInfo.address.label}
                      </h3>
                      {Array.isArray(contactData.contactInfo.address.value) ? (
                        <div className="text-slate-600 dark:text-slate-300 text-sm mt-1 flex">
                          {contactData.contactInfo.address.value.map((line, idx) => (
                            <p key={idx}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{contactData.contactInfo.address.value}</p>
                      )}
                    </div>
                  </motion.div>

                  {/* تلفن */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md"
                    whileHover={{ x: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {renderIcon(contactData.contactInfo.phone.icon, 'text-primary w-5 h-5')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                        {contactData.contactInfo.phone.label}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{contactData.contactInfo.phone.value}</p>
                    </div>
                  </motion.div>

                  {/* ایمیل */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md"
                    whileHover={{ x: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {renderIcon(contactData.contactInfo.email.icon, 'text-primary w-5 h-5')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                        {contactData.contactInfo.email.label}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{contactData.contactInfo.email.value}</p>
                    </div>
                  </motion.div>

                  {/* ساعات کاری */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start gap-4 group p-3 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md"
                    whileHover={{ x: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {renderIcon(contactData.contactInfo.workingHours.icon, 'text-primary w-5 h-5')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                        {contactData.contactInfo.workingHours.label}
                      </h3>
                      {Array.isArray(contactData.contactInfo.workingHours.value) ? (
                        <div className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                          {contactData.contactInfo.workingHours.value.map((line, idx) => (
                            <p key={idx}>{line}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{contactData.contactInfo.workingHours.value}</p>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Social Media */}
                <div className="mt-6 border-t border-slate-200 pt-6 dark:border-white/10">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">ما را دنبال کنید</h3>
                  <div className="flex gap-3 flex-wrap">
                    {contactData.socialMedia.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600 transition-all duration-300 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 ${
                          socialColorMap[social.color] || 'hover:bg-primary hover:border-primary'
                        }`}
                        aria-label={social.name}
                      >
                        {renderIcon(social.icon, 'w-4 h-4')}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="relative mt-6 bg-gray-200 rounded-xl h-48 overflow-hidden">
                  <img
                    src={contactData.mapImage}
                    alt="نقشه موقعیت"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Form - Right Side */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c1a2c] md:p-10">
                <div className="mb-8">
                  <h2 className="mb-2 text-3xl font-bold text-slate-950 dark:text-white">{contactData.form.title}</h2>
                  <p className="text-slate-600 dark:text-slate-300">{contactData.form.description}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                        {contactData.form.fields.full_name.label}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          onBlur={() => handleBlur('full_name')}
                          placeholder={contactData.form.fields.full_name.placeholder}
                          className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            getFieldError('full_name') ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white'
                          }`}
                        />
                      </div>
                      {getFieldError('full_name') && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {getFieldError('full_name')}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                        {contactData.form.fields.email.label}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <AtSign className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          placeholder={contactData.form.fields.email.placeholder}
                          className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            getFieldError('email') ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white'
                          }`}
                        />
                      </div>
                      {getFieldError('email') && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {getFieldError('email')}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                        {contactData.form.fields.phone.label}
                        <span className="text-red-500 mr-1">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur('phone')}
                          placeholder={contactData.form.fields.phone.placeholder}
                          className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                            getFieldError('phone') ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white'
                          }`}
                        />
                      </div>
                      {getFieldError('phone') && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {getFieldError('phone')}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                        {contactData.form.fields.subject.label}
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">{contactData.form.fields.subject.placeholder}</option>
                        {contactData.form.fields.subject.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-200">
                      {contactData.form.fields.message.label}
                      <span className="text-red-500 mr-1">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur('message')}
                        placeholder={contactData.form.fields.message.placeholder}
                        className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                          getFieldError('message') ? 'border-red-500 ring-2 ring-red-200' : 'border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      {getFieldError('message') && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {getFieldError('message')}
                        </motion.p>
                      )}
                      <span className="text-gray-400 text-sm mr-auto">
                        {formData.message.length}/۵۰۰
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium text-lg hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {contactData.form.loadingButton}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {contactData.form.submitButton}
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                    با ارسال این فرم، اطلاعات شما برای پاسخگویی ذخیره می‌شود
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageFrame>
  );
}