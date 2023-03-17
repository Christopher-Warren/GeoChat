import { initializeApp, getApp, getApps } from "firebase/app";

import {
  getAuth,
  initializeAuth,
  PhoneAuthProvider,
  signInWithCredential,
  getReactNativePersistence,
  onAuthStateChanged,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase JS SDK >=9.x.x
// https://firebase.google.com/docs/web/setup

function firebaseInit() {
  if (!getApps().length) {
    try {
      const app = initializeApp({
        apiKey: "AIzaSyDiOnVYDYGSBGZykHw8E-fP4HILLK5F5bY",
        authDomain: "chatlink-phone-auth.firebaseapp.com",
        projectId: "chatlink-phone-auth",
        storageBucket: "chatlink-phone-auth.appspot.com",
        messagingSenderId: "250479887666",
        appId: "1:250479887666:web:8f42ccdc7cac3df264c32b",
        measurementId: "G-LWXDHS2LNC",
      });

      initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } catch (error) {
      console.log(error);
      // ignore app already initialized
    }
  } else {
    // console.log("using storage..");
  }
}

export default firebaseInit;
