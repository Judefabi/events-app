// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChs68LyupZlH_7g8x3bUko8HJm0L-9cyc",
  authDomain: "events-424620.firebaseapp.com",
  projectId: "events-424620",
  storageBucket: "events-424620.appspot.com",
  messagingSenderId: "583936903924",
  appId: "1:583936903924:web:511c0b0e59efb06df7aca1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export const userRef = collection(db, "users");
export const eventsRef = collection(db, "events");
