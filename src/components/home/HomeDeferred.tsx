'use client';

import dynamic from 'next/dynamic';
import { pageSections } from '@/lib/sections';

function SectionFallback() {
  return <div className="min-h-[20rem]" aria-hidden />;
}

const FloatingNavbar = dynamic(() => import('@/components/FloatingNavbar'), { ssr: false });
const VerticalTimeline = dynamic(() => import('@/components/VerticalTimeline'), { ssr: false });
const BenefitsSection = dynamic(() => import('@/components/BenefitsSection'), {
  ssr: false,
  loading: SectionFallback,
});
const ProductShowcase = dynamic(() => import('@/components/ProductShowcase'), {
  ssr: false,
  loading: SectionFallback,
});
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), {
  ssr: false,
  loading: SectionFallback,
});
const CTASection = dynamic(() => import('@/components/CTASection'), {
  ssr: false,
  loading: SectionFallback,
});

export default function HomeDeferred() {
  return (
    <>
      <FloatingNavbar sections={pageSections} />
      <VerticalTimeline sections={pageSections} />

      <section id="benefits">
        <BenefitsSection />
      </section>
      <section id="features">
        <ProductShowcase />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="contact">
        <CTASection />
      </section>
    </>
  );
}
