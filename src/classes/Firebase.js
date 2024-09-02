import { v4 } from "uuid";
import { DATABASE, storage } from "../firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
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

const PLATFORMS_COLLECTION_PATH = "solicitudes-plataformas";

export default class Firebase {
  // PLATFORMS
  static async getPlatforms() {
    try {
      const platforms = collection(DATABASE, PLATFORMS_COLLECTION_PATH);
      const response = await getDocs(platforms);
      let plataformas = response.docs.map((plataforma) => {
        return {
          ...plataforma.data(),
          _id: plataforma.id,
        };
      });
      return plataformas;
    } catch (error) {
      toastError(error.message);
    }
  }

  static async postPlatform(plataform) {
    try {
      const collectionRef = collection(DATABASE, PLATFORMS_COLLECTION_PATH);
      const docRef = await addDoc(collectionRef, plataform);
      return {
        ...plataform,
        _id: docRef.id,
      };
    } catch (error) {
      toastError(error.message);
    }
  }

  static async updatePlatform(platforma) {
    const docRef = doc(DATABASE, PLATFORMS_COLLECTION_PATH, platforma._id);
    try {
      await updateDoc(docRef, platforma);
    } catch (error) {
      toastError(error);
    }
  }

  static async deletePlataform(plataforma) {
    await deleteDoc(doc(DATABASE, PLATFORMS_COLLECTION_PATH, plataforma._id));
  }

  // REQUESTS
  static async getRequests() {
    try {
      const collectionCajeros = collection(DATABASE, "solicitudes");
      const response = await getDocs(collectionCajeros);
      let solicitudes = response.docs.map((solicitud) => {
        return {
          ...solicitud.data(),
          _id: solicitud.id,
        };
      });
      return solicitudes;
    } catch (error) {
      toastError(error.message);
    }
  }
  static async updateRequest(solicitudId, solicitud) {
    const docRef = doc(DATABASE, "solicitudes", solicitudId);
    try {
      await updateDoc(docRef, solicitud);
    } catch (error) {
      toastError(error.message);
    }
  }

  static async deleteRequest(solicitud) {
    await deleteDoc(doc(DATABASE, "solicitudes", solicitud._id));
  }
  static async postRequest(solicitud) {
    try {
      // coleccion --> referencia a la funcion base, referencia al nombre de la base
      const collectionRef = collection(DATABASE, "solicitudes");
      // promesa para añadir documento
      const docRef = await addDoc(collectionRef, solicitud);
      return {
        ...solicitud,
        _id: docRef.id,
      };
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
          _id: casino.id,
        };
      });
      return casinos;
    } catch (error) {
      toastError(error.message);
    }
  }

  static async postCasino(casino) {
    try {
      // coleccion --> referencia a la funcion base, referencia al nombre de la base
      const collectionRef = collection(DATABASE, "casinos");
      // promesa para añadir documento
      const docRef = await addDoc(collectionRef, casino);
      return {
        ...casino,
        _id: docRef.id,
      };
    } catch (error) {
      toastError(error.message);
    }
  }

  static async deleteCasino(casino) {
    try {
      await deleteDoc(doc(DATABASE, "casinos", casino._id));
    } catch (error) {
      toastError(error.message);
    }
  }

  // CASHIERS
  static async getCashiers() {
    try {
      const collectionCajeros = collection(DATABASE, "cajeros");
      const response = await getDocs(collectionCajeros);
      let cajeros = response.docs.map((cajero) => {
        return {
          ...cajero.data(),
          _id: cajero.id,
        };
      });
      let copyCajeros = [...cajeros];
      let sortCajerosByPos = copyCajeros.sort(
        (a, b) => a._position - b._position
      );
      return sortCajerosByPos;
    } catch (error) {
      toastError(error.message);
    }
  }
  static async uploadCashierImageDB(file) {
    const randomId = v4();
    try {
      const storageRef = ref(storage, `cajeros/${randomId}`);
      const fileSnapshot = await uploadBytes(storageRef, file, "data_url");
      const url = await getDownloadURL(fileSnapshot.ref);
      toastSuccess("Imagen subida correctamente");
      return { url, randomId };
    } catch (error) {
      console.error(error.message);
    }
  }

  static async deleteCashierImg(imgId) {
    let aux = false;
    const desertRef = ref(storage, `cajeros/${imgId}`);
    deleteObject(desertRef).then(() => {
      aux = true;
    });
    return aux;
  }
  static async postCashier(cajero) {
    try {
      // coleccion --> referencia a la funcion base, referencia al nombre de la base
      const collectionRef = collection(DATABASE, "cajeros");
      // promesa para añadir documento
      const docRef = await addDoc(collectionRef, cajero);
      return {
        ...cajero,
        _id: docRef.id,
      };
    } catch (error) {
      toastError(error.message);
    }
  }

  static async deleteCashierAndImage(cashier) {
    await deleteDoc(doc(DATABASE, "cajeros", cashier._id));
    if (cashier._image !== null) {
      await this.deleteImg(cashier._image.randomId);
    }
  }

  static async deleteCashier(oldCashierId) {
    await deleteDoc(doc(DATABASE, "cajeros", oldCashierId));
  }

  static async updateCashierInfo(cashierId, newCashier) {
    const docRef = doc(DATABASE, "cajeros", cashierId);
    try {
      await updateDoc(docRef, newCashier);
    } catch (error) {
      toastError(error);
    }
  }

  // DRAW
  static async updateDraw(sorteoData) {
    const docRef = doc(DATABASE, "sorteo", "0");
    try {
      await updateDoc(docRef, { ...sorteoData });
      return true;
    } catch (e) {
      toastError(e.message);
    }
  }
  static async postParticipant(participant) {
    try {
      const collectionRef = collection(DATABASE, "participantes");
      const docRef = await addDoc(collectionRef, participant);
      return {
        ...participant,
        _id: docRef.id,
      };
    } catch (error) {
      toastError(error.message);
    }
  }
  static async deleteParticipant(participant) {
    await deleteDoc(doc(DATABASE, "participantes", participant._id));
  }
  static async updateDrawBooleanArray(newBooleanArray) {
    const docRef = doc(DATABASE, "sorteo", "0");
    try {
      await updateDoc(docRef, { slots: newBooleanArray });
      return true;
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
          _id: sorteo.id,
        };
      });

      return sorteo[0];
    } catch (error) {
      toastError(error);
    }
  }
  static async getParticipants() {
    try {
      const col = collection(DATABASE, "participantes");
      const response = await getDocs(col);
      let participantes = response.docs.map((participante) => {
        return {
          ...participante.data(),
          _id: participante.id,
        };
      });
      let copiaParticipantes = [...participantes];
      let ordenarParticipantes = copiaParticipantes.sort(
        (a, b) => a._number - b._number
      );
      return ordenarParticipantes;
    } catch (error) {
      toastError(error.message);
    }
  }
  static async deleteDrawImage(id) {
    try {
      const desertRef = ref(storage, `sorteo/${id}`);
      await deleteObject(desertRef);
      toastSuccess("Imagén eliminada correctamente");
      return true;
    } catch (e) {
      toastError(e.message);
    }
  }
  static async postDrawImage(file) {
    try {
      const randomId = v4();
      const storageRef = ref(storage, `sorteo/${randomId}`);
      await uploadString(storageRef, file, "data_url");
      const url = await getDownloadURL(storageRef);
      return { url, randomId };
    } catch (error) {
      toastError(error.message);
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

  static async deleteCasinoImage(imageId) {
    try {
      const desertRef = ref(storage, `casinos/${imageId}`);
      await deleteObject(desertRef);
    } catch (error) {
      toastError(error.message);
    }
  }

  static async deleteImg(imgId) {
    let aux = false;
    const desertRef = ref(storage, `cajeros/${imgId}`);
    deleteObject(desertRef).then(() => {
      aux = true;
    });
    return aux;
  }

  static async updateAllCajeros(arrayCajeros) {
    for (let cajero of arrayCajeros) {
      // const docRef = doc(DATABASE, "cajeros", cajero.id);
      // updateDoc(docRef, cajero);
      await updateDoc(doc(DATABASE, "cajeros", cajero._id), cajero);
    }
  }
}
