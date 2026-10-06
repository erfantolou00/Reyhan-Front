'use client';

import { useEffect, useState } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
}

export default function Typewriter({
  texts,
  speed = 80,
  delay = 2000,
  className = '',
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex] ?? '';
    const isPaused = !isDeleting && currentText === fullText;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (currentText === fullText) {
          setIsDeleting(true);
          return;
        }
        setCurrentText(fullText.slice(0, currentText.length + 1));
        return;
      }

      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }

      setCurrentText(fullText.slice(0, currentText.length - 1));
    }, isPaused ? delay : isDeleting ? speed / 2 : speed);

    return () => window.clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed, delay]);

  return (
    <span className={className}>
      {currentText}
      <span className="caret-blink ms-1 inline-block h-7 w-0.5 bg-current align-middle" aria-hidden />
    </span>
  );
}
