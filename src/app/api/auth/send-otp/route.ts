import { NextRequest, NextResponse } from 'next/server';

// در حالت واقعی این Map رو با Redis یا دیتابیس جایگزین کن
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier } = body;

    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json(
        { message: 'شناسه (موبایل یا ایمیل) الزامی است' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // ============================================
    // تولید کد OTP
    // ============================================
 

    // در حالت واقعی:
     const otpCode = Math.floor(1000 + Math.random() * 9000).toString(); // ۴ رقمی

    // ذخیره موقت OTP (۵ دقیقه اعتبار)
    otpStore.set(cleanIdentifier, {
      code: otpCode,
      expiresAt: Date.now() + 5 * 60 * 1000, // ۵ دقیقه
    });

    // ============================================
    // اینجا باید واقعاً پیامک یا ایمیل بفرستی
    // ============================================
    // مثال:
    // if (isPhone) {
    //   await sendSms(cleanIdentifier, `کد تایید ریحان: ${otpCode}`);
    // } else {
    //   await sendEmail(cleanIdentifier, `کد تایید شما: ${otpCode}`);
    // }

    console.log(`[OTP] برای ${cleanIdentifier} → کد: ${otpCode}`); // فقط برای توسعه

    return NextResponse.json({
      success: true,
      message: 'کد تایید ارسال شد',
      // فقط در محیط توسعه این فیلد رو برگردون (در پروداکشن حذف کن)
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpCode }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { message: 'خطا در ارسال کد تایید' },
      { status: 500 }
    );
  }
}

// این تابع رو بعداً در verify-otp استفاده می‌کنیم
export function getStoredOtp(identifier: string) {
  return otpStore.get(identifier.trim().toLowerCase());
}

export function deleteStoredOtp(identifier: string) {
  otpStore.delete(identifier.trim().toLowerCase());
}