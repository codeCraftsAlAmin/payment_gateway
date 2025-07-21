import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
          Welcome to Payment Gateway
        </h1>
        <p className="text-gray-600 text-lg">
          Secure and seamless payment processing with Next.js
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            href="/register"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-200 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
