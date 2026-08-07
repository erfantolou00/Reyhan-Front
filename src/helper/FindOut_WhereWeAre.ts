const GATEWAY_URL_KEY = "gateway_url";
const GATEWAY_URL_TIMESTAMP_KEY = "gateway_url_timestamp";
const CACHE_DURATION = 1 * 60 * 60 * 1000; // 1 ساعت به میلی‌ثانیه

// 👇 با این فلگ می‌تونی کش رو خاموش/روشن کنی
const ENABLE_CACHE = false; // false بذار تا کش کاملاً غیرفعال بشه

const getLoginGatewayUrl = async (): Promise<string | null> => {
  const endpoints = [
    "http://server:9020/geturl",
    "http://v1:9020/geturl",
    "http://reyhansmart.ir:5020/geturl",
  ];

  try {
    const firstResponse = await Promise.any(
      endpoints.map(async (endpoint) => {
        const res = await fetch(endpoint);

        if (!res.ok) {
          throw new Error(`Request failed: ${endpoint}`);
        }

        return res.json();
      })
    );

    return firstResponse.demoURL ?? null;
  } catch (error) {
    console.error("No endpoint responded successfully", error);
    return null;
  }
};

// کش در حافظه (جلوگیری از درخواست تکراری همزمان)
let gatewayUrlRef: string | null | undefined;
let urlPromiseRef: Promise<string | null> | null = null;

const isCacheValid = (): boolean => {
  if (!ENABLE_CACHE) return false;
  if (typeof window === "undefined") return false;

  const timestamp = localStorage.getItem(GATEWAY_URL_TIMESTAMP_KEY);
  if (!timestamp) return false;

  const age = Date.now() - Number(timestamp);
  return age < CACHE_DURATION;
};

export const getGatewayUrl = async (): Promise<string | null> => {
  // اگر کش خاموش باشه، مستقیم درخواست بزن
  if (!ENABLE_CACHE) {
    return getLoginGatewayUrl();
  }

  // اول چک کن کش localStorage هنوز معتبره یا نه
  if (typeof window !== "undefined" && isCacheValid()) {
    const cached = localStorage.getItem(GATEWAY_URL_KEY);
    if (cached) {
      gatewayUrlRef = cached;
      return cached;
    }
  }

  // اگر کش منقضی شده بود، پاکش کن
  if (typeof window !== "undefined") {
    localStorage.removeItem(GATEWAY_URL_KEY);
    localStorage.removeItem(GATEWAY_URL_TIMESTAMP_KEY);
  }
  gatewayUrlRef = undefined;

  // اگر قبلاً در حافظه گرفته شده، مستقیم برگردون
  if (gatewayUrlRef !== undefined) {
    return gatewayUrlRef;
  }

  // اگر در حال گرفتنه، همون Promise رو برگردون
  if (!urlPromiseRef) {
    urlPromiseRef = getLoginGatewayUrl().then((url) => {
      gatewayUrlRef = url;

      // ذخیره در localStorage همراه با زمان
      if (typeof window !== "undefined" && url) {
        localStorage.setItem(GATEWAY_URL_KEY, url);
        localStorage.setItem(GATEWAY_URL_TIMESTAMP_KEY, Date.now().toString());
      }

      return url;
    });
  }

  return urlPromiseRef;
};

// پاک کردن دستی کش (اختیاری)
export const clearGatewayUrlCache = () => {
  gatewayUrlRef = undefined;
  urlPromiseRef = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem(GATEWAY_URL_KEY);
    localStorage.removeItem(GATEWAY_URL_TIMESTAMP_KEY);
  }
};