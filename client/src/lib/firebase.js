import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyoxuK0SaXpxyCPHXtLQMjwky9N_xtcFU",
  authDomain: "payment-gateway-7c50b.firebaseapp.com",
  projectId: "payment-gateway-7c50b",
  storageBucket: "payment-gateway-7c50b.firebasestorage.app",
  messagingSenderId: "282976800557",
  appId: "1:282976800557:web:061da585c8e8aec9b70da4",
  measurementId: "G-D8FSZW61CL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
