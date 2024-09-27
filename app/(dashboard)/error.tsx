'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 text-primary -mt-[80px]">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-2 ">Something went wrong!</h2>
        <p className="text-lg mb-8 text-brand">{error?.message}</p>

        <Link
          href="/dashboard"
          className="bg-brand hover:bg-brand/90 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
