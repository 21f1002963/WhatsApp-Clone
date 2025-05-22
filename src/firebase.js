// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvD288MI-HEf56pU1KpaYc0hoEvVBp-rg",
  authDomain: "whatsapp-clone-9257c.firebaseapp.com",
  projectId: "whatsapp-clone-9257c",
  storageBucket: "whatsapp-clone-9257c.firebasestorage.app",
  messagingSenderId: "940502237889",
  appId: "1:940502237889:web:8210165afe5ae40cb14a40",
  measurementId: "G-YPWCHGTR0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };