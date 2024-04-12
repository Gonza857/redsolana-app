import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { DATABASE } from "../firebase";
import { toastError } from "../../helpers/helpers";

const COLLECTION_PATH = "solicitudes-plataformas";

export const postPlataforma = async (plataforma) => {
  try {
    const collectionRef = collection(DATABASE, COLLECTION_PATH);
    const docRef = await addDoc(collectionRef, plataforma);
    return {
      ...plataforma,
      id: docRef.id,
    };
  } catch (error) {
    toastError(error.message);
  }
};

export const getTodasLasPlataformas = async () => {
  try {
    const collectionCajeros = collection(DATABASE, COLLECTION_PATH);
    const response = await getDocs(collectionCajeros);
    let plataformas = response.docs.map((plataforma) => {
      return {
        ...plataforma.data(),
        id: plataforma.id,
      };
    });
    return plataformas;
  } catch (error) {
    toastError(error.message);
  }
};

export const updatePlataforma = async (platforma) => {
  const docRef = doc(DATABASE, COLLECTION_PATH, platforma.id);
  try {
    await updateDoc(docRef, platforma);
  } catch (error) {
    toastError(error);
  }
};

export const deletePlataforma = async (plataforma) => {
  await deleteDoc(doc(DATABASE, COLLECTION_PATH, plataforma.id));
};
