'use client';

import Link from 'next/link';
import { useLoader } from '@/components/LoaderContext';
import { useCallback } from 'react';

const BackButton = () => {
  const { setLoading } = useLoader();
  const handleBackClick = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  return (
    <Link
      href="/"
      className="mr-3 p-1 rounded hover:bg-gray-200 transition"
      onClick={handleBackClick}
      prefetch={false}
      aria-label="Back to home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700 dark:text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </Link>
  );
};

export default BackButton;
