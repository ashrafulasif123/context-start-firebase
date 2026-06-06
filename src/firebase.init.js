// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNvPLcKiatfxg8lIvaAJ5iyVPLog95MQs",
    authDomain: "sign-in-4b6e9.firebaseapp.com",
    projectId: "sign-in-4b6e9",
    storageBucket: "sign-in-4b6e9.firebasestorage.app",
    messagingSenderId: "792665588439",
    appId: "1:792665588439:web:32b83acb98079b8420e692"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);