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

      // Extract the response body
      const result = await response.json();

      // If the response is not ok, check for the error message in the body
      if (!response.ok) {
        const errorMessage = result.message || `Error: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // Return the result if successful
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
