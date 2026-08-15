import { BlogData } from "@/types";
import { Sparkles } from "lucide-react";

export default function BlogHero({ hero }: { hero: BlogData['hero'] }) {
    return (
      <section className="relative bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/90 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
  
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{hero.badge}</span>
            </div>
  
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {hero.title}
            </h1>
  
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
  
            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{hero.stats.posts}</div>
                <div className="text-xs text-white/70">مقاله</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{hero.stats.readingTime}</div>
                <div className="text-xs text-white/70">زمان مطالعه</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl font-bold text-white">{hero.stats.authors}</div>
                <div className="text-xs text-white/70">نویسنده</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }