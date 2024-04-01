import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { DATABASE } from "../firebase";
import { toastError } from "../../helpers/helpers";

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
    toastError(error);
  }
}

export const updateDraw = async (sorteoData) => {
  const docRef = doc(DATABASE, "sorteo", "sorteo1");
  try {
    await updateDoc(docRef, sorteoData);
  } catch (error) {
    toastError(error);
  }
};

export const updateBooleanArray = async (newBooleanArray) => {
  const docRef = doc(DATABASE, "sorteo", "sorteo1");
  try {
    await updateDoc(docRef, { slots: newBooleanArray });
  } catch (error) {
    toastError(error);
  }
};

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
    toastError(error.message);
  }
}

export const postParticipant = async (participant) => {
  try {
    const collectionRef = collection(DATABASE, "participantes");
    const docRef = await addDoc(collectionRef, participant);
    return {
      ...participant,
      id: docRef.id,
    };
  } catch (error) {
    toastError(error.message);
  }
};

export const updateParticipantsArray = async (newParticipantsArray) => {
  const docRef = doc(DATABASE, "sorteo", "sorteo1");
  try {
    await updateDoc(docRef, { participants: newParticipantsArray });
  } catch (error) {
    toastError(error);
  }
};

export const deleteParticipantDB = async (participant) => {
  await deleteDoc(doc(DATABASE, "participantes", participant.id));
};

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
