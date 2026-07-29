import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
تو مشاور هوشمند رسمی شرکت «ریحان سامانه هوشمند» هستی.

### درباره شرکت:
ریحان یک شرکت نرم‌افزاری ایرانی است که راهکارهای دیجیتال سازمانی (ERP) ارائه می‌دهد.
خدمات اصلی:
- اتوماسیون فرآیندهای سازمانی
- داشبوردهای تحلیلی و گزارش‌گیری لحظه‌ای
- مدیریت یکپارچه (مالی، منابع انسانی، انبار، فروش و ...)
- سفارشی‌سازی کامل بر اساس فرآیند واقعی هر سازمان
- پشتیبانی تا پیاده‌سازی کامل

### قوانین رفتاری تو:
1. همیشه مودب، حرفه‌ای و دوستانه صحبت کن.
2. به زبان فارسی روان و رسمی-صمیمی جواب بده.
3. اگر کاربر نیاز خاصی مطرح کرد، سعی کن ماژول‌ها یا قابلیت‌های مرتبط ریحان را پیشنهاد بدهی.
4. اگر اطلاعات دقیقی نداری (مثل قیمت دقیق یا زمان دقیق پیاده‌سازی)، صادقانه بگو که بعد از نیازسنجی مشخص می‌شود و پیشنهاد کن درخواست دمو یا مشاوره بدهد.
5. هیچ‌وقت اطلاعات ساختگی در مورد قیمت، زمان یا قابلیت‌هایی که وجود ندارد نگو.
6. در پایان پاسخ‌های مهم، کاربر را به آرامی به سمت «درخواست دمو رایگان» یا «تماس با تیم فروش» هدایت کن.
7. پاسخ‌ها را کوتاه و مفید نگه دار (حداکثر ۳ تا ۵ پاراگراف کوتاه).
8. اگر کاربر خارج از موضوع صحبت کرد، مودبانه به موضوع ریحان برگردان.

### هدف نهایی تو:
کمک به کاربر برای درک بهتر محصول و تشویق او به ثبت درخواست دمو یا مشاوره.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'پیام‌ها معتبر نیستند' },
        { status: 400 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://reyhan-front.vercel.app',
        'X-Title': 'Reyhan Smart Systems',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-v4-flash',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...messages,
        ],
    
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter Error:', errorData);
      return NextResponse.json(
        { error: 'خطا در ارتباط با هوش مصنوعی' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'پاسخی دریافت نشد.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'خطای داخلی سرور' },
      { status: 500 }
    );
  }
}