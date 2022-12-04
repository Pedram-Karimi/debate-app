import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqSXkegmjMNFWN3_PiST-OCs8c1azhzgs",
  authDomain: "science-app-58c84.firebaseapp.com",
  projectId: "science-app-58c84",
  storageBucket: "science-app-58c84.appspot.com",
  messagingSenderId: "568347853390",
  appId: "1:568347853390:web:6a43e078913758e7d0791f",
  measurementId: "G-KMRMEJZMVW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
