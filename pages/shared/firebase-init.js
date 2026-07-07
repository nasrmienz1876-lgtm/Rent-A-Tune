import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaPAwIv5VPwTLGZcN3SoQqzNYR9_K9TWg",
  authDomain: "rent-a-tune-4b0ac.firebaseapp.com",
  projectId: "rent-a-tune-4b0ac",
  storageBucket: "rent-a-tune-4b0ac.firebasestorage.app",
  messagingSenderId: "64171879823",
  appId: "1:64171879823:web:86377bdd34e77d7eaf6ffa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
