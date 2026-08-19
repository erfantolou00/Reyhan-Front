import { verifyRecaptcha } from '@/lib/verify-recaptcha';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, recaptchaToken } = body;

    // اعتبارسنجی کپچا
    if (!recaptchaToken) {
      return NextResponse.json(
        { message: 'لطفاً کپچا را تکمیل کنید' },
        { status: 400 }
      );
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { message: 'تأیید کپچا ناموفق بود. دوباره تلاش کنید' },
        { status: 400 }
      );
    }
 

    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json(
        { message: 'شناسه (موبایل یا ایمیل) الزامی است' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // اعتبارسنجی ساده
    const isPhone = /^09\d{9}$/.test(cleanIdentifier);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanIdentifier);

    if (!isPhone && !isEmail) {
      return NextResponse.json(
        { message: 'شماره موبایل یا ایمیل معتبر وارد کنید' },
        { status: 400 }
      );
    }

    // ============================================
    // منطق دمو (فعلاً بدون دیتابیس)
    // ============================================
    // اگر این دو مقدار باشه → کاربر جدید در نظر گرفته می‌شه
    const isNewUser =
      cleanIdentifier === '09000000000' ||
      cleanIdentifier === 'new@test.com';

    const exists = !isNewUser;

    // ============================================
    // بعداً این قسمت رو با دیتابیس واقعی جایگزین کن:
    // const user = await db.user.findUnique({ where: { identifier: cleanIdentifier } });
    // const exists = !!user;
    // ============================================

    return NextResponse.json({
      exists,
      identifier: cleanIdentifier,
      recaptchaToken: recaptchaToken,
    });
  } catch (error) {
    console.error('Check user error:', error);
    return NextResponse.json(
      { message: 'خطای سرور' },
      { status: 500 }
    );
  }
}