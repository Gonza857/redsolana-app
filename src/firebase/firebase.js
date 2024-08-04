import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APYKEY_FIREBASE,
  authDomain: "redsolana-91cb9.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "redsolana-91cb9.appspot.com",
  messagingSenderId: "970544333838",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-1R1R028564",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const DATABASE = getFirestore(FirebaseApp);
export const storage = getStorage();
export const auth = getAuth(FirebaseApp);
export const firebaseAuth = () => auth;
export const messaging = getMessaging(FirebaseApp);
