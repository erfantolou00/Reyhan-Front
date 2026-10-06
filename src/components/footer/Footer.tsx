'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getIcon } from '@/helper/renderIcon';
import { toast } from 'react-hot-toast';
import { useGatewayFetcher } from '@/hooks/useGatewayFetcher';
import { FooterData } from '@/types';
import SoftGlow from '@/components/home/SoftGlow';

const shell =
  'relative border-t border-slate-200 bg-[#f3f6fb] text-slate-950 dark:border-white/10 dark:bg-[#071422] dark:text-white';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';

  const { data: footerData, loading, error, refetch } = useGatewayFetcher<FooterData>('data/footer.json');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('لطفاً ایمیل خود را وارد کنید');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success(footerData?.newsletter.successMessage || 'با موفقیت ثبت شد');
        setEmail('');
      } else {
        toast.error(footerData?.newsletter.errorMessage || 'خطا در ثبت');
      }
    } catch {
      toast.error(footerData?.newsletter.errorMessage || 'خطا در ثبت');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName: string, className = 'h-5 w-5') => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className={className} /> : null;
  };

  if (loading) {
    return (
      <footer className={shell}>
        <div className="container mx-auto px-6 py-16 text-center text-slate-500 dark:text-slate-400">
          در حال بارگذاری فوتر...
        </div>
      </footer>
    );
  }

  if (error || !footerData) {
    return (
      <footer className={shell}>
        <div className="container mx-auto px-6 py-16 text-center">
          <p className="mb-4 text-red-500">خطا در دریافت اطلاعات فوتر</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full bg-primary px-5 py-2 text-sm text-white hover:bg-primary-dark"
          >
            تلاش مجدد
          </button>
        </div>
      </footer>
    );
  }

  const contactRows = [
    {
      icon: footerData.contactInfo.address.icon,
      label: footerData.contactInfo.address.label,
      value: footerData.contactInfo.address.value,
    },
    {
      icon: footerData.contactInfo.phone.icon,
      label: footerData.contactInfo.phone.description,
      value: footerData.contactInfo.phone.value,
    },
    {
      icon: footerData.contactInfo.email.icon,
      label: footerData.contactInfo.email.description,
      value: footerData.contactInfo.email.value,
    },
    {
      icon: footerData.contactInfo.workingHours.icon,
      label: footerData.contactInfo.workingHours.label,
      value: footerData.contactInfo.workingHours.value,
      note: footerData.contactInfo.workingHours.description,
    },
  ];

  return (
    <footer className={shell} dir="rtl">
      <SoftGlow className="left-[12%] top-0 -mt-48" delay="-4s" />
      <SoftGlow tone="blue" className="right-[8%] top-24" delay="-12s" />

      <div className="container relative z-20 mx-auto px-4 py-16 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src={footerData.brand.logo}
                alt={footerData.brand.name}
                width={56}
                height={56}
                className="rounded-2xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#0c1a2c]"
              />
              <div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">{footerData.brand.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{footerData.brand.tagline}</p>
              </div>
            </div>
            <p className="mt-2 inline-flex rounded-full border border-primary/30 bg-white px-3 py-1 text-xs font-semibold text-primary dark:border-primary/40 dark:bg-primary/10">
              {footerData.brand.badge}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
              {footerData.brand.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {footerData.socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary dark:border-white/10 dark:bg-[#0c1a2c] dark:text-slate-200"
                >
                  {renderIcon(social.icon, 'h-4 w-4')}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-slate-950 dark:text-white">دسترسی سریع</h4>
            <ul className="mt-4 space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-primary dark:text-slate-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h4 className="text-sm font-semibold text-slate-950 dark:text-white">ارتباط با ما</h4>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0c1a2c]"
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {renderIcon(row.icon, 'h-4 w-4')}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{row.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">{row.value}</p>
                  {row.note ? <p className="mt-1 text-xs text-slate-500">{row.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0c1a2c] lg:grid-cols-2">
          <div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-white">{footerData.newsletter.title}</h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{footerData.newsletter.description}</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={footerData.newsletter.placeholder}
              required
              className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-70"
            >
              {isSubmitting ? 'در حال ارسال...' : footerData.newsletter.button}
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {footerData.brand.name}. {footerData.footer.copyright}
            <span className="mr-3 text-xs">v{appVersion}</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              {renderIcon(footerData.footer.badge.icon, 'h-3.5 w-3.5')}
              {footerData.footer.badge.text}
            </span>
            {footerData.footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
