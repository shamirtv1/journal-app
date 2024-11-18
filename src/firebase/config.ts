// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHrWQ6YH3FLmWLWVn0cNwKmbrtcraXW90",
    authDomain: "test-learning-940bd.firebaseapp.com",
    projectId: "test-learning-940bd",
    storageBucket: "test-learning-940bd.firebasestorage.app",
    messagingSenderId: "963599362593",
    appId: "1:963599362593:web:d1617a92bc08dc162b1160"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);