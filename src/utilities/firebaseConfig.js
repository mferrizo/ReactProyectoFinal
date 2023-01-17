// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVaA9Y7Tz0icFUbj1wNfp0pB6HBtnPnX4",
  authDomain: "ecommerce-react-7fb32.firebaseapp.com",
  projectId: "ecommerce-react-7fb32",
  storageBucket: "ecommerce-react-7fb32.appspot.com",
  messagingSenderId: "653344356302",
  appId: "1:653344356302:web:01a1c85d795bd4ff3f1d9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
