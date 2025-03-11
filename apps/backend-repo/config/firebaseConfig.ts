import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const result = dotenv.config();
if (result.error) {
  console.log(`Error Loading Environment File`, result.error);
}

const firebaseConfig = {
  apiKey: process.env.EXPRESS_FIREBASE_API_KEY,
  authDomain: process.env.EXPRESS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPRESS_FIREBASE_PROJECT_ID || "project-id",
  storageBucket: process.env.EXPRESS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPRESS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPRESS_FIREBASE_APP_ID,
  measurementId: process.env.EXPRESS_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { auth, db };
