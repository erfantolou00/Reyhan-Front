// hooks/useGatewayFetcher.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useGatewayFetcher<T = unknown>(filePath: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // دقیقاً مثل بلاگ
      let gateway = localStorage.getItem('gateway_url');

      if (!gateway) {
        gateway = process.env.NEXT_PUBLIC_DEFAULT_GATEWAY_URL || '/api';
        console.warn('Gateway URL not found in localStorage, using default');
      }

      const baseUrl = gateway.replace(/\/+$/, '');
      const url = `${baseUrl}/${filePath.replace(/^\/+/, '')}`;

      const response = await fetch(url, {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const json = await response.json();
      setState({ data: json as T, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطای ناشناخته در دریافت اطلاعات';
      setState({ data: null, loading: false, error: message });
      console.error('Gateway fetch error:', err);
    }
  }, [filePath]);

  useEffect(() => {
    if (filePath) {
      fetchData();
    }
  }, [filePath, fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}