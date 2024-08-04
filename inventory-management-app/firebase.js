// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkVcGekI2XMD5_gJHYPzsw9Tlx6l96bpc",
  authDomain: "meal-hub-1e262.firebaseapp.com",
  projectId: "meal-hub-1e262",
  storageBucket: "meal-hub-1e262.appspot.com",
  messagingSenderId: "691382225693",
  appId: "1:691382225693:web:640051b541fcfe4b4aeff4",
  measurementId: "G-WZMM93THBV"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export{
    app,
    firestore
}