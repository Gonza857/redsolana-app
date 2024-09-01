import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APYKEY_FIREBASE,
  authDomain: "redsolana-91cb9.firebaseapp.com",
  // authDomain: "redsolana-test.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "redsolana-91cb9.appspot.com",
  // storageBucket: "redsolana-test.appspot.com",
  messagingSenderId: "970544333838",
  // messagingSenderId: "1054889828481",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-1R1R028564",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const DATABASE = getFirestore(FirebaseApp);
export const storage = getStorage();
export const auth = getAuth(FirebaseApp);
export const firebaseAuth = () => auth;
export const messaging = getMessaging(FirebaseApp);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqY62ZJwpgV6iD3dN8Ck3EerPHa8glpEw",
//   projectId: "redsolana-test",
//   appId: "1:1054889828481:web:c3bc752bcb7044d3f4ad80"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
