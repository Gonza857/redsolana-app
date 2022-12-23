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

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { getAnalytics, logEvent } from "firebase/analytics";

import { v4 } from "uuid";

import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APYKEY_FIREBASE,
  authDomain: "redsolana-91cb9.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "redsolana-91cb9.appspot.com",
  messagingSenderId: "970544333838",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-1R1R028564",
};

const FirebaseApp = initializeApp(firebaseConfig);
const DataBase = getFirestore(FirebaseApp);
const storage = getStorage();
const analytics = getAnalytics(FirebaseApp);

export function logearEvento() {
  logEvent(analytics, "notification_received");
}

export async function getAllCajeros() {
  try {
    const collectionCajeros = collection(DataBase, "cajeros");
    const response = await getDocs(collectionCajeros);
    let cajeros = response.docs.map((cajero) => {
      return {
        ...cajero.data(),
        id: cajero.id,
      };
    });
    let copyCajeros = [...cajeros];
    let sortCajerosByPos = copyCajeros.sort((a, b) => {
      return a.pos - b.pos;
    });
    return sortCajerosByPos;
  } catch (error) {
    toast.error(`Error: ${error}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

export async function postCajeros(cajero) {
  try {
    const collectionRef = collection(DataBase, "cajeros");
    const docRef = await addDoc(collectionRef, cajero);
    return {
      ...cajero,
      id: docRef.id,
    };
  } catch (error) {
    toast.error(`Error: ${error}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

export function setUser(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch(() => {});
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
      throw new Error("Intentalo de nuevo más tarde.");
    }
  }
}

// ACTUALIZAR CAJERO }
export async function updateCajeroInfo(cajeroId, newCajero) {

  await updateDoc(doc(DataBase, "cajeros", cajeroId), newCajero);
}

export async function updateAllCajeros(arrayCajeros) {
  console.table(arrayCajeros);
  for (let cajero of arrayCajeros) {
    const docRef = doc(DataBase, "cajeros", cajero.id);
    updateDoc(docRef, cajero);
  }
}

export async function deleteCajero(cajero) {
  await deleteDoc(doc(DataBase, "cajeros", cajero.id));
  if (cajero.imagen !== null) {
    deleteImg(cajero.imagen.randomId);
  }
}

export async function prePostImg(file) {
  const randomId = v4();
  const storageRef = ref(storage, randomId);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, randomId };
}

export async function deleteImg(imgId) {
  const desertRef = ref(storage, imgId);
  return await deleteObject(desertRef);
}
