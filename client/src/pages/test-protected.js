"use client";

import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const TestProtected = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User info", user);

      if (user) {
        const token = await user.getIdToken();

        try {
          const res = await axios.get("http://localhost:8000/protected", {
            headers: {
              Authorization: `Bearer ${token}`, // send token to FastAPI
            },
          });

          setMessage(res.data.message);
        } catch (error) {
          setMessage("Unauthorized: " + error.response?.data?.detail);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-2">Protected API Test</h1>
      <p>{message}</p>
    </div>
  );
};

export default TestProtected;
