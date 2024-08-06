import { v4 } from "uuid";
import { DATABASE, storage } from "../firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { toastError, toastSuccess } from "../helpers/helpers";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default class Firebase {
  // REQUESTS
  static async getRequests() {
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
  }

  // CASINOS
  static async updateCasino(casino) {
    try {
      const casinoRef = doc(DATABASE, "casinos", casino.id);
      await updateDoc(casinoRef, casino);
    } catch (error) {
      toastError("Ooops! Algo salio mal.");
    }
  }
  static async getCasinos() {
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
  }

  // CASHIERS
  static async getCashiers() {
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
  static async postCashier(cajero) {
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

  static async deleteCashier(cashier) {
    await deleteDoc(doc(DATABASE, "cajeros", cashier.id));
    if (cashier.imagen !== null) {
      this.deleteImg(cashier.imagen.randomId);
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
  static async getDraw() {
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
      return sorteo[0];
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
  static async deleteImg(imgId) {
    let aux = false;
    const desertRef = ref(storage, imgId);
    deleteObject(desertRef).then(() => {
      aux = true;
    });
    return aux;
  }
}
