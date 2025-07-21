"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  // collect info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit the values
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // pass data to firebase
    try {
      const { email, password } = user;

      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userCredential = signInUser.user;

      if (!userCredential.emailVerified) {
        setMessage("Please verify user email before logging in");
        return;
      }

      setIsSuccess(true);
      setMessage("Login successfull");
      router.push("/checkout");
    } catch (error) {
      // console.log("Login Error", error);
      setIsSuccess(false);
      const errorCode = error.code.replace("auth/", "");
      const errorCodeMessage = errorCode.replace(/-/g, " ");
      setMessage(errorCodeMessage);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
            Sign In
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Welcome back! Access your payment platform
          </p>
        </div>

        {/* Sign in form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 shadow-sm"
            />
          </div>

          <div className="text-center mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Success/error message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-sm text-center ${
              isSuccess
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="font-medium">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
