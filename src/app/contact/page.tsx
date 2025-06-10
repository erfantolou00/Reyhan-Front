"use client";

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
  number: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  number?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    number: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'نام و نام خانوادگی الزامی است';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }
    
    if (!formData.number.trim()) {
      newErrors.number = 'شماره تماس الزامی است';
    } else if (!/^[0-9]{11}$/.test(formData.number.replace(/\D/g, ''))) {
      newErrors.number = 'شماره تماس باید ۱۱ رقم باشد';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'پیام الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendForm = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch('/api/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'خطا در ارسال پیام');
      }

      toast.success('پیام شما با موفقیت ارسال شد');
      setFormData({ name: '', email: '', message: '', number: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'خطا در ارسال پیام');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-white py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                تماس با ما
              </h1>
              <p className="text-xl text-gray-600">
                برای دریافت مشاوره و اطلاعات بیشتر با ما در تماس باشید
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">☎️ فرم تماس </h2>
                <form onSubmit={handleSendForm} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                      شماره تماس
                    </label>
                    <input
                      type="tel"
                      id="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    />
                    {errors.number && <p className="mt-1 text-sm text-red-500">{errors.number}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      پیام
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'در حال ارسال...' : 'ارسال پیام'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">📞 اطلاعات تماس</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">🏠 آدرس</h3>
                    <p className="text-gray-600">
                    پارک علم و فناوری دانشگاه سمنان                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">📞 تلفن</h3>
                    <p className="text-gray-600">۰۲۳-۳۳۶۰۵۰۰۰</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">📧 ایمیل</h3>
                    <p className="text-gray-600">saeed@komeylian.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">🕒 ساعات کاری</h3>
                    <p className="text-gray-600">
                      شنبه تا چهارشنبه: ۹ صبح تا ۵ عصر
                      <br />
                      پنجشنبه: ۹ صبح تا ۱ ظهر
                    </p>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <p className="text-gray-600">نقشه گوگل اینجا قرار خواهد گرفت</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 