'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  Briefcase,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import aboutData from './about.json';
import { getIcon } from '@/helper/renderIcon';

export default function About() {
  const [shouldLoadGif, setShouldLoadGif] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadGif(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // تابع برای دریافت آیکون از نام
  const getIconComponent = (iconName: string, className: string = "w-5 h-5") => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  // تابع برای دریافت محتوای تب‌ها
  const renderTabContent = (tab: string) => {
    switch(tab) {
      case 'story':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4">{aboutData.story.title}</h2>
            {aboutData.story.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>
        );
      case 'mission':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4">{aboutData.mission.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {aboutData.mission.description}
            </p>
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <h4 className="font-semibold text-primary mb-2">چشم‌انداز</h4>
              <p className="text-gray-600">{aboutData.mission.vision}</p>
            </div>
          </motion.div>
        );
      case 'values':
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4">💎 ارزش‌های ما</h2>
            <div className="space-y-4">
              {aboutData.values.map((value, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-1">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{aboutData.hero.badge}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              {aboutData.hero.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            >
              {aboutData.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-2 text-white/70 text-sm">
                <span>کشف کنید</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {aboutData.companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-center text-primary mb-2">
                  {getIconComponent(stat.icon)}
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info with Tabs */}
      <section className="py-20" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -30 }
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
                {['story', 'mission', 'values'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab 
                        ? 'bg-white shadow-md text-primary' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab === 'story' && 'داستان ما'}
                    {tab === 'mission' && 'ماموریت'}
                    {tab === 'values' && 'ارزش‌ها'}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {renderTabContent(activeTab)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 30 }
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  اطلاعات شرکت
                </h3>
                <div className="space-y-4">
                  {aboutData.companyInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors">
                      <div className="mt-1 text-primary">
                        {getIconComponent(item.icon, "w-5 h-5 text-primary")}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{item.label}</div>
                        <div className="font-medium text-gray-800">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">👥 تیم متخصص ما</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تیم ما متشکل از متخصصان با تجربه در حوزه فناوری اطلاعات و مدیریت است
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {aboutData.teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 }
                }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {shouldLoadGif ? (
                      <Image 
                        src={member.image} 
                        alt={member.role} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {getIconComponent(member.icon, "w-6 h-6 text-primary")}
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                    {member.role}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">{aboutData.cta.title}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {aboutData.cta.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
                {aboutData.cta.primaryButton}
              </button>
              <button className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-xl hover:bg-primary/5 transition-colors">
                {aboutData.cta.secondaryButton}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}