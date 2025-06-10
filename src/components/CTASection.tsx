'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { name, email, company });
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-[#F3F4F6] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F97316] rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2563EB] rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            آماده تحول در کسب و کار خود هستید؟
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            به صدها شرکت موفق بپیوندید که با راهکار نرم‌افزاری ما، عملیات خود را ارتقا داده‌اند
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Demo Request Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-tl from-primary/10 to-gray-50 rounded-2xl p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2563EB]/5 rounded-full -ml-16 -mb-16" />
              
              <h3 className="text-2xl font-semibold mb-6 relative">درخواست دمو رایگان</h3>
              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام و نام خانوادگی"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="نام شرکت"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">شروع دمو رایگان</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </form>
            </motion.div>

            {/* Digital Business Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-primary/10 to-gray-50 rounded-2xl p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2563EB]/5 rounded-full -ml-16 -mb-16" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    <Image src="/logo.png" alt="Logo" width={84} height={84} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">راهکارهای هوشمند</h3>
                    <p className="text-gray-600">راهکارهای نرم‌افزاری سازمانی</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center">
                      <FiPhone className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <a href="tel:02333605000" className=" gap-2 hover:text-[#F97316] transition-colors">
                      <p className="font-medium">۰۲۳-۳۳۶۰۵۰۰۰

</p>
                    </a>
                  </div>


                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                      <FiMail className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <a href="mailto:saeed@komeylian.com" className=" gap-2 hover:text-[#F97316] transition-colors">
                      <p className="font-medium">saeed@komeylian.com</p>
                    </a>
                  </div>

                  

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                      <FiMapPin className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <a href="https://maps.app.goo.gl/V4oJJXW8rTVu2WDv5" target="_blank" rel="noopener noreferrer" className=" gap-2 hover:text-[#F97316] transition-colors">
                      <p className="font-medium">پارک علم و فناوری دانشگاه سمنان</p>
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center hover:bg-[#F97316]/20 transition-colors">
                      <FiLinkedin className="w-5 h-5 text-[#F97316]" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#2563EB]/10 flex items-center justify-center hover:bg-[#2563EB]/20 transition-colors">
                      <FiInstagram className="w-5 h-5 text-[#2563EB]" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center hover:bg-[#F97316]/20 transition-colors">
                      <FiTwitter className="w-5 h-5 text-[#F97316]" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 