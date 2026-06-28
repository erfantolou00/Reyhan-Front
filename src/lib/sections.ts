export interface Section {
  id: string;
  label: string;
  icon: string;
  preview?: string;
  description?: string;
}

export const pageSections: Section[] = [
  { id: 'hero', label: 'صفحه اصلی', icon: '🏠' },
  { id: 'benefits', label: 'مزایا', icon: '✨' },
  { id: 'features', label: 'ویژگی‌ها', icon: '🚀' },
  { id: 'testimonials', label: 'نظرات', icon: '💬' },
  { id: 'contact', label: 'تماس', icon: '📞' },
];
