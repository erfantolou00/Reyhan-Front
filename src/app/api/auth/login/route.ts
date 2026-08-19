import { NextRequest, NextResponse } from 'next/server';

// این Map باید با همان Map موجود در register مشترک باشه
const usersStore = new Map<string, { name: string; password: string }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { message: 'شناسه و رمز عبور الزامی هستند' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    const user = usersStore.get(cleanIdentifier);

    if (!user) {
      return NextResponse.json(
        { message: 'کاربری با این مشخصات یافت نشد' },
        { status: 404 }
      );
    }

    // در حالت واقعی: مقایسه hash شده
    if (user.password !== password) {
      return NextResponse.json(
        { message: 'رمز عبور اشتباه است' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'ورود موفقیت‌آمیز بود',
      user: {
        identifier: cleanIdentifier,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'خطا در ورود' },
      { status: 500 }
    );
  }
}