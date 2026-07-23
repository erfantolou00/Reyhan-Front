// components/Hero.tsx
import Image from 'next/image';
import Typewriter from './Typewriter'; // اگر خیلی سنگین هست، بعداً optimize کن
import InteractiveCard from './InteractiveCard';
import HeroCardStack from './InteractiveCard';

const highlights = ['اتوماسیون فرآیندها', 'داشبورد تحلیلی', 'پشتیبانی تخصصی'];

const stats = [
  { value: '۵+', label: 'سازمان فعال' },
  { value: '۲۴/۷', label: 'پشتیبانی' },
  { value: '۹۸٪', label: 'رضایت مشتری' },
];

const Hero = () => {
  const handleDemo = () => {
    window.open('http://demo.reyhanehsoft.ir', '_blank');
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {/* Background Image بهینه‌شده با next/image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bgHero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Overlays (سبک‌تر) */}
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.48)_50%,rgba(0,0,0,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.12),transparent_40%)]" />

      <div className="container relative mx-auto flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Left Content - بدون motion سنگین */}
          <div className="max-w-3xl text-right">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              راهکار دیجیتال سازمانی
            </div>

            <h1 className="text-4xl font-black leading-[1.15] text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block">مدیریت هوشمند،</span>
              <span className="mt-3 pb-3 block bg-gradient-to-r from-primary to-slate-900 bg-clip-text text-transparent">
                برای رشد سریع‌تر
              </span>
            </h1>

            <div className="mt-6 min-h-[3.5rem] text-2xl font-semibold text-slate-800 sm:text-3xl">
              <Typewriter
                texts={[
                  'راهکار یکپارچه مدیریت سازمان',
                  'سفارشی‌سازی‌شده برای نیازهای شما',
                  'سریع، دقیق، قابل اعتماد',
                ]}
              />
            </div>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-800 sm:text-xl">
              ریحان، تمام فرایندهای سازمانی شما را در یک تجربه روان، شفاف و حرفه‌ای یکپارچه می‌کند.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-primary px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark">
                درخواست مشاوره
              </button>
              <button
                onClick={handleDemo}
                className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-lg font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                مشاهده دمو
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right Card - ساده‌تر */}
          <HeroCardStack />
        </div>
      </div>
    </section>
  );
};

export default Hero;