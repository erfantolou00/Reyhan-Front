const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f6fb] p-4 dark:bg-[#071422]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#0c1a2c]">
        <h2 className="mb-2 text-xl font-bold text-slate-950 dark:text-white">خطا در بارگذاری</h2>
        <p className="mb-6 text-slate-600 dark:text-slate-300">{error}</p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );

  export default  ErrorState