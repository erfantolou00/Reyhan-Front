import { NextRequest, NextResponse } from 'next/server';

// این Map باید با همان Map موجود در send-otp مشترک باشه
// فعلاً برای سادگی دوباره تعریف شده (در حالت واقعی از Redis یا فایل مشترک استفاده کن)
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, otp } = body;

    if (!identifier || !otp) {
      return NextResponse.json(
        { message: 'شناسه و کد تایید الزامی هستند' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    // ============================================
    // منطق دمو: کد 1234 همیشه قبول می‌شه
    // ============================================
    if (cleanOtp === '1234') {
      // OTP رو پاک کن
      otpStore.delete(cleanIdentifier);

      return NextResponse.json({
        success: true,
        message: 'کد تایید صحیح است',
        user: {
          identifier: cleanIdentifier,
        },
      });
    }

    // چک کردن OTP ذخیره شده
    const stored = otpStore.get(cleanIdentifier);

    if (!stored) {
      return NextResponse.json(
        { message: 'کد تایید منقضی شده یا وجود ندارد. دوباره درخواست دهید' },
        { status: 400 }
      );
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(cleanIdentifier);
      return NextResponse.json(
        { message: 'کد تایید منقضی شده است' },
        { status: 400 }
      );
    }

    if (stored.code !== cleanOtp) {
      return NextResponse.json(
        { message: 'کد تایید اشتباه است' },
        { status: 400 }
      );
    }

    // OTP صحیح بود → پاک کردن
    otpStore.delete(cleanIdentifier);

    return NextResponse.json({
      success: true,
      message: 'کد تایید صحیح است',
      user: {
        identifier: cleanIdentifier,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { message: 'خطا در تایید کد' },
      { status: 500 }
    );
  }
}