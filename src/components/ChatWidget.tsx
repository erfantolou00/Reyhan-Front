'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  StopCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  id: string;
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

const createMessageId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: createMessageId(),
      role: 'assistant',
      content:
        'سلام! من مشاور هوشمند ریحان هستم. می‌تونم در مورد ماژول‌ها، قابلیت‌ها و مناسب بودن سیستم برای سازمان شما راهنمایی کنم.',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * صف متن دریافت‌شده از API که هنوز در UI نمایش داده نشده است.
   * مدل ممکن است متن را یک‌باره یا با سرعت نامنظم بفرستد؛
   * این صف آن را با سرعت یکنواخت نمایش می‌دهد.
   */
  const typingQueueRef = useRef('');
  const typingFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const streamFinishedRef = useRef(false);
  const activeAssistantIdRef = useRef<string | null>(null);

  const updateAssistantMessage = useCallback(
    (messageId: string, text: string) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? { ...message, content: text }
            : message,
        ),
      );
    },
    [],
  );

  /**
   * اجرای نرم انیمیشن تایپ.
   *
   * سرعت پایه حدود 50 کاراکتر در ثانیه است.
   * اگر صف طولانی شود، کمی سریع‌تر می‌شود تا پاسخ عقب نماند.
   */
  const processTypingQueue = useCallback(
    (timestamp: number) => {
      const assistantId = activeAssistantIdRef.current;

      if (!assistantId) {
        typingFrameRef.current = null;
        return;
      }

      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastFrameTimeRef.current;

      // هر 18ms یک رندر کنترل‌شده؛ برای روان بودن و جلوگیری از رندر اضافی
      if (elapsed >= 18 && typingQueueRef.current.length > 0) {
        const queueLength = typingQueueRef.current.length;

        /**
         * در وضعیت معمول، تقریباً هر 18ms یک کاراکتر نشان داده می‌شود.
         * در صورت طولانی شدن صف، سرعت بالاتر می‌رود تا UI عقب نیفتد.
         */
        const multiplier =
          queueLength > 250 ? 7 : queueLength > 120 ? 4 : queueLength > 50 ? 2 : 1;

        const charsToRender = Math.min(
          queueLength,
          Math.max(1, Math.floor((elapsed / 18) * multiplier)),
        );

        const nextPart = typingQueueRef.current.slice(0, charsToRender);
        typingQueueRef.current = typingQueueRef.current.slice(charsToRender);

        setMessages((prev) =>
          prev.map((message) => {
            if (message.id !== assistantId) return message;

            return {
              ...message,
              content: message.content + nextPart,
            };
          }),
        );

        lastFrameTimeRef.current = timestamp;
      }

      if (typingQueueRef.current.length > 0) {
        typingFrameRef.current = requestAnimationFrame(processTypingQueue);
        return;
      }

      typingFrameRef.current = null;
      lastFrameTimeRef.current = 0;

      // وقتی استریم تمام شده و تمام صف هم نمایش داده شد، لودینگ قطع می‌شود.
      if (streamFinishedRef.current) {
        setIsLoading(false);
        streamFinishedRef.current = false;
        activeAssistantIdRef.current = null;
      }
    },
    [],
  );

  const startTyping = useCallback(() => {
    if (typingFrameRef.current !== null) return;

    lastFrameTimeRef.current = 0;
    typingFrameRef.current = requestAnimationFrame(processTypingQueue);
  }, [processTypingQueue]);

  // چرخش پیام‌های تشویقی
  useEffect(() => {
    if (isOpen) return;

    const interval = window.setInterval(() => {
      setShowBubble(false);

      window.setTimeout(() => {
        setBubbleIndex((prev) => (prev + 1) % PROMPT_BUBBLES.length);
        setShowBubble(true);
      }, 260);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isOpen]);

  /**
   * حین تایپ از smooth استفاده نمی‌کنیم، چون برای هر کاراکتر
   * یک انیمیشن اسکرول جدید ساخته و نتیجه را لرزان می‌کند.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isLoading ? 'auto' : 'smooth',
      block: 'end',
    });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();

      if (typingFrameRef.current !== null) {
        cancelAnimationFrame(typingFrameRef.current);
      }
    };
  }, []);

  const handleStopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    // متن‌هایی که رسیده‌اند اما هنوز دیده نشده‌اند را نمایش نمی‌دهیم.
    typingQueueRef.current = '';
    streamFinishedRef.current = false;
    activeAssistantIdRef.current = null;

    if (typingFrameRef.current !== null) {
      cancelAnimationFrame(typingFrameRef.current);
      typingFrameRef.current = null;
    }

    setIsLoading(false);
  }, []);

  /**
   * پردازش یک event کامل SSE.
   * هر event ممکن است چند خط داشته باشد؛ فقط data: ها را می‌خوانیم.
   */
  const processSSEEvent = useCallback(
    (eventBlock: string) => {
      const data = eventBlock
        .split('\n')
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trimStart())
        .join('\n');

      if (!data || data === '[DONE]') return;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;

        if (typeof delta === 'string' && delta.length > 0) {
          typingQueueRef.current += delta;
          startTyping();
        }
      } catch {
        // event ناقص یا غیر JSON را نادیده می‌گیریم.
      }
    },
    [startTyping],
  );

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();

    if (!content || isLoading) return;

    const userMessage: Message = {
      id: createMessageId(),
      role: 'user',
      content,
    };

    const assistantMessage: Message = {
      id: createMessageId(),
      role: 'assistant',
      content: '',
    };

    const conversationMessages = [
      ...messages.map(({ role, content: messageContent }) => ({
        role,
        content: messageContent,
      })),
      {
        role: userMessage.role,
        content: userMessage.content,
      },
    ];

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
    setIsLoading(true);

    typingQueueRef.current = '';
    streamFinishedRef.current = false;
    activeAssistantIdRef.current = assistantMessage.id;

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('خطا در ارتباط با سرور');
      }

      if (!response.body) {
        throw new Error('بدنه پاسخ یافت نشد');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let buffer = '';

      const consumeBuffer = (force = false) => {
        // eventهای SSE با یک خط خالی از هم جدا می‌شوند.
        const events = buffer.split(/\r?\n\r?\n/);

        if (!force) {
          buffer = events.pop() ?? '';
        } else {
          buffer = '';
        }

        for (const event of events) {
          if (event.trim()) {
            processSSEEvent(event.replace(/\r/g, ''));
          }
        }
      };

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        consumeBuffer();
      }

      // تخلیه‌ی باقی‌مانده‌ی decoder و buffer
      buffer += decoder.decode();
      consumeBuffer(true);

      streamFinishedRef.current = true;

      /**
       * اگر هیچ متنی در صف نمانده بود، processTypingQueue اجرا نمی‌شود.
       * پس اینجا loading را مستقیم پایان می‌دهیم.
       */
      if (typingQueueRef.current.length === 0) {
        setIsLoading(false);
        activeAssistantIdRef.current = null;
        streamFinishedRef.current = false;
      } else {
        startTyping();
      }
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      if (activeAssistantIdRef.current === assistantMessage.id) {
        updateAssistantMessage(
          assistantMessage.id,
          'متأسفانه مشکلی در برقراری ارتباط پیش آمد. لطفاً دوباره تلاش کنید.',
        );
      }

      setIsLoading(false);
      streamFinishedRef.current = false;
      activeAssistantIdRef.current = null;
    } finally {
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
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
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 z-50 max-w-[220px]"
          >
            <div className="relative rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-[var(--dark)] shadow-lg">
              <div className="flex items-start gap-2">
                <Sparkles
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--primary)]"
                />
                <span>{PROMPT_BUBBLES[bubbleIndex]}</span>
              </div>

              <div className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-gray-100 bg-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه شناور */}
      <button
        onClick={() => {
          if (isOpen) {
            handleStopStreaming();
          }

          setIsOpen((prev) => !prev);
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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 z-50 flex h-[560px] w-[390px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
            dir="rtl"
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
            <div
              ref={messagesContainerRef}
              className="flex-1 space-y-3 overflow-y-auto bg-[var(--light)] p-4"
            >
              {messages.map((message) => {
                const isUser = message.role === 'user';
                const isStreamingMessage =
                  isLoading &&
                  message.id === activeAssistantIdRef.current &&
                  message.role === 'assistant';

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={`flex gap-2 ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                      style={{
                        background: isUser
                          ? 'var(--primary)'
                          : 'var(--secondary)',
                      }}
                    >
                      {isUser ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div
                      className={`relative max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-7 shadow-sm ${
                        isUser
                          ? 'rounded-tl-sm text-white'
                          : 'rounded-tr-sm bg-white text-[var(--dark)]'
                      }`}
                      style={
                        isUser
                          ? {
                              background:
                                'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                            }
                          : undefined
                      }
                    >
                      {/* قبل از رسیدن اولین متن، سه نقطه‌ی ملایم */}
                      {!message.content && isStreamingMessage ? (
                        <span className="flex items-center gap-1 py-1" dir="ltr">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                        </span>
                      ) : (
                        <>
                          <span className="whitespace-pre-wrap">
                            {message.content}
                          </span>

                          {/* Cursor نرم فقط روی پاسخ در حال تولید */}
                          {isStreamingMessage && (
                            <motion.span
                              aria-hidden="true"
                              className="mr-1 inline-block h-4 w-[2px] translate-y-[3px] rounded-full bg-[var(--primary)]"
                              animate={{ opacity: [0.25, 1, 0.25] }}
                              transition={{
                                duration: 0.85,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* پیشنهادهای سریع */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-[var(--dark)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                      {suggestion}
                    </button>
                  ))}
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
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="سوال خود را بنویسید..."
                  className="flex-1 rounded-xl border border-gray-200 bg-[var(--light)] px-3.5 py-2.5 text-sm text-[var(--dark)] outline-none transition focus:border-[var(--primary)] focus:bg-white"
                  disabled={isLoading}
                />

                {isLoading ? (
                  <button
                    onClick={handleStopStreaming}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600"
                    title="توقف تولید پاسخ"
                    aria-label="توقف تولید پاسخ"
                  >
                    <StopCircle size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim()}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:opacity-90 disabled:opacity-40"
                    style={{
                      background:
                        'linear-gradient135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                    }}
                    aria-label="ارسال پیام"
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
