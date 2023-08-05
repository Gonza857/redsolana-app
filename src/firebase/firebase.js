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
  uploadString,
} from "firebase/storage";

import { getAnalytics, logEvent } from "firebase/analytics";

import { v4 } from "uuid";

import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../helpers/helpers";

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
const DATABASE = getFirestore(FirebaseApp);
const storage = getStorage();
const analytics = getAnalytics(FirebaseApp);
const auth = getAuth(FirebaseApp);

export const firebaseAuth = () => auth;

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
    const collectionCajeros = collection(DATABASE, "cajeros");
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
    toastError(error.message);
  }
}

export async function postCajeros(cajero) {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionRef = collection(DATABASE, "cajeros");
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
  const docRef = doc(DATABASE, "cajeros", cajeroId);
  try {
    await updateDoc(docRef, newCajero);
  } catch (error) {
    toastError(error);
  }
}

export async function updateAllCajeros(arrayCajeros) {
  for (let cajero of arrayCajeros) {
    // const docRef = doc(DATABASE, "cajeros", cajero.id);
    // updateDoc(docRef, cajero);
    await updateDoc(doc(DATABASE, "cajeros", cajero.id), cajero);
  }
}

export async function deleteCajero(cajero) {
  await deleteDoc(doc(DATABASE, "cajeros", cajero.id));
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

export async function uploadCheckerImageDB(file) {
  const randomId = v4();
  const storageRef = ref(storage, randomId);
  try {
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    toastSuccess("Imagen subida correctamente");
    return { url, randomId };
  } catch (error) {
    toastError(error.message);
  }
}

export async function deleteImg(imgId) {
  let aux = false;
  const desertRef = ref(storage, imgId);
  deleteObject(desertRef).then(() => {
    aux = true;
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

export const signInFirebase = async (email, password) => {
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
};

export async function logoutFirebase() {
  try {
    await signOut(auth);
  } catch (error) {
    toastError(error.messsage);
  }
}

//////////////////////////////////////////////////////////////

// PARTICIPANTES

// TRAER PARTICIPANTES
export async function getAllParticipants() {
  try {
    const coleccionParticipantes = collection(DATABASE, "participantes");
    const response = await getDocs(coleccionParticipantes);
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
    return ordenarParticipantes;
  } catch (error) {
    toastError(error);
  }
}

export async function postParticipant(participant) {
  try {
    const collectionRef = collection(DATABASE, "participantes");
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
  await deleteDoc(doc(DATABASE, "participantes", participant.id));
}

// OBTENER EL ULTIMO PARTICIPANTE
export const getSingleParticipant = async (id) => {
  try {
    const docRef = doc(DATABASE, "participantes", id);
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

////////////////////////////////////////////////

// MANEJO DE CASINOS

export async function postCasinoImage(file) {
  try {
    const id = v4();
    const storageRef = ref(storage, `casinos/${id}`);
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    console.log("FIREBASE: Imagen subida correctamente.");
    return { url, id };
  } catch (error) {
    throw new Error("Ooops! Algo salio mal.");
  }
}

export async function deleteCasinoImage(image_id) {
  try {
    const desertRef = ref(storage, `casinos/${image_id}`);
    await deleteObject(desertRef);
    console.log("borrada correctamente");
  } catch (error) {
    throw new Error("Ooops! Algo salio mal.");
  }
}

export async function getAllCasinos() {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionCasinos = collection(DATABASE, "casinos");
    // traemos los docs (array cajeros)
    const response = await getDocs(collectionCasinos);
    // devolvemos objeto con la data, y asignamos el ID
    let casinos = response.docs.map((casino) => {
      return {
        ...casino.data(),
        id: casino.id,
      };
    });
    return casinos;
  } catch (error) {
    errorAlert(error);
  }
}

export async function deleteCasino(casino) {
  try {
    await deleteDoc(doc(DATABASE, "casinos", casino.id));
  } catch (error) {
    toastError(error.message);
  }
}

export const updateCasino = async (casino) => {
  try {
    console.log(casino);
    const casinoRef = doc(DATABASE, "casinos", casino.id);
    await updateDoc(casinoRef, casino);
    console.log("FIREBASE: Actualizado correctamente.");
  } catch (error) {
    throw new Error("Ooops! Algo salio mal.");
  }
};

export async function postCasino(casino) {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionRef = collection(DATABASE, "casinos");
    // promesa para añadir documento
    const docRef = await addDoc(collectionRef, casino);
    return {
      ...casino,
      id: docRef.id,
    };
  } catch (error) {
    errorAlert(error);
  }
}

// / / / / / MANEJO DE SORTEO / / / / /

export async function getSorteo() {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const colecctionDraw = collection(DATABASE, "sorteo");
    // traemos los docs (array cajeros)
    const response = await getDocs(colecctionDraw);
    // devolvemos objeto con la data, y asignamos el ID
    let sorteo = response.docs.map((sorteo) => {
      return {
        ...sorteo.data(),
        id: sorteo.id,
      };
    });
    return sorteo;
  } catch (error) {
    errorAlert(error);
  }
}

export async function updateDraw(sorteoData) {
  const docRef = doc(DATABASE, "sorteo", "sorteo1");
  try {
    await updateDoc(docRef, sorteoData);
  } catch (error) {
    toastError(error);
  }
}

export async function updateBooleanArray(newBooleanArray) {
  const docRef = doc(DATABASE, "sorteo", "sorteo1");
  try {
    await updateDoc(docRef, { slots: newBooleanArray });
  } catch (error) {
    toastError(error);
  }
}

export async function updateParticipantsArray(newParticipantsArray) {
  const docRef = doc(DATABASE, "sorteo", "sorteo1");
  try {
    await updateDoc(docRef, { participants: newParticipantsArray });
  } catch (error) {
    toastError(error);
  }
}

export async function postSorteoImage(file) {
  try {
    const randomId = v4();
    const storageRef = ref(storage, `sorteo/${randomId}`);
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    return { url, randomId };
  } catch (error) {}
}
