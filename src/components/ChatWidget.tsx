'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const abortControllerRef = useRef<AbortController | null>(null);

  // چرخش پیام‌های تشویقی
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

  // اسکرول خودکار
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
  
    const userMessage: Message = { role: 'user', content };
    const newMessages = [...messages, userMessage];
  
    // پیام کاربر + پیام خالی دستیار
    setMessages([...newMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);
  
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
  
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: abortController.signal,
      });
  
      if (!res.ok) throw new Error('خطا در ارتباط با سرور');
      if (!res.body) throw new Error('بدنه پاسخ یافت نشد');
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantReply = '';
      let buffer = '';
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
  
        // هر تکه را بلافاصله دیکد می‌کنیم
        buffer += decoder.decode(value, { stream: true });
  
        // خطوط کامل را جدا می‌کنیم
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // باقی‌مانده ناقص را نگه می‌داریم
  
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;
  
          const dataStr = trimmed.slice(6);
          if (dataStr === '[DONE]') continue;
  
          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            
            if (delta) {
              assistantReply += delta;
  
              // آپدیت فوری UI (بدون debounce)
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: assistantReply,
                };
                return updated;
              });
            }
          } catch {
            // نادیده گرفتن خطاهای پارس موقت
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'متأسفانه مشکلی در برقراری ارتباط پیش آمد. مجدداً تلاش کنید.',
          };
          return updated;
        });
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
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
      {/* پیام تشویقی */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 max-w-[220px]"
          >
            <div className="relative rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[var(--dark)] shadow-lg border border-gray-100">
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                <span>{PROMPT_BUBBLES[bubbleIndex]}</span>
              </div>
              <div className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-white border-b border-r border-gray-100" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه شناور */}
      <button
        onClick={() => {
          if (isOpen) handleStopStreaming();
          setIsOpen(!isOpen);
        }}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 z-50 flex h-[560px] w-[390px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100"
          >
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
                onClick={() => {
                  handleStopStreaming();
                  setIsOpen(false);
                }}
                className="rounded-lg p-1.5 transition hover:bg-white/10"
                aria-label="بستن"
              >
                <X size={18} />
              </button>
            </div>

            {/* پیام‌ها */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-[var(--light)] p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                    style={{
                      background:
                        msg.role === 'user' ? 'var(--primary)' : 'var(--secondary)',
                    }}
                  >
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm relative ${
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
                    {/* Cursor چشمک‌زن */}
                    {isLoading &&
                      i === messages.length - 1 &&
                      msg.role === 'assistant' && (
                        <span className="inline-block w-1.5 h-3.5 bg-gray-400 animate-pulse mr-1 align-middle" />
                      )}
                  </div>
                </motion.div>
              ))}

              {/* پیشنهادهای سریع */}
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

              {/* لودینگ اولیه */}
              {isLoading && messages[messages.length - 1]?.content === '' && (
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
                  disabled={isLoading && messages[messages.length - 1]?.content === ''}
                />

                {isLoading ? (
                  <button
                    onClick={handleStopStreaming}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600"
                    title="توقف تولید پاسخ"
                  >
                    <StopCircle size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition disabled:opacity-40 hover:opacity-90"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                    }}
                  >
                    <Send size={16} />
                  </button>
                )}
              </div>
              <p className="mt-2 text-center text-[10px] text-gray-400">
                پشتیبانی هوشمند ریحان
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}