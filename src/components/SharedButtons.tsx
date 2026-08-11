'use client';

import { FaTwitter, FaLinkedin, FaTelegram, FaWhatsapp, FaCopy } from 'react-icons/fa';

interface ShareButtonsProps {
  postUrl: string;
  title: string;
}

export default function ShareButtons({ postUrl, title }: ShareButtonsProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      alert('لینک کپی شد!');
    } catch (error) {
      console.error('خطا در کپی لینک', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-md hover:shadow-lg"
      >
        <FaTwitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-md hover:shadow-lg"
      >
        <FaLinkedin className="w-4 h-4" />
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-blue-400 hover:bg-blue-500 text-white transition-colors shadow-md hover:shadow-lg"
      >
        <FaTelegram className="w-4 h-4" />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + postUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors shadow-md hover:shadow-lg"
      >
        <FaWhatsapp className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopy}
        className="p-2.5 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors shadow-md hover:shadow-lg"
      >
        <FaCopy className="w-4 h-4" />
      </button>
    </div>
  );
}