import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
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
import { toastError } from "../helpers/helpers";

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
// DB CAJEROS
const DataBase = getFirestore(FirebaseApp);
const storage = getStorage();
const analytics = getAnalytics(FirebaseApp);
const auth = getAuth(FirebaseApp);

const errorAlert = (errorMsg) => {
  toast.error(`Error: ${errorMsg}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export async function getAllCajeros() {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionCajeros = collection(DataBase, "cajeros");
    // traemos los docs (array cajeros)
    const response = await getDocs(collectionCajeros);
    // devolvemos objeto con la data, y asignamos el ID
    let cajeros = response.docs.map((cajero) => {
      return {
        ...cajero.data(),
        id: cajero.id,
      };
    });
    let copyCajeros = [...cajeros];
    let sortCajerosByPos = copyCajeros.sort((a, b) => a.pos - b.pos);
    return sortCajerosByPos;
  } catch (error) {
    errorAlert(error);
  }
}

export async function postCajeros(cajero) {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionRef = collection(DataBase, "cajeros");
    // promesa para añadir documento
    const docRef = await addDoc(collectionRef, cajero);
    return {
      ...cajero,
      id: docRef.id,
    };
  } catch (error) {
    errorAlert(error);
  }
}

export function setUser(email, password) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch(() => {});
}

// ACTUALIZAR CAJERO }
export async function updateCajeroInfo(cajeroId, newCajero) {
  const docRef = doc(DataBase, "cajeros", cajeroId);
  try {
    await updateDoc(docRef, newCajero);
  } catch (error) {
    toastError(error);
  }
}

export async function updateAllCajeros(arrayCajeros) {
  for (let cajero of arrayCajeros) {
    // const docRef = doc(DataBase, "cajeros", cajero.id);
    // updateDoc(docRef, cajero);
    await updateDoc(doc(DataBase, "cajeros", cajero.id), cajero);
  }
}

export async function deleteCajero(cajero) {
  await deleteDoc(doc(DataBase, "cajeros", cajero.id));
  if (cajero.imagen !== null) {
    deleteImg(cajero.imagen.randomId);
  }
}

export async function uploadImgToDB(file) {
  const randomId = v4();
  const storageRef = ref(storage, randomId);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, randomId };
}

export async function deleteImg(imgId) {
  let aux = false;
  const desertRef = ref(storage, imgId);
  deleteObject(desertRef)
    .then(() => {
      console.log("Borrado correctamente");
      aux = true;
    })
    .catch(() => {
      console.log("No borrado");
    });
  return aux;
}

export async function loginWithPersistance(email, password) {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
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
    });
}

export async function signInFB(email, password) {
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

export async function monitorAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user.uid;
    } else {
      return false;
    }
  });
}

export async function logoutFB() {
  await signOut(auth);
}

//////////////////////////////////////////////////////////////

// PARTICIPANTES

// TRAER PARTICIPANTES
export async function getAllParticipants() {
  try {
    console.log("getAllParticipants()");
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const coleccionParticipantes = collection(DataBase, "participantes");
    // traemos los docs (array cajeros)
    const response = await getDocs(coleccionParticipantes);
    // devolvemos objeto con la data, y asignamos el ID
    let participantes = response.docs.map((participante) => {
      return {
        ...participante.data(),
        id: participante.id,
      };
    });
    let copiaParticipantes = [...participantes];
    let ordenarParticipantes = copiaParticipantes.sort(
      (a, b) => a.numero - b.numero
    );
    console.log("Ordenado");
    console.table(ordenarParticipantes);
    return ordenarParticipantes;
  } catch (error) {
    errorAlert(error);
  }
}

export async function postParticipant(participant) {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionRef = collection(DataBase, "participantes");
    // promesa para añadir documento
    const docRef = await addDoc(collectionRef, participant);
    return {
      ...participant,
      id: docRef.id,
    };
  } catch (error) {
    errorAlert(error);
  }
}

export async function deleteParticipantDB(participant) {
  await deleteDoc(doc(DataBase, "participantes", participant.id));
}

// OBTENER EL ULTIMO PARTICIPANTE
export const getSingleParticipant = async (id) => {
  try {
    const docRef = doc(DataBase, "participantes", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id,
      };
    }
  } catch (error) {
    toastError(error.message);
  }
};
