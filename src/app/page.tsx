"use client";

import Hero from '@/components/Hero';
import BenefitsSection from '@/components/BenefitsSection';
import SectionDivider from '@/components/SectionDivider';
import ProductShowcase from '@/components/ProductShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import FloatingNavbar from '@/components/FloatingNavbar';
import VerticalTimeline from '@/components/VerticalTimeline';
import { pageSections } from '@/lib/sections';

export default function Home() {
  return (
    <main className="relative bg-white text-gray-900">
      <FloatingNavbar sections={pageSections} />
      <VerticalTimeline sections={pageSections} />

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
    </main>
  );
}
