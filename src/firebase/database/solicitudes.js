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

export const postSolicitud = async (solicitud) => {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionRef = collection(DATABASE, "solicitudes");
    // promesa para añadir documento
    const docRef = await addDoc(collectionRef, solicitud);
    return {
      ...solicitud,
      id: docRef.id,
    };
  } catch (error) {
    toastError(error.message);
  }
};

export const getTodasLasSolicitudes = async () => {
  try {
    // coleccion --> referencia a la funcion base, referencia al nombre de la base
    const collectionCajeros = collection(DATABASE, "solicitudes");
    // traemos los docs (array cajeros)
    const response = await getDocs(collectionCajeros);
    // devolvemos objeto con la data, y asignamos el ID
    let solicitudes = response.docs.map((solicitud) => {
      return {
        ...solicitud.data(),
        id: solicitud.id,
      };
    });
    // let copyCajeros = [...solicitudes];
    // let sortCajerosByPos = copyCajeros.sort((a, b) => a.pos - b.pos);
    // return sortCajerosByPos;
    return solicitudes;
  } catch (error) {
    toastError(error.message);
  }
};

export const updateSolicitud = async (solicitudId, solicitud) => {
  const docRef = doc(DATABASE, "solicitudes", solicitudId);
  try {
    await updateDoc(docRef, solicitud);
  } catch (error) {
    toastError(error);
  }
};

export const deleteSolicitud = async (solicitud) => {
  await deleteDoc(doc(DATABASE, "solicitudes", solicitud.id));
};
