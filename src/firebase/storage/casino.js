import { v4 } from "uuid";
import { storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { toastError } from "../../helpers/helpers";

export const postCasinoImage = async (file) => {
  try {
    const id = v4();
    const storageRef = ref(storage, `casinos/${id}`);
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    return { url, id };
  } catch (error) {
    toastError("Ooops! Algo salio mal.");
  }
};

export const deleteCasinoImage = async (image_id) => {
  try {
    const desertRef = ref(storage, `casinos/${image_id}`);
    await deleteObject(desertRef);
  } catch (error) {
    toastError("Ooops! Algo salio mal.");
  }
};
