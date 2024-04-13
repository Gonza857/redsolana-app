import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "../firebase";
import { toastError } from "../../helpers/helpers";

/**
 * Sube imagen del cronograma, formato data:x64.
 * @param {String} file
 * @returns
 */
export const postScheduleImage = async (file) => {
  try {
    const storageRef = ref(storage, `cronograma/scheduleImage`);
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    toastError("Ooops! Algo salio mal.");
  }
};

/**
 * Elimina imagen del cronograma en firebase.
 */
export const deleteScheduleImage = async () => {
  try {
    const desertRef = ref(storage, `cronograma/scheduleImage`);
    await deleteObject(desertRef);
  } catch (error) {
    toastError("Ooops! Algo salio mal.");
  }
};

/**
 * Trae imagen desde firebase del cronograma.
 * @returns url
 */
export const getScheduleImage = async () => {
  try {
    const storageRef = ref(storage, `cronograma/scheduleImage`);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    return null;
  }
};
