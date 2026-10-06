import { ReactNode } from 'react';
import LandingBackdrop from '@/components/home/LandingBackdrop';
import SoftGlow from '@/components/home/SoftGlow';

export default function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-screen text-slate-950 dark:text-white">
      <LandingBackdrop />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  before,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  before?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-32 pb-8">
      <SoftGlow className="top-20 left-[8%]" delay="-2s" />
      <SoftGlow tone="blue" className="left-[58%] top-full -mt-48" delay="-8s" />
      <div className="container relative z-20 mx-auto px-4 text-center">
        {before}
        {eyebrow ? (
          <p className="inline-flex rounded-full border border-primary/30 bg-white px-3 py-1 text-sm font-semibold text-primary dark:border-primary/40 dark:bg-primary/10">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
