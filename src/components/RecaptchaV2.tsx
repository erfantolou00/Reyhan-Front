// components/RecaptchaV2.tsx
'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

interface RecaptchaV2Props {
  onChange: (token: string | null) => void;
  className?: string;
}

export default function RecaptchaV2({ onChange, className = '' }: RecaptchaV2Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <div className={`flex justify-center ${className}`}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={onChange}
        onExpired={() => onChange(null)}
        onErrored={() => onChange(null)}
        theme="dark" // یا "dark"
        hl="fa" // زبان فارسی
      />
    </div>
  );
}