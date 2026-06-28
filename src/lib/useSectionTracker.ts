import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Section } from './sections';

export function useSectionTracker(sections: Section[], offset = 90) {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const getScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return 0;
    return Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
  }, []);

  const computeActiveSection = useCallback(() => {
    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    let closestSection = sectionIds[0] ?? '';
    let minDistance = Infinity;

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const sectionMiddle = window.scrollY + rect.top + rect.height / 2;
      const distance = Math.abs(sectionMiddle - viewportMiddle);

      if (distance < minDistance) {
        minDistance = distance;
        closestSection = sectionId;
      }
    });

    return closestSection;
  }, [sectionIds]);

  const trackScroll = useCallback(() => {
    setActiveSection(computeActiveSection());
    setScrollProgress(getScrollProgress());
    setIsScrolled(window.scrollY > 28);
  }, [computeActiveSection, getScrollProgress]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    trackScroll();
    const handleScroll = () => window.requestAnimationFrame(trackScroll);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScroll]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const targetTop = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    },
    [offset]
  );

  return {
    activeSection,
    scrollProgress,
    isScrolled,
    scrollToSection,
  };
}
