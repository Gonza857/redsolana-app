import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAK4e4YOjznBLfoupessvj8QnzNRfIULzA",
  authDomain: "redsolana-91cb9.firebaseapp.com",
  projectId: "redsolana-91cb9",
  storageBucket: "redsolana-91cb9.appspot.com",
  messagingSenderId: "970544333838",
  appId: "1:970544333838:web:a0652af3cc89f17338a85f",
};

const FirebaseApp = initializeApp(firebaseConfig);
const DataBase = getFirestore(FirebaseApp);

export async function getAllCajeros() {
  try {
    // Collection, es como una referencia que apunta a la coleccion, es como un puente entre la app y la coleccion
    // 1) Conectarse a la coleccion
    // darle la colección y a cual base de datos
    const collectionCajeros = collection(DataBase, "cajeros");
    // 2) Traer documentos existentes
    // getDocs() es una promesa
    const response = await getDocs(collectionCajeros);
    let cajeros = response.docs.map((cajero) => {
      return {
        ...cajero.data(),
        id: cajero.id,
      };
    });
    return cajeros;
  } catch (error) {
    console.log(error);
  }
}

export async function postCajeros(cajero) {
  try {
    const collectionRef = collection(DataBase, "cajeros");
    const docRef = await addDoc(collectionRef, cajero);
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
}

export function setUser() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
