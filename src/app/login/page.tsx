'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Phone,
  Mail,
  Lock,
  KeyRound,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import DemoCaptcha from '@/components/RecaptchaV2';
import RecaptchaV2 from '@/components/RecaptchaV2';

type Step = 'identifier' | 'register' | 'otp' | 'password';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const API_BASE = process.env.NEXT_PUBLIC_DEFAULT_GATEWAY_URL || 'http://reyhansmart.ir:5020';
  
  const [step, setStep] = useState<Step>('identifier');
  const [identifier, setIdentifier] = useState(''); // email یا موبایل
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const isPhone = (val: string) => /^09\d{9}$/.test(val.replace(/\s/g, ''));
  const isEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // مرحله ۱: بررسی وجود کاربر
  const handleCheckUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const value = identifier.trim();

    if (!isPhone(value) && !isEmail(value)) {
      setError('شماره موبایل (09xxxxxxxxx) یا ایمیل معتبر وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/check`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: value, recaptchaToken: recaptchaToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'خطا در بررسی کاربر');
        return;
      }

      // منطق دمو (برای تست بدون بک‌اند)
      // اگر شماره 09000000000 یا ایمیل new@test.com باشه → کاربر جدید
      const isNew = value === '09000000000' || value === 'new@test.com';
      const userExists = data.exists ?? !isNew;

      setIsExistingUser(userExists);

      if (userExists) {
        // ارسال OTP
        const otpRes = await fetch(`${API_BASE}/send-o`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: value }),
        });

        const otpData = await otpRes.json();

        if (!otpRes.ok) {
          setError(otpData.message || 'خطا در ارسال کد تایید');
          return;
        }

        setStep('otp');
      } else {
        setStep('register');
      }
    } catch {
      setError('خطا در ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  // ثبت‌نام (نام + پسورد)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('رمز عبور حداقل ۶ کاراکتر باشد');
      return;
    }
    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن یکسان نیستند');
      return;
    }
    if (!name.trim()) {
      setError('نام خود را وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          name: name.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'خطا در ثبت‌نام');
        return;
      }

      // بعد از ثبت‌نام موفق → ارسال OTP و رفتن به مرحله تایید
      setIsExistingUser(false);

      // ارسال OTP
      await fetch(`${API_BASE}/send-o`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      setStep('otp');
    } catch {
      setError('خطا در ثبت‌نام');
    } finally {
      setIsLoading(false);
    }
  };

  // تایید OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length < 4) {
      setError('کد تایید را کامل وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/verify-o`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          otp,
        }),
      });

      const data = await res.json();

      // دمو: کد 1234 قبول می‌شه (حتی اگر API جواب نده)
      if (otp !== '1234' && !res.ok) {
        setError(data.message || 'کد تایید نامعتبر است (دمو: 1234)');
        setIsLoading(false);
        return;
      }

      // اگر API موفق بود یا دمو قبول شد
      login({
        name: name.trim() || identifier.split('@')[0] || 'کاربر ریحان',
        emailOrPhone: identifier,
      });

      router.push('/');
    } catch {
      // در حالت دمو حتی اگر fetch fail بشه با کد 1234 قبول کنه
      if (otp === '1234') {
        login({
          name: name.trim() || identifier.split('@')[0] || 'کاربر ریحان',
          emailOrPhone: identifier,
        });
        router.push('/');
      } else {
        setError('خطا در تایید کد');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ورود با رمز عبور
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('رمز عبور را وارد کنید');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'رمز عبور اشتباه است');
        return;
      }

      login({
        name: data.user?.name || identifier.split('@')[0] || 'کاربر ریحان',
        emailOrPhone: identifier,
      });

      router.push('/');
    } catch {
      setError('رمز عبور اشتباه است');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setError('');
    setPassword('');
    setConfirmPassword('');
    setRecaptchaToken(null);
    setOtp('');
    if (step === 'password') setStep('otp');
    else setStep('identifier');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/5 px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ورود به ریحان
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {step === 'identifier' && 'شماره موبایل یا ایمیل خود را وارد کنید'}
            {step === 'register' && 'حساب جدید بسازید'}
            {step === 'otp' && 'کد تایید ارسال‌شده را وارد کنید'}
            {step === 'password' && 'با رمز عبور وارد شوید'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* مرحله ۱: شناسه */}
            {step === 'identifier' && (
              <motion.form
                key="identifier"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleCheckUser}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    موبایل یا ایمیل
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {identifier.includes('@') ? (
                        <Mail size={18} />
                      ) : (
                        <Phone size={18} />
                      )}
                    </span>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="09xxxxxxxxx یا email@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                      dir="ltr"
                    />
                  </div>
                  {/* کپچا دمو */}
                  <RecaptchaV2
                    onChange={setRecaptchaToken}
                    className="mt-2"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !identifier.trim() || !recaptchaToken}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 text-sm font-medium text-white disabled:opacity-50 hover:opacity-90 transition"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      ادامه
                      <ArrowRight size={16} className="rotate-180" />
                    </>
                  )}
                </button>
              </motion.form>
            )}

            {/* مرحله ثبت‌نام */}
            {step === 'register' && (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRegister}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً علی محمدی"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    رمز عبور
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="حداقل ۶ کاراکتر"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-10 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    تکرار رمز عبور
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="تکرار رمز عبور"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                      dir="ltr"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    'ثبت‌نام و دریافت کد'
                  )}
                </button>

                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-sm text-gray-500 hover:text-primary"
                >
                  بازگشت
                </button>
              </motion.form>
            )}

            {/* مرحله OTP */}
            {step === 'otp' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
                className="space-y-4"
              >
                <p className="text-sm text-gray-500 text-center">
                  کد تایید به{' '}
                  <span className="font-medium text-gray-800" dir="ltr">
                    {identifier}
                  </span>{' '}
                  ارسال شد
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    کد تایید
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <KeyRound size={18} />
                    </span>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                      placeholder="____"
                      maxLength={6}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-3 text-center text-lg tracking-[0.5em] outline-none focus:border-primary focus:bg-white transition"
                      dir="ltr"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 text-center">
                    دمو: کد ۱۲۳۴
                  </p>
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || otp.length < 4}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    'تایید و ورود'
                  )}
                </button>

                {isExistingUser && (
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setStep('password');
                    }}
                    className="w-full text-sm text-secondary hover:underline"
                  >
                    ورود با رمز عبور
                  </button>
                )}

                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-sm text-gray-500 hover:text-primary"
                >
                  بازگشت
                </button>
              </motion.form>
            )}

            {/* ورود با رمز */}
            {step === 'password' && (
              <motion.form
                key="password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePasswordLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    رمز عبور
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={18} />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="رمز عبور خود را وارد کنید"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-10 py-3 text-sm outline-none focus:border-primary focus:bg-white transition"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    'ورود'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="w-full text-sm text-secondary hover:underline"
                >
                  ورود با کد تایید
                </button>

                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-sm text-gray-500 hover:text-primary"
                >
                  بازگشت
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href="/" className="hover:text-primary transition">
            بازگشت به صفحه اصلی
          </Link>
        </p>
      </motion.div>
    </div>
  );
}