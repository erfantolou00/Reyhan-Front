import { FaSpinner } from "react-icons/fa";

// ---------------- Components ----------------
const LoadingState = () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f6fb] dark:bg-[#071422]">
      <FaSpinner className="mb-4 h-12 w-12 animate-spin text-primary" />
      <div className="text-lg text-slate-600 dark:text-slate-300">در حال بارگذاری مقالات...</div>
    </div>
  );

  export default LoadingState