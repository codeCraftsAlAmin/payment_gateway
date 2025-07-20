"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CheckOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/payments/create-checkout-session",
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Premium Course
        </h1>
        <p className="text-gray-600 mb-6">
          Unlock all features for just $29.99
        </p>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? "Redirecting..." : "Buy Now – $29.99"}
          {/* Buy Now */}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
