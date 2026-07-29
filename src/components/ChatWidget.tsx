'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTIONS = [
  'چه ماژول‌هایی دارید؟',
  'برای شرکت من مناسبه؟',
  'چطور درخواست دمو بدم؟',
  'زمان پیاده‌سازی چقدره؟',
];

const PROMPT_BUBBLES = [
  'سوالی دارید؟ بپرسید 👋',
  'مشاور هوشمند ریحان اینجاست',
  'نیازسنجی رایگان بگیرید',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'سلام! من مشاور هوشمند ریحان هستم. می‌تونم در مورد ماژول‌ها، قابلیت‌ها و مناسب بودن سیستم برای سازمان شما راهنمایی کنم.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // چرخش پیام‌های تشویقی بالای دکمه
  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setBubbleIndex((prev) => (prev + 1) % PROMPT_BUBBLES.length);
        setShowBubble(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error('خطا در ارتباط با سرور');

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'متأسفانه مشکلی پیش اومد. لطفاً دوباره تلاش کنید.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* پیام تشویقی بالای دکمه */}
      {!isOpen && (
        <div
          className={`fixed bottom-24 left-6 z-50 max-w-[220px] transition-all duration-300 ${
            showBubble
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0'
          }`}
        >
          <div className="relative rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[var(--dark)] shadow-lg border border-gray-100">
            <div className="flex items-start gap-2">
              <Sparkles
                size={16}
                className="mt-0.5 shrink-0 text-[var(--primary)]"
              />
              <span>{PROMPT_BUBBLES[bubbleIndex]}</span>
            </div>
            {/* فلش به سمت دکمه */}
            <div className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-white border-b border-r border-gray-100" />
          </div>
        </div>
      )}

      {/* دکمه شناور */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105"
        style={{
          background: isOpen
            ? 'var(--dark)'
            : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        }}
        aria-label={isOpen ? 'بستن چت' : 'باز کردن چت'}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* پنجره چت */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 flex h-[560px] w-[390px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
          {/* هدر */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 text-white"
            style={{
              background:
                'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%)',
            }}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <Bot size={20} />
              <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--secondary)] bg-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">مشاور هوشمند ریحان</p>
              <p className="text-xs text-white/70">آنلاین · پاسخ سریع</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 transition hover:bg-white/10"
              aria-label="بستن"
            >
              <X size={18} />
            </button>
          </div>

          {/* پیام‌ها */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--light)] p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                  style={{
                    background:
                      msg.role === 'user'
                        ? 'var(--primary)'
                        : 'var(--secondary)',
                  }}
                >
                  {msg.role === 'user' ? (
                    <User size={14} />
                  ) : (
                    <Bot size={14} />
                  )}
                </div>
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'rounded-tl-sm text-white'
                      : 'rounded-tr-sm bg-white text-[var(--dark)]'
                  }`}
                  style={
                    msg.role === 'user'
                      ? {
                          background:
                            'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                        }
                      : undefined
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* پیشنهادهای سریع (فقط وقتی یک پیام اولیه هست) */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-[var(--dark)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{ background: 'var(--secondary)' }}
                >
                  <Bot size={14} />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tr-sm bg-white px-4 py-3 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* اینپوت */}
          <div className="border-t border-gray-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="سوال خود را بنویسید..."
                className="flex-1 rounded-xl border border-gray-200 bg-[var(--light)] px-3.5 py-2.5 text-sm text-[var(--dark)] outline-none transition focus:border-[var(--primary)] focus:bg-white"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition disabled:opacity-40 hover:opacity-90"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                }}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-gray-400">
              پشتیبانی هوشمند ریحان
            </p>
          </div>
        </div>
      )}
    </>
  );
}