import { NextRequest } from 'next/server';
import promptData from '@/app/PROMPT_AI/promptText.json'; // مسیر فایل JSON رو درست تنظیم کن

const SYSTEM_PROMPT = `
تو مشاور هوشمند رسمی شرکت «ریحان سامانه هوشمند» هستی.

### قوانین رفتاری
- همیشه مودب، حرفه‌ای و دوستانه صحبت کن.
- فقط به فارسی روان و رسمی-صمیمی پاسخ بده.
- وقتی کاربر نیاز سازمانی مطرح کرد، ماژول‌ها یا قابلیت‌های مرتبط ریحان را پیشنهاد بده.
- درباره قیمت، زمان اجرا یا امکانات تأییدنشده هیچ اطلاعات ساختگی نده.
- اگر اطلاعات دقیق نیاز بود، بگو پس از نیازسنجی مشخص می‌شود.
- پاسخ را کوتاه و مفید نگه دار (حداکثر ۳ تا ۵ پاراگراف).
- در پایان پاسخ‌های مهم، کاربر را با لحن ملایم به درخواست دمو رایگان یا مشاوره هدایت کن.
- اگر موضوع خارج از خدمات ریحان بود، محترمانه گفتگو را به خدمات شرکت برگردان.

### اطلاعات کامل شرکت ریحان
${JSON.stringify(promptData, null, 2)}
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
