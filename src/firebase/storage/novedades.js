import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { toastError } from "../../helpers/helpers";
import { storage } from "../firebase";

const STORAGE_PATH = "novedades";

/**
 * Sube imagen de la novedad, formato data:x64.
 * @param {String} file
 * @returns
 */
export const postNovedadImg = async (file) => {
  try {
    const storageRef = ref(storage, `${STORAGE_PATH}/newsImage`);
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    toastError(error.message);
  }
};

/**
 * Elimina imagen de novedad en firebase.
 */
export const deleteNovedadImg = async () => {
  try {
    const desertRef = ref(storage, `${STORAGE_PATH}/newsImage`);
    await deleteObject(desertRef);
  } catch (error) {
    toastError(error.message);
  }
};

/**
 * Trae imagen desde firebase de la novedad.
 * @returns url
 */
export const getNovedadImg = async () => {
  try {
    const storageRef = ref(storage, `${STORAGE_PATH}/newsImage`);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    return null;
  }
};
