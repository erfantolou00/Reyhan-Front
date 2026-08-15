import { FaSpinner } from "react-icons/fa";

// ---------------- Components ----------------
const LoadingState = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-gray-50">
      <FaSpinner className="w-12 h-12 text-primary animate-spin mb-4" />
      <div className="text-lg text-gray-600">در حال بارگذاری مقالات...</div>
    </div>
  );

  export default LoadingState