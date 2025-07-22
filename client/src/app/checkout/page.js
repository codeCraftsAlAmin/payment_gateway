"use client";

import axios from "axios";
import { useState } from "react";

const CheckOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://payment-gateway-d2eh.onrender.com/payments/create-checkout-session",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.url) {
        window.location.href = res.data.url; // redirect to stripe checkou
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to create checkout session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-indigo-600 tracking-tight mb-4">
          Premium Course
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Unlock all features for just $29.99
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Get lifetime access to exclusive content, advanced tools, and priority
          support. Elevate your skills with our comprehensive course designed
          for success.
        </p>
        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Redirecting..." : "Buy Now – $29.99"}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
