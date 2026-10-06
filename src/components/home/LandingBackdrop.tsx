const gridSize = { backgroundSize: '64px 64px' } as const;

export default function LandingBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[#f3f6fb] dark:bg-[#071422]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 55% 40% at 85% 0%, rgba(255,107,0,0.16), transparent 60%), radial-gradient(ellipse 42% 36% at 0% 45%, rgba(0,102,204,0.12), transparent 55%), radial-gradient(ellipse 40% 30% at 80% 100%, rgba(255,107,0,0.1), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          ...gridSize,
          backgroundImage:
            'linear-gradient(to left, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          ...gridSize,
          backgroundImage:
            'linear-gradient(to left, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
        }}
      />
    </div>
  );
}
