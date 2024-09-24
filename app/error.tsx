'use client'; // Error boundaries must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary to-primary/90 text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2 ">Something went wrong!</h2>
        <p className="text-lg mb-8 text-brand">{error?.message}</p>

        <Link
          href="/"
          className="bg-brand hover:bg-brand/90 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Home
        </Link>
      </div>

      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40 text-gray-500 opacity-60 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 8v8m4-4H8" />
        </svg>
      </div>
    </div>
  );
}
