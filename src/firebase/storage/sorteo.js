import { v4 } from "uuid";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toastError } from "../../helpers/helpers";

export const postSorteoImage = async (file) => {
  try {
    const randomId = v4();
    const storageRef = ref(storage, `sorteo/${randomId}`);
    await uploadString(storageRef, file, "data_url");
    const url = await getDownloadURL(storageRef);
    return { url, randomId };
  } catch (error) {
    toastError(error.message);
  }
};
