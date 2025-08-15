// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "content-forge-6b3c9.firebaseapp.com",
  projectId: "content-forge-6b3c9",
  storageBucket: "content-forge-6b3c9.firebasestorage.app",
  messagingSenderId: process.env.FB_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: "G-8TVPDMK1S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)

export {storage}