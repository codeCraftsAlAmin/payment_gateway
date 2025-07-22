"use client";

import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-600 tracking-tight mb-4">
          Payment Canceled
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Your payment was not completed.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          It looks like your payment process was interrupted. You can try again
          to unlock the Premium Course and gain access to exclusive content,
          advanced tools, and priority support.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/checkout"
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block bg-white text-indigo-600 border border-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
