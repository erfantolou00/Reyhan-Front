import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ایمیل و رمز عبور الزامی است' },
        { status: 400 }
      );
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'ایمیل یا رمز عبور اشتباه است' },
        { status: 401 }
      );
    }

    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('id, full_name, role, is_active')
      .eq('id', authData.user.id)
      .single();

    if (adminError || !admin) {
      await supabase.auth.signOut();

      return NextResponse.json(
        { error: 'دسترسی ادمین ندارید' },
        { status: 403 }
      );
    }

    if (!admin.is_active) {
      await supabase.auth.signOut();

      return NextResponse.json(
        { error: 'حساب ادمین غیرفعال است' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      user: authData.user,
      admin,
      message: 'ورود موفق',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'خطای داخلی سرور' },
      { status: 500 }
    );
  }
}
