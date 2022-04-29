// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYIuO4sp3Pl-JJwEgAUAdJD7bl_UvKxkc",
  authDomain: "marketplace-e3915.firebaseapp.com",
  projectId: "marketplace-e3915",
  storageBucket: "marketplace-e3915.appspot.com",
  messagingSenderId: "629639813895",
  appId: "1:629639813895:web:7e23fad7fb7eebb322c3a2",
  measurementId: "G-5F6PVTBR6B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
