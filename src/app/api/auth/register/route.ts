import { NextRequest, NextResponse } from 'next/server';

// در حالت واقعی این Map رو با دیتابیس جایگزین کن
const usersStore = new Map<string, { name: string; password: string }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, name, password } = body;

    if (!identifier || !name || !password) {
      return NextResponse.json(
        { message: 'همه فیلدها الزامی هستند' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' },
        { status: 400 }
      );
    }

    // چک کردن وجود کاربر
    if (usersStore.has(cleanIdentifier)) {
      return NextResponse.json(
        { message: 'این شماره/ایمیل قبلاً ثبت‌نام کرده است' },
        { status: 409 }
      );
    }

    // ذخیره کاربر (در حالت واقعی: hash کردن پسورد + ذخیره در دیتابیس)
    usersStore.set(cleanIdentifier, {
      name: name.trim(),
      password, // ⚠️ در پروداکشن حتماً hash کن (مثلاً با bcrypt)
    });

    console.log(`[Register] کاربر جدید: ${cleanIdentifier} - ${name}`);

    return NextResponse.json({
      success: true,
      message: 'ثبت‌نام با موفقیت انجام شد',
      user: {
        identifier: cleanIdentifier,
        name: name.trim(),
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'خطا در ثبت‌نام' },
      { status: 500 }
    );
  }
}

// برای استفاده در login
export function getUser(identifier: string) {
  return usersStore.get(identifier.trim().toLowerCase());
}