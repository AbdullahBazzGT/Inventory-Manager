// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTkUJnJ4ySSswx2UNDUThYSWIX0Y5gvho",
  authDomain: "inventory-management-448cb.firebaseapp.com",
  projectId: "inventory-management-448cb",
  storageBucket: "inventory-management-448cb.appspot.com",
  messagingSenderId: "503138210009",
  appId: "1:503138210009:web:76139d8e93009e07f7eec8",
  measurementId: "G-XFFDPV6JYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
