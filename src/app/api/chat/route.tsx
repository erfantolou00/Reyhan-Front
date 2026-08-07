import { NextRequest } from 'next/server';

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
- این سایتی که میفرستم رو بخون و اگر کاربر درباره زنجیره تامین پرسید از این پاسخ بده https://www.systemgroup.net/knowledge-network/what-is-supply-chain-management/

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

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // خیلی مهم: جلوگیری از کش و بافر شدن

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'پیام‌ها معتبر نیستند' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const upstream = await fetch('https://api.gapgpt.app/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GAPGPT_API_KEY}`,
        'HTTP-Referer': 'https://reyhan-front.vercel.app',
        'X-Title': 'Reyhan Smart Systems',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const errorText = await upstream.text();
      console.error('GapGPT Error:', errorText);
      return new Response(JSON.stringify({ error: 'خطا در ارتباط با هوش مصنوعی' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // تبدیل استریم upstream به استریم خودمان با flush فوری
    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // هر تکه را بلافاصله به کلاینت می‌فرستیم
            controller.enqueue(value);
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no', // برای nginx / vercel
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'خطای داخلی سرور' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}