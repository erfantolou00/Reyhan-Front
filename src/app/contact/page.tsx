"use client";

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = 'نام و نام خانوادگی الزامی است';
    if (!formData.email.trim()) newErrors.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'ایمیل نامعتبر است';

    if (!formData.phone.trim()) newErrors.phone = 'شماره تماس الزامی است';
    else if (!/^[0-9]{11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'شماره تماس باید ۱۱ رقم باشد';
    }

    if (!formData.message.trim()) newErrors.message = 'پیام الزامی است';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'خطا در ارسال پیام');

      toast.success(data.message || 'پیام شما با موفقیت ارسال شد');
      
      // پاک کردن فرم
      setFormData({ full_name: '', email: '', phone: '', message: '' });
      setErrors({});

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-white pt-32 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تماس با ما</h1>
            <p className="text-xl text-gray-600">برای دریافت مشاوره و اطلاعات بیشتر با ما در تماس باشید</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* فرم تماس */}
            <div>
              <h2 className="text-3xl font-bold mb-8">ارسال پیام</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ایمیل</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">پیام شما</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full py-4 text-lg font-medium disabled:opacity-70"
                >
                  {isLoading ? 'در حال ارسال...' : 'ارسال پیام'}
                </button>
              </form>
            </div>

            {/* اطلاعات تماس */}
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
                    <p className="text-gray-600">sdkomeylian@gmail.com</p>
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
                <div className="relative mt-8 bg-gray-200 rounded-lg h-64 overflow-hidden">
                  <Image
                    src="/images/contact/1.png"
                    alt="map"
                    className='w-full h-full object-cover'
                    fill
                    priority
                  />
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}