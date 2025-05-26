import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlay, FaSpinner } from "react-icons/fa";

export default function VideoModal({
  openVideoModal,
  onClose,
}: {
  openVideoModal: boolean;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (openVideoModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openVideoModal]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (!openVideoModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
        >
          <IoClose size={24} />
        </button>

        {/* Video Container */}
        <div className="relative aspect-video">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <FaSpinner className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
          
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
              <p className="text-lg mb-4">متأسفانه در بارگذاری ویدیو مشکلی پیش آمده است</p>
              <button
                onClick={() => {
                  setError(false);
                  setIsLoading(true);
                }}
                className="px-4 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                تلاش مجدد
              </button>
            </div>
          ) : (
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
            >
                  <source src="/video/Demo.mp4" type="video/mp4" />

            </video>
          )}
        </div>
      </div>
    </div>
  );
}
