"use client";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  // collect info
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit user info
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // console.log(user);

    // pass data to firebase
    try {
      const { email, password } = user;
      const signUpUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userCredential = signUpUser.user;
      await sendEmailVerification(userCredential);

      setIsSuccess(true);

      setMessage(
        "Registration successful! Please check your email to verify your account before logging in."
      );

      setTimeout(() => router.push("/login"), 5000);
    } catch (error) {
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
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Join our secure payment platform today
          </p>
        </div>

        {/* Sign up form */}
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
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-gray-50 text-gray-900 placeholder-gray-400 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-normal">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-normal transition-colors"
            >
              Sign in
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

export default Register;
