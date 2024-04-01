import { toastError } from "../../helpers/helpers";
import { DATABASE } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const getAllCasinos = async () => {
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
    toastError(error.message);
  }
};

export const deleteCasino = async (casino) => {
  try {
    await deleteDoc(doc(DATABASE, "casinos", casino.id));
  } catch (error) {
    toastError(error.message);
  }
};

export const postCasino = async (casino) => {
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
    toastError(error);
  }
};

export const updateCasino = async (casino) => {
  try {
    const casinoRef = doc(DATABASE, "casinos", casino.id);
    await updateDoc(casinoRef, casino);
  } catch (error) {
    toastError("Ooops! Algo salio mal.");
  }
};
