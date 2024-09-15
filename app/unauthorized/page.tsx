import Link from 'next/link';
import { useRouter } from 'next/router';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary via-primary/90 to-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">403</h1>
        <h2 className="text-3xl font-semibold mb-2">Access Denied</h2>
        <p className="text-lg mb-8">
          Oops! You are not authorized to access this page.
        </p>

        <Link
          href="/"
          className="bg-brand hover:brand/90 text-white font-semibold py-4 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          Go Back to Home
        </Link>
      </div>

      <div className="mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 text-gray-500 opacity-70 animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12l2-2m0 0l7-7 7 7m-7-7v18" />
        </svg>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
