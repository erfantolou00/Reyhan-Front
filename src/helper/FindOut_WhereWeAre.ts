const GATEWAY_URL_KEY = "gateway_url";
const GATEWAY_URL_TIMESTAMP_KEY = "gateway_url_timestamp";
const CACHE_DURATION = 1 * 60 * 60 * 1000; // ۱ ساعت

const ENABLE_CACHE = false;

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

    const shareURL = firstResponse.shareURL ?? null;

    // همیشه shareURL رو در localStorage ذخیره کن
    saveToLocalStorage(shareURL);

    // همان shareURL رو برگردون
    return firstResponse.demoURL ?? null;
  } catch (error) {
    console.error("No endpoint responded successfully", error);
    // در صورت خطا کش رو پاک کن
    saveToLocalStorage(null);
    return null;
  }
};

// کش در حافظه (جلوگیری از درخواست تکراری همزمان)
let gatewayUrlRef: string | null | undefined;
let urlPromiseRef: Promise<string | null> | null = null;

// همیشه در localStorage ذخیره کن (صرف نظر از ENABLE_CACHE)
const saveToLocalStorage = (url: string | null) => {
  if (typeof window === "undefined") return;

  if (url) {
    localStorage.setItem(GATEWAY_URL_KEY, url);
    localStorage.setItem(GATEWAY_URL_TIMESTAMP_KEY, Date.now().toString());
  } else {
    localStorage.removeItem(GATEWAY_URL_KEY);
    localStorage.removeItem(GATEWAY_URL_TIMESTAMP_KEY);
  }
};

// فقط در صورت فعال بودن کش، از localStorage بخوان
const getFromLocalStorage = (): string | null => {
  if (!ENABLE_CACHE) return null;
  if (typeof window === "undefined") return null;

  const timestamp = localStorage.getItem(GATEWAY_URL_TIMESTAMP_KEY);
  if (!timestamp) return null;

  const age = Date.now() - Number(timestamp);
  if (age >= CACHE_DURATION) {
    localStorage.removeItem(GATEWAY_URL_KEY);
    localStorage.removeItem(GATEWAY_URL_TIMESTAMP_KEY);
    return null;
  }

  return localStorage.getItem(GATEWAY_URL_KEY);
};

export const getGatewayUrl = async (): Promise<string | null> => {
  // 1. اگر کش فعال باشه، اول از localStorage چک کن
  if (ENABLE_CACHE) {
    const cached = getFromLocalStorage();
    if (cached) {
      gatewayUrlRef = cached;
      return cached;
    }
  }

  // 2. اگر قبلاً در حافظه گرفته شده، مستقیم برگردون
  if (gatewayUrlRef !== undefined) {
    return gatewayUrlRef;
  }

  // 3. اگر در حال گرفتنه، همون Promise رو برگردون
  if (urlPromiseRef) {
    return urlPromiseRef;
  }

  // 4. درخواست جدید بزن
  urlPromiseRef = getLoginGatewayUrl().then((url) => {
    gatewayUrlRef = url;
    // ذخیره قبلاً داخل getLoginGatewayUrl انجام شده
    return url;
  });

  return urlPromiseRef;
};

// گرفتن URL از localStorage (حتی اگر کش غیرفعال باشه)
export const getCachedGatewayUrl = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(GATEWAY_URL_KEY);
};

// بررسی وجود URL در localStorage
export const hasCachedGatewayUrl = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(GATEWAY_URL_KEY) !== null;
};

// پاک کردن دستی کش
export const clearGatewayUrlCache = () => {
  gatewayUrlRef = undefined;
  urlPromiseRef = null;
  saveToLocalStorage(null);
};