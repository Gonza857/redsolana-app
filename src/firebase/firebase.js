import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

export function setUser(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(userCredential);
      console.log(userCredential.user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
}

export async function loginUser(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    if (error.code === "auth/too-many-requests") {
      throw new Error(
        "Muchos intentos de inicio de sesión, tu cuenta esta bloqueda. Intentalo de nuevo más tarde."
      );
    } else if (error.code === "auth/user-not-found") {
      throw new Error("Usuario incorrecto o no encontrado.");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Contraseña incorrecta.");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Formato de e-mail invalido.");
    } else {
      console.log(error.code);
      throw new Error("Intentalo de nuevo más tarde.");
    }
  }
}

// ACTUALIZAR CAJERO }
export async function updateCajeroInfo(cajeroUpdated) {
  console.log(cajeroUpdated);
  const docRef = doc(DataBase, "cajeros", cajeroUpdated.id);
  const updateInfo = await updateDoc(docRef, cajeroUpdated);
  console.log(updateInfo);
}

export async function deleteCajero(cajero) {
  const deleteCajero = await deleteDoc(doc(DataBase, "cajeros", cajero.id));
  console.log(deleteCajero);
}
