"use client";
import { SpeedInsights } from '@vercel/speed-insights/next';
import BenefitsSection from '@/components/BenefitsSection';
import SectionDivider from '@/components/SectionDivider';
import ProductShowcase from '@/components/ProductShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import FloatingNavbar from '@/components/FloatingNavbar';
import VerticalTimeline from '@/components/VerticalTimeline';
import { pageSections } from '@/lib/sections';

import { getGatewayUrl } from '@/helper/FindOut_WhereWeAre'
import { useEffect, useState } from 'react';
import Hero from '@/components/hero/Hero';
export default function Home() {
  
  const [gatewayUrl, setGatewayUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUrl = async () => {
      try {
        const url = await getGatewayUrl();
        if (isMounted) {
          setGatewayUrl(url);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUrl();

    return () => {
      isMounted = false; // جلوگیری از setState بعد از unmount
    };
  }, []);

  return (
    <main className="relative bg-white text-gray-900">
      <FloatingNavbar sections={pageSections} />
      <VerticalTimeline sections={pageSections} />

      <section id="hero">
        <Hero gatewayUrl={gatewayUrl} />
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
      <SpeedInsights />
    </main>
  );
}
