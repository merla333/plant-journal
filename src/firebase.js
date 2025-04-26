// src/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAxSi0qzySAIN4luAfQteI29ghD7W1lho",
  authDomain: "plant-journal-app.firebaseapp.com",
  projectId: "plant-journal-app",
  storageBucket: "plant-journal-app.appspot.com",
  messagingSenderId: "882193669237",
  appId: "1:882193669237:web:0998ed302d9141e46fac3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const storage = getStorage(app);
export const db = getFirestore(app);
