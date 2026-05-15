import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoGFcskXPam7DJCacJ71wlK8bMCbpbyuM",
  authDomain: "cargo-tracking-9c0aa.firebaseapp.com",
  projectId: "cargo-tracking-9c0aa",
  storageBucket: "cargo-tracking-9c0aa.firebasestorage.app",
  messagingSenderId: "862830098744",
  appId: "1:862830098744:web:8a6e222ea1e497e4bda9cd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
