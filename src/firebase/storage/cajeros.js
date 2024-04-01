import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import { toastError, toastSuccess } from "../../helpers/helpers";
import { storage } from "../firebase";

// actualizar imagen del cajero
export const uploadCheckerImageDB = async (file) => {
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
};

// subir imagen del cajero
export async function uploadImgToDB(file) {
  const randomId = v4();
  const storageRef = ref(storage, randomId);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, randomId };
}

// eliminar imagen del cajero
export const deleteImg = async (imgId) => {
  let aux = false;
  const desertRef = ref(storage, imgId);
  deleteObject(desertRef).then(() => {
    aux = true;
  });
  return aux;
};
