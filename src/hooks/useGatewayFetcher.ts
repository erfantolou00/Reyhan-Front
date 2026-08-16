// hooks/useGatewayFetcher.ts
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer';

interface FetchOptions<T = unknown> {
  cache?: RequestCache;
  headers?: HeadersInit;
  timeout?: number;
  autoFetch?: boolean;
  responseType?: ResponseType;
  transform?: (data: any) => T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
}

/** فقط مسیرهای نسبی و امن را قبول می‌کند */
function sanitizePath(path: string): string {
  if (!path || typeof path !== 'string') {
    throw new Error('مسیر فایل نامعتبر است');
  }

  let cleaned = path.replace(/^\/+/, '').replace(/\/+/g, '/');

  if (
    cleaned.includes('..') ||
    cleaned.includes('\\') ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(cleaned) ||
    cleaned.startsWith('//')
  ) {
    throw new Error('مسیر فایل غیرمجاز است');
  }

  return cleaned;
}

/** ساخت URL امن */
function buildUrl(gateway: string, filePath: string): string {
  const base = gateway.replace(/\/+$/, '');
  const path = sanitizePath(filePath);
  return `${base}/${path}`;
}

/** خواندن پاسخ بر اساس نوع */
async function parseResponse(response: Response, type: ResponseType) {
  switch (type) {
    case 'text':
      return response.text();
    case 'blob':
      return response.blob();
    case 'arrayBuffer':
      return response.arrayBuffer();
    case 'json':
    default:
      return response.json();
  }
}

/**
 * هوک امن برای دریافت فایل از Gateway
 */
export function useGatewayFetcher<T = unknown>(
  filePath: string,
  options: FetchOptions<T> = {}
) {
  const {
    cache = 'no-cache',
    headers = { Accept: 'application/json' },
    timeout = 30_000,
    autoFetch = true,
    responseType = 'json',
    transform,
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
    isSuccess: false,
  });

  const abortRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const transformRef = useRef(transform);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    transformRef.current = transform;
  });

  const fetchData = useCallback(
    async (customPath?: string) => {
      const targetPath = customPath ?? filePath;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // اول از localStorage می‌خونه
        let gateway =
          (typeof window !== 'undefined' && localStorage.getItem('gateway_url')) ||
          process.env.NEXT_PUBLIC_DEFAULT_GATEWAY_URL ||
          '/api';

        if (
          typeof gateway !== 'string' ||
          gateway.trim() === '' ||
          /^javascript:/i.test(gateway)
        ) {
          throw new Error('آدرس Gateway نامعتبر است');
        }

        const url = buildUrl(gateway, targetPath);

        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method: 'GET',
          cache,
          headers,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        let data = await parseResponse(response, responseType);

        if (transformRef.current) {
          data = transformRef.current(data);
        }

        if (!isMountedRef.current) return;

        setState({
          data: data as T,
          loading: false,
          error: null,
          isSuccess: true,
        });

        onSuccessRef.current?.(data as T);
        return data as T;
      } catch (err) {
        if (!isMountedRef.current) return;

        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : 'خطای ناشناخته در دریافت اطلاعات';

        setState({
          data: null,
          loading: false,
          error: message,
          isSuccess: false,
        });

        onErrorRef.current?.(err instanceof Error ? err : new Error(message));
      }
    },
    [filePath, cache, headers, timeout, responseType]
  );

  const refetch = useCallback(
    (newPath?: string) => fetchData(newPath),
    [fetchData]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setState({
      data: null,
      loading: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    if (autoFetch && filePath) {
      fetchData();
    }

    return () => {
      isMountedRef.current = false;
      abortRef.current?.abort();
    };
  }, [filePath, autoFetch, fetchData]);

  return {
    ...state,
    refetch,
    reset,
    fetchWithPath: fetchData,
  };
}

/**
 * نسخه ساده برای استفاده خارج از کامپوننت
 * توجه: این تابع فقط سمت کلاینت درست کار می‌کند چون به localStorage وابسته است.
 */
export async function fetchFromGateway<T = unknown>(
  filePath: string,
  options: {
    cache?: RequestCache;
    headers?: HeadersInit;
    timeout?: number;
    gateway?: string;
    responseType?: ResponseType;
    transform?: (data: any) => T;
  } = {}
): Promise<T> {
  const {
    cache = 'no-cache',
    headers = { Accept: 'application/json' },
    timeout = 30_000,
    gateway: customGateway,
    responseType = 'json',
    transform,
  } = options;

  let gateway = customGateway;

  // اولویت با localStorage
  if (!gateway && typeof window !== 'undefined') {
    gateway = localStorage.getItem('gateway_url') || undefined;
  }

  if (!gateway) {
    gateway = process.env.NEXT_PUBLIC_DEFAULT_GATEWAY_URL || '/api';
  }

  const url = buildUrl(gateway, filePath);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    let data = await parseResponse(response, responseType);

    if (transform) {
      data = transform(data);
    }

    return data as T;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('درخواست به دلیل اتمام زمان لغو شد');
    }

    throw err instanceof Error ? err : new Error('خطای ناشناخته');
  }
}