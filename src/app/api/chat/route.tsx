import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `
تو مشاور هوشمند رسمی شرکت «ریحان سامانه هوشمند» هستی.

### درباره شرکت:
ریحان یک شرکت نرم‌افزاری ایرانی است که راهکارهای دیجیتال سازمانی و ERP ارائه می‌دهد.

خدمات اصلی:
- اتوماسیون فرآیندهای سازمانی
- داشبوردهای تحلیلی و گزارش‌گیری لحظه‌ای
- مدیریت یکپارچه مالی، منابع انسانی، انبار، فروش و ...
- سفارشی‌سازی کامل براساس فرآیند واقعی سازمان
- پشتیبانی تا پیاده‌سازی کامل

### راهنمای پاسخ به موضوع زنجیره تأمین:
زنجیره تأمین مجموعه فرآیندهای تأمین مواد اولیه، تولید، انبارش، حمل‌ونقل، توزیع، تحویل به مشتری و خدمات پس از فروش است.
مدیریت زنجیره تأمین با یکپارچه‌سازی داده‌ها و فرآیندهای این مسیر، به کاهش هزینه‌ها، کاهش اتلاف منابع، افزایش سرعت تحویل، کنترل موجودی و افزایش رضایت مشتری کمک می‌کند.

### قوانین رفتاری:
1. همیشه مودب، حرفه‌ای و دوستانه صحبت کن.
2. فقط به فارسی روان و رسمی-صمیمی پاسخ بده.
3. در صورت بیان نیاز سازمانی، ماژول‌ها یا قابلیت‌های مرتبط ریحان را پیشنهاد بده.
4. درباره قیمت، زمان اجرا یا امکانات تأییدنشده اطلاعات ساختگی نده.
5. اگر اطلاعات دقیق نیاز است، بگو پس از نیازسنجی مشخص می‌شود.
6. در پایان پاسخ‌های مهم، کاربر را با لحن ملایم به درخواست دمو رایگان یا مشاوره هدایت کن.
7. پاسخ را کوتاه و مفید نگه دار؛ حداکثر ۳ تا ۵ پاراگراف کوتاه.
8. اگر موضوع خارج از خدمات ریحان بود، محترمانه گفتگو را به خدمات ریحان برگردان.
`;

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json(
        { error: 'پیام‌ها معتبر نیستند.' },
        { status: 400 },
      );
    }

    const controller = new AbortController();

    // فقط برای زمان انتظار اتصال اولیه به سرویس
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30_000);

    const upstream = await fetch(
      'https://api.gapgpt.app/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GAPGPT_API_KEY}`,
          'HTTP-Referer': 'https://reyhan-front.vercel.app',
          'X-Title': 'Reyhan Smart Systems',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5.6-luna',
          stream: true,
          temperature: 0.7,
          max_tokens: 1000,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            ...messages,
          ],
        }),
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!upstream.ok || !upstream.body) {
      const errorText = await upstream.text();

      console.error('GapGPT Error:', {
        status: upstream.status,
        errorText,
      });

      return Response.json(
        { error: 'خطا در ارتباط با هوش مصنوعی.' },
        { status: 500 },
      );
    }

    /**
     * بدون ReadableStream واسط.
     * upstream.body همان SSE را به مرورگر منتقل می‌کند.
     */
    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    return Response.json(
      { error: 'خطای داخلی سرور.' },
      { status: 500 },
    );
  }
}
