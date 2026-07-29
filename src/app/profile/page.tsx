'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Building2,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Save,
  Loader2,
  ArrowRight,
  CheckCircle2,
  UserIcon,
  Camera,
} from 'lucide-react';

const COMPANY_SIZES = [
  '۱ تا ۱۰ نفر',
  '۱۱ تا ۵۰ نفر',
  '۵۱ تا ۲۰۰ نفر',
  '۲۰۱ تا ۵۰۰ نفر',
  'بیش از ۵۰۰ نفر',
];

const INDUSTRIES = [
  'تولیدی',
  'بازرگانی',
  'خدماتی',
  'فناوری اطلاعات',
  'ساختمان و عمران',
  'درمانی و سلامت',
  'آموزشی',
  'سایر',
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateProfile, isLoading: authLoading } = useAuth();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyRole, setCompanyRole] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    setName(user.name || '');
    setEmail(user.email || (user.emailOrPhone?.includes('@') ? user.emailOrPhone : ''));
    setPhone(user.phone || (!user.emailOrPhone?.includes('@') ? user.emailOrPhone : ''));
    setCompanyName(user.companyName || '');
    setCompanyRole(user.companyRole || '');
    setCompanySize(user.companySize || '');
    setIndustry(user.industry || '');
    setCompanyAddress(user.companyAddress || '');
    setAvatar(user.avatar);
setAvatarPreview(user.avatar);
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!name.trim()) {
      setError('نام الزامی است');
      return;
    }

    setIsSaving(true);
    try {
      // TODO: ارسال به API
      // await fetch('/api/profile', { method: 'PUT', body: JSON.stringify({...}) });

      updateProfile({
        name: name.trim(),
        avatar, // اگر undefined باشد، آواتار پاک می‌شود
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        companyName: companyName.trim() || undefined,
        companyRole: companyRole.trim() || undefined,
        companySize: companySize || undefined,
        industry: industry || undefined,
        companyAddress: companyAddress.trim() || undefined,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('خطا در ذخیره اطلاعات');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      setError('فقط فایل تصویری مجاز است');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('حجم تصویر حداکثر ۲ مگابایت باشد');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setAvatar(result);
    };
    reader.readAsDataURL(file);
  };
  
  const removeAvatar = () => {
    setAvatar(undefined);
    setAvatarPreview(undefined);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* هدر صفحه */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                پروفایل من
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                اطلاعات شخصی و شرکت خود را تکمیل کنید
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition"
            >
              <ArrowRight size={16} className="rotate-180" />
              بازگشت
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* اطلاعات شخصی */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <User size={18} />
                </div>
                <h2 className="font-semibold text-gray-800">اطلاعات شخصی</h2>
              </div>

              <div className="space-y-4">
                {/* آواتار */}
<div className="flex flex-col items-center mb-6">
  <div className="relative group">
    <div className="flex h-24 w-24 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-white shadow-md">
      {avatarPreview ? (
        <img
          src={avatarPreview}
          alt="آواتار"
          className="h-full w-full object-cover"
        />
      ) : (
        <UserIcon size={36} className="text-gray-400" />
      )}
    </div>

    <label
      htmlFor="avatar-upload"
      className="absolute bottom-0 left-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary-dark transition"
      title="تغییر تصویر"
    >
      <Camera size={14} />
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
    </label>
  </div>

  <div className="flex items-center gap-3 mt-3">
    <label
      htmlFor="avatar-upload"
      className="text-sm text-primary cursor-pointer hover:underline"
    >
      انتخاب تصویر
    </label>
    {avatarPreview && (
      <button
        type="button"
        onClick={removeAvatar}
        className="text-sm text-red-500 hover:underline"
      >
        حذف تصویر
      </button>
    )}
  </div>
  <p className="text-xs text-gray-400 mt-1">حداکثر ۲ مگابایت · JPG, PNG</p>
</div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    نام و نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="نام کامل"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    این نام در هدر سایت نمایش داده می‌شود
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      ایمیل
                    </label>
                    <div className="relative">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      شماره موبایل
                    </label>
                    <div className="relative">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09xxxxxxxxx"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* اطلاعات شرکت */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Building2 size={18} />
                </div>
                <h2 className="font-semibold text-gray-800">اطلاعات شرکت</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    نام شرکت
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="نام سازمان یا شرکت"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      سمت شما
                    </label>
                    <div className="relative">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Briefcase size={16} />
                      </span>
                      <input
                        type="text"
                        value={companyRole}
                        onChange={(e) => setCompanyRole(e.target.value)}
                        placeholder="مثلاً مدیرعامل، مدیر IT"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      اندازه شرکت
                    </label>
                    <select
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                    >
                      <option value="">انتخاب کنید</option>
                      {COMPANY_SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    صنعت / حوزه فعالیت
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                  >
                    <option value="">انتخاب کنید</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    آدرس شرکت
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-gray-400">
                      <MapPin size={16} />
                    </span>
                    <textarea
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="آدرس کامل شرکت (اختیاری)"
                      rows={3}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* پیام‌ها و دکمه ذخیره */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-sm text-emerald-600"
              >
                <CheckCircle2 size={18} />
                اطلاعات با موفقیت ذخیره شد
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3.5 text-sm font-medium text-white shadow-md hover:opacity-90 disabled:opacity-50 transition"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  ذخیره تغییرات
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}