import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message } = body

    // بررسی اینکه فیلدها وجود دارن یا نه
    if (!name || !message) {
      return NextResponse.json(
        { error: 'نام و پیام الزامی است' },
        { status: 400 }
      )
    }

    // اینجا مثلا می‌تونی ذخیره کنی تو دیتابیس یا فایل یا حافظه

    return NextResponse.json({
      status: 'success',
      message: `پیام از ${name} دریافت شد`,
      data: { name, message },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در پردازش درخواست' },
      { status: 500 }
    )
  }
}
