import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { toastError } from "../../helpers/helpers";
import { DATABASE } from "../firebase";
import { deleteImg } from "../storage/cajeros";

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
    toastError(error.message);
  }
}

// ACTUALIZAR CAJERO
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
