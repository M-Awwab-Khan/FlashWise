// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuLNL6xbYetW9jd0fb1YfrCDDktO_GB_s",
    authDomain: "flashwise-afca5.firebaseapp.com",
    projectId: "flashwise-afca5",
    storageBucket: "flashwise-afca5.appspot.com",
    messagingSenderId: "27303900160",
    appId: "1:27303900160:web:aa3ff6ef0930737f2b94e5",
    measurementId: "G-42XNNKHKD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }
