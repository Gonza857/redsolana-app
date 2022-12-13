import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { v4 } from "uuid";

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
const storage = getStorage(FirebaseApp);

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
      // const user = userCredential.user;
      // console.log(userCredential);
      // console.log(userCredential.user);
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
export async function updateCajeroInfo(cajeroId, newCajero) {
  console.log("Informacion para actualizar recibida");
  console.log("Id del cajero recibido -->", cajeroId);
  console.log("Info del cajero recibido -->", newCajero);
  await updateDoc(doc(DataBase, "cajeros", cajeroId), newCajero);
  console.log("información actualizada");
}

export async function deleteCajero(cajero) {
  const deleteCajero = await deleteDoc(doc(DataBase, "cajeros", cajero.id));
  console.log(deleteCajero);
}

export async function prePostImg(file) {
  const randomId = v4();
  console.log(randomId);
  const storageRef = ref(storage, randomId);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  console.log("imagen subida");
  return { url, randomId };
}

export async function deleteImg(imgId) {
  console.log("id de la imagen recibida -->", imgId);
  const desertRef = ref(storage, imgId);
  return await deleteObject(desertRef);
}
