// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

console.log(import.meta.env.VITE_FIREBASE_API_KEY)

const firebaseConfig = {
  apiKey: "AIzaSyCvC-rSVuxy6ZPTAoKjVNGImB8d3NGsKBU",
  authDomain: "blogapp-bbecf.firebaseapp.com",
  projectId: "blogapp-bbecf",
  storageBucket: "blogapp-bbecf.appspot.com",
  messagingSenderId: "1003491366670",
  appId: "1:1003491366670:web:7822f66aca32cb185ce95f",
  measurementId: "G-9CFJ3RY2WM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);