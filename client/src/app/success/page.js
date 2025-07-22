"use client";

import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-600 tracking-tight mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Thank you for your purchase!
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Your Premium Course access is now active. Dive into exclusive content,
          advanced tools, and priority support. Check your email for account
          details and next steps.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
