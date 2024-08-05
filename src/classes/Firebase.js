import { v4 } from "uuid";
import { DATABASE, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toastError, toastSuccess } from "../helpers/helpers";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export class Firebase {
  // CASINOS
  static async updateCasino(casino) {
    try {
      const casinoRef = doc(DATABASE, "casinos", casino.id);
      await updateDoc(casinoRef, casino);
    } catch (error) {
      toastError("Ooops! Algo salio mal.");
    }
  }

  // CASHIERS
  static async getAllCajeros() {
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

  // DRAW
  static async updateDraw(sorteoData) {
    const docRef = doc(DATABASE, "sorteo", "sorteo1");
    try {
      await updateDoc(docRef, sorteoData);
    } catch (error) {
      toastError(error);
    }
  }
  static async deleteParticipant(participant) {
    await deleteDoc(doc(DATABASE, "participantes", participant.id));
  }
  static async updateDrawBooleanArray(newBooleanArray) {
    const docRef = doc(DATABASE, "sorteo", "sorteo1");
    try {
      await updateDoc(docRef, { slots: newBooleanArray });
    } catch (error) {
      toastError(error);
    }
  }
  // IMAGES
  static async postCasinoImage(file) {
    try {
      const id = v4();
      const storageRef = ref(storage, `casinos/${id}`);
      await uploadString(storageRef, file, "data_url");
      const url = await getDownloadURL(storageRef);
      return { url, id };
    } catch (error) {
      toastError("Ooops! Algo salio mal.");
    }
  }
  static async uploadCheckerImageDB(file) {
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
}
