// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_LXvXaEAxe94jkrDiHBknf9Bg4HLaVIg",
  authDomain: "react--auth-fee73.firebaseapp.com",
  projectId: "react--auth-fee73",
  storageBucket: "react--auth-fee73.appspot.com",
  messagingSenderId: "246780933205",
  appId: "1:246780933205:web:65a66892471931a32650dc"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthprovider = new GoogleAuthProvider();
export default app;