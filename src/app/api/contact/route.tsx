import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { full_name, email, phone, message } = await request.json();

    // اعتبارسنجی ساده
    if (!full_name || !email || !message) {
      return NextResponse.json({ error: 'فیلدهای الزامی را پر کنید' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        { 
          full_name, 
          email, 
          phone, 
          message 
        }
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'خطا در ذخیره پیام' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.' 
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}