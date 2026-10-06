'use client'

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import aboutData from './about.json';
import { getIcon } from '@/helper/renderIcon';
import PageFrame, { PageHero } from '@/components/home/PageFrame';

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
            <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white">{aboutData.story.title}</h2>
            {aboutData.story.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
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
            <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white">{aboutData.mission.title}</h2>
            <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
              {aboutData.mission.description}
            </p>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h4 className="mb-2 font-semibold text-primary">چشم‌انداز</h4>
              <p className="text-slate-600 dark:text-slate-300">{aboutData.mission.vision}</p>
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
            <h2 className="mb-4 text-3xl font-bold text-slate-950 dark:text-white">ارزش‌های ما</h2>
            <div className="space-y-4">
              {aboutData.values.map((value, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0c1a2c]">
                  <h4 className="mb-1 font-semibold text-slate-800 dark:text-slate-100">{value.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
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
    <PageFrame>
      <PageHero
        eyebrow={aboutData.hero.badge}
        title={aboutData.hero.title}
        subtitle={aboutData.hero.subtitle}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {aboutData.companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-white/10 dark:bg-[#0c1a2c]"
              >
                <div className="flex justify-center text-primary mb-2">
                  {getIconComponent(stat.icon)}
                </div>
                <div className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
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
              <div className="mb-8 flex w-fit gap-2 rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#0c1a2c]">
                {['story', 'mission', 'values'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab 
                        ? 'bg-primary text-white' 
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
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
              <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c1a2c]">
                <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-950 dark:text-white">
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
                        <div className="text-sm text-slate-500 dark:text-slate-400">{item.label}</div>
                        <div className="font-medium text-slate-800 dark:text-slate-100">{item.value}</div>
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
      <section className="py-20">
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
            <h2 className="mb-4 text-4xl font-bold text-slate-950 dark:text-white">تیم متخصص ما</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
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
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0c1a2c]"
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
                  <h3 className="mb-2 text-xl font-bold text-slate-800 dark:text-slate-100">{member.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
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
            <h3 className="mb-4 text-2xl font-bold text-slate-950 dark:text-white">{aboutData.cta.title}</h3>
            <p className="mx-auto mb-6 max-w-2xl text-slate-600 dark:text-slate-300">
              {aboutData.cta.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="rounded-full bg-primary px-8 py-3 text-white transition-colors hover:bg-primary-dark">
                {aboutData.cta.primaryButton}
              </button>
              <button className="rounded-full border border-secondary/30 bg-white px-8 py-3 text-secondary transition-colors hover:bg-secondary hover:text-white dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                {aboutData.cta.secondaryButton}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageFrame>
  )
}