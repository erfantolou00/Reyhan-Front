import { SpeedInsights } from '@vercel/speed-insights/next';
import Hero from '@/components/hero/Hero';
import HomeDeferred from '@/components/home/HomeDeferred';
import LandingBackdrop from '@/components/home/LandingBackdrop';

export default function Home() {
  return (
    <main className="relative isolate text-slate-950 dark:text-white">
      <LandingBackdrop />
      <section id="hero">
        <Hero />
      </section>
      <HomeDeferred />
      <SpeedInsights />
    </main>
  );
}
