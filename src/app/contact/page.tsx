"use client";

import Image from 'next/image';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  User,
  AtSign,
  MessageSquare,
  Loader2
} from 'lucide-react';
import contactData from './contact.json';

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

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

    // Mark all fields as touched
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

      toast.success(data.message || contactData.successMessage);
      
      // Reset form
      setFormData({ full_name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setTouchedFields(new Set());

    } catch (error: any) {
      toast.error(error.message || contactData.errorMessage);
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

  const contactItems = [
    { key: 'address', icon: MapPin, data: contactData.address },
    { key: 'phone', icon: Phone, data: contactData.phone },
    { key: 'email', icon: Mail, data: contactData.email },
    { key: 'workingHours', icon: Clock, data: contactData.workingHours },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <section className="relative bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Send className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">ارتباط با ما</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              تماس با <span className="text-yellow-300">ریحان</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              {contactData.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -30 }
              }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-primary">📞</span>
                  {contactData.title}
                </h2>
                
                <div className="space-y-6">
                  {contactItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={controls}
                        variants={{
                          visible: { opacity: 1, y: 0 },
                          hidden: { opacity: 0, y: 10 }
                        }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {item.data.label}
                          </h3>
                          {Array.isArray(item.data.value) ? (
                            <div className="text-gray-600 text-sm mt-1">
                              {item.data.value.map((line, idx) => (
                                <p key={idx}>{line}</p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-600 text-sm mt-1">{item.data.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">ما را دنبال کنید</h3>
                  <div className="flex gap-3">
                    {contactData.socialMedia.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -4 }}
                        className="p-3 bg-gray-100 rounded-full hover:bg-primary/10 transition-colors group"
                      >
                        <span className="text-gray-600 group-hover:text-primary transition-colors">
                          {social.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="relative mt-6 bg-gray-200 rounded-xl h-48 overflow-hidden">
                  <Image
                    src={contactData.mapImage}
                    alt="نقشه موقعیت"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 30 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">{contactData.form.title}</h2>
                  <p className="text-gray-600">{contactData.form.description}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
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
                            getFieldError('full_name') ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
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
                      <label className="block text-sm font-medium mb-2 text-gray-700">
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
                            getFieldError('email') ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
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
                      <label className="block text-sm font-medium mb-2 text-gray-700">
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
                            getFieldError('phone') ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
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
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        {contactData.form.fields.subject.label}
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">موضوع را انتخاب کنید</option>
                        <option value="مشاوره">مشاوره</option>
                        <option value="پشتیبانی">پشتیبانی</option>
                        <option value="همکاری">همکاری</option>
                        <option value="سایر">سایر</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
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
                          getFieldError('message') ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
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

                  <p className="text-center text-sm text-gray-500">
                    با ارسال این فرم، اطلاعات شما برای پاسخگویی ذخیره می‌شود
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Toast Customization */}
      <style jsx global>{`
        .toast-success {
          background: #10b981 !important;
          color: white !important;
        }
        .toast-error {
          background: #ef4444 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}