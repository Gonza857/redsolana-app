import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toastError } from "../../helpers/helpers";
import { auth } from "../firebase";

export const setUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {})
    .catch(() => {});
};

export const loginWithPersistance = async (email, password) => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      if (error.code === "auth/too-many-requests") {
        throw new Error(
          "Muchos intentos de inicio de sesión, tu cuenta esta bloqueda. Intentalo de nuevo más tarde."
        );
      } else if (error.code === "auth/user-not-found") {
        throw new Error("Usuario incorrecto o no encontrado.");
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Contraseña incorrecta.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Formato de e-mail invalido.");
      } else {
        throw new Error("Intentalo de nuevo más tarde.");
      }
    });
};

export const signInFirebase = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    if (error.code === "auth/too-many-requests") {
      throw new Error(
        "Muchos intentos de inicio de sesión, tu cuenta esta bloqueda. Intentalo de nuevo más tarde."
      );
    } else if (error.code === "auth/user-not-found") {
      throw new Error("Usuario incorrecto o no encontrado.");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Contraseña incorrecta.");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("Formato de e-mail invalido.");
    } else {
      throw new Error("Intentalo de nuevo más tarde.");
    }
  }
};

export async function logoutFirebase() {
  try {
    await signOut(auth);
  } catch (error) {
    toastError(error.messsage);
  }
}
