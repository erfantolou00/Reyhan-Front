'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const testimonials = [
  {
    name: 'سارا محمدی',
    role: 'مدیر فناوری اطلاعات، شرکت فناوران نوین',
    image: 'images/testimonials/1.png',
    quote:
      'این نرم‌افزار سازمانی نحوه مدیریت عملیات ما را متحول کرده است. فقط قابلیت‌های اتوماسیون آن، ساعت‌های بی‌شماری از وقت ما را صرفه‌جویی کرده است.',
    rating: 5,
  },
  {
    name: 'محمد رضایی',
    role: 'مدیر عملیات، راهکارهای جهانی',
    image: 'images/testimonials/2.png',
    quote:
      'قابلیت‌های تحلیلی فوق‌العاده است. حالا می‌توانیم با اطمینان خاطر، تصمیمات مبتنی بر داده بگیریم که منجر به نتایج بهتر کسب و کار می‌شود.',
    rating: 5,
  },
  {
    name: 'الهام کریمی',
    role: 'مدیرعامل، نوآوری‌های پیشرو',
    image: 'images/testimonials/3.png',
    quote:
      'تیم پشتیبانی مشتریان استثنایی است. آنها نقش کلیدی در پیاده‌سازی موفق و بهینه‌سازی مستمر ما داشته‌اند.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="relative py-24 bg-primary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            مورد اعتماد رهبران صنعت
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ببینید مشتریان ما درباره تجربه‌شان با راهکار نرم‌افزاری سازمانی ما چه می‌گویند
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                activeTestimonial === index
                  ? 'bg-white shadow-xl scale-105'
                  : 'bg-[#F3F4F6] hover:bg-white hover:shadow-lg'
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#F97316] text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {[
              'شرکت فناوران نوین',
              'راهکارهای جهانی',
              'نوآوری‌های پیشرو',
              'گروه صنعتی پیشگام'
            ].map((company) => (
              <div
                key={company}
                className="text-2xl font-bold text-gray-400"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 