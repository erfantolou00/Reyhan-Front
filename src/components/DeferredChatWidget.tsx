'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function DeferredChatWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timeout = window.setTimeout(start, 1500);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!ready) return null;
  return <ChatWidget />;
}
