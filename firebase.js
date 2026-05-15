import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YAHAN_APIKEY",
  authDomain: "YAHAN_AUTHDOMAIN",
  projectId: "YAHAN_PROJECTID",
  storageBucket: "YAHAN_BUCKET",
  messagingSenderId: "YAHAN_MSGID",
  appId: "YAHAN_APPID"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
