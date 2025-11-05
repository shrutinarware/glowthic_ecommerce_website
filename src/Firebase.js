// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB3EZGq8-Dm6jvZ88_j8ngB8jpnJC9dC1M",
  authDomain: "glowthic-ecommerce-website.firebaseapp.com",
  projectId: "glowthic-ecommerce-website",
  storageBucket: "glowthic-ecommerce-website.appspot.com",
  messagingSenderId: "782009684195",
  appId: "1:782009684195:web:f66119086524ebfe8975d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
