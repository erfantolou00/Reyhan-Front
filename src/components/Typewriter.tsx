import React, { useState, useEffect } from "react";

const Typewriter = ({
  texts,
  typingSpeed = 50,
  deletingSpeed = 25,
  delay = 1000,
  lastTextDelay = 6000,
}: {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  lastTextDelay?: number;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isPaused) {
      if (isDeleting) {
        // Deleting text
        timeout = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), delay);
          }
        }, deletingSpeed);
      } else {
        // Typing text
        timeout = setTimeout(() => {
          const currentWord = texts[currentIndex];
          setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
          if (currentText === currentWord) {
            setIsPaused(true);
            const currentDelay = currentIndex === texts.length - 1 ? lastTextDelay : delay;
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, currentDelay);
          }
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentIndex,
    isDeleting,
    isPaused,
    texts,
    typingSpeed,
    deletingSpeed,
    delay,
    lastTextDelay,
  ]);

  return (
    <span className={`${currentIndex === texts.length - 1 ? 'text-primary' : ''}`}>
      {currentText}
    </span>
  );
};

export default Typewriter;
