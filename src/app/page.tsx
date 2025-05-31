"use client";

import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import SectionDivider from '@/components/SectionDivider';
import ProductShowcase from '@/components/ProductShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import FloatingNavbar from '@/components/FloatingNavbar';
import VerticalTimeline from '@/components/VerticalTimeline';

const sections = [
  { id: 'hero', label: 'صفحه اصلی', icon: '🏠' },
  { id: 'benefits', label: 'مزایا', icon: '✨' },
  { id: 'features', label: 'ویژگی‌ها', icon: '🚀' },
  { id: 'testimonials', label: 'نظرات', icon: '💬' },
  { id: 'contact', label: 'تماس', icon: '📞' },
];

export default function Home() {
  return (
    <main className="relative">
      <FloatingNavbar />
      <VerticalTimeline sections={sections} />
      <section id="hero">
        <Hero />
      </section>
      <SectionDivider />
      <section id="benefits">
        <BenefitsSection />
      </section>
      <SectionDivider />
      <section id="features">
        <ProductShowcase />
      </section>
      <SectionDivider />
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <SectionDivider />
      <section id="contact">
        <CTASection />
      </section>
      {/* Additional sections will be added here */}
    </main>
  );
}
