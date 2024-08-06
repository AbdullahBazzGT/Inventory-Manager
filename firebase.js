// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "inventory-management-448cb.firebaseapp.com",
  projectId: "inventory-management-448cb",
  storageBucket: "inventory-management-448cb.appspot.com",
  messagingSenderId: "503138210009",
  appId: process.env.APP_ID,
  measurementId: "G-XFFDPV6JYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
