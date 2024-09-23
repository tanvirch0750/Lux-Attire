import { useState } from 'react';

interface FetchOptions {
  method: 'POST' | 'PUT'; // Only allow POST and PUT for create and update
  headers?: HeadersInit;
  body?: any;
}

interface UseCreateOrUpdate {
  loading: boolean;
  error: string | null;
  fetchCreateOrUpdate: (url: string, options: FetchOptions) => Promise<any>;
}

export const useCreateOrUpdate = (): UseCreateOrUpdate => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCreateOrUpdate = async (url: string, options: FetchOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      console.error('Fetch error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchCreateOrUpdate };
};
