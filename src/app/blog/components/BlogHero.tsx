import { BlogData } from '@/types';
import { PageHero } from '@/components/home/PageFrame';

export default function BlogHero({ hero }: { hero: BlogData['hero'] }) {
  return (
    <PageHero eyebrow={hero.badge} title={hero.title} subtitle={hero.subtitle}>
      <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
        {[
          { value: hero.stats.posts, label: 'مقاله' },
          { value: hero.stats.readingTime, label: 'زمان مطالعه' },
          { value: hero.stats.authors, label: 'نویسنده' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-3 dark:border-white/10 dark:bg-[#0c1a2c]"
          >
            <div className="text-2xl font-bold text-slate-950 dark:text-white">{item.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
          </div>
        ))}
      </div>
    </PageHero>
  );
}
