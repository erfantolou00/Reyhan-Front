type SoftGlowProps = {
  tone?: 'orange' | 'blue';
  className?: string;
  delay?: string;
};

export default function SoftGlow({ tone = 'orange', className = '', delay = '0s' }: SoftGlowProps) {
  const tint =
    tone === 'orange'
      ? 'bg-[radial-gradient(circle,rgba(255,107,0,0.34),transparent_68%)]'
      : 'bg-[radial-gradient(circle,rgba(0,102,204,0.28),transparent_68%)]';

  return (
    <div
      aria-hidden
      className={`soft-glow pointer-events-none absolute z-[1] h-96 w-96 rounded-full ${tint} ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}
