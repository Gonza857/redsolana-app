import Swal from "sweetalert2";
import { postParticipant } from "../firebase/database/sorteo";
import { toastError, toastSuccess } from "../helpers/helpers";
import Firebase from "./Firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { DATABASE, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default class Draw {
  constructor(
    description = null,
    id = 0,
    image = null,
    isActive = false,
    slots = null
  ) {
    this._id = id;
    this._participants = [];
    this._slots = slots;
    this._description = description;
    this._image = image;
    this._isActive = isActive;
  }

  delete() {
    Swal.fire({
      title: "¿Seguro que deseas eliminar el sorteo actual?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.reset();
      }
    });
  }
  reset() {
    // llamar a firebase
    // resetar en cliente

    // for (const p of this.participants) {
    //   Firebase.deleteParticipant(p).catch((error) => toastError(error.message));
    // }

    Firebase.updateDraw(new Draw(null, null, null, null, null)).then(() =>
      toastSuccess("El sorteo se eliminó correctamente")
    );

    // const emptyDraw = {
    //   isActive: false,
    //   slots: null,
    //   image: null,
    //   description: null,
    // };
    // for (let i = 0; i < participants.length; i++) {
    //   deleteParticipantDB(participants[i]).catch((error) => {
    //     toastError(error.message);
    //   });
    // }
    // updateDraw(emptyDraw).then(() => {
    //   Swal.fire(
    //     "¡Eliminado!",
    //     "El sorteo se eliminó correctamente.",
    //     "success"
    //   );
    // });
  }
  unCheckBusySlots(participant) {
    let { _number } = participant;
    const copyOfBooleanArray = [...this._slots];
    let indice = 0;
    let unCheck = false;
    while (indice < copyOfBooleanArray.length && !unCheck) {
      if (copyOfBooleanArray[_number]) {
        copyOfBooleanArray[_number] = false;
        unCheck = true;
      }
      indice++;
    }
    return copyOfBooleanArray;
  }

  isSlotAvailable(number) {
    --number;
    // 0 - NUMBER OK
    // 1 - NUMBER IS OUTSIDE THE LIMITS 0 - SLOTS.LENGTH
    // 2 - NUMBER IS BUSY
    if (number < 0) return 1;
    if (number >= this._slots.length) return 1;
    let indice = 0;
    let puedeOcupar = 2;
    while (indice < this._slots.length) {
      if (!this._slots[number]) {
        puedeOcupar = 0;
        break;
      }
      indice++;
    }
    return puedeOcupar;
  }

  markSlotAsTrue(number) {
    this._slots[number] = true;
  }

  markSlotPerParticipant() {
    for (const participant of this._participants) {
      this.markSlotAsTrue(Number(participant._number - 1));
    }
  }

  getParticipansQuantity() {
    return this.participants.length;
  }

  getAvailableSlots() {
    let counter = 0;
    this._slots.forEach((slot) => {
      if (!slot) counter++;
    });
    return Number(counter);
  }

  updateSlotsToDB() {
    return Firebase.updateDrawBooleanArray(this._slots);
  }

  async addParticipant(participant) {
    // usar objeto FIREBASE
    let isOk = false;
    let result = await Firebase.postParticipant(participant);
    if (result !== null) {
      this._participants.push(result);
      isOk = this.markSlotAsTrue(result);
      isOk = this.updateSlotsToDB();
    }
    if (isOk) toastSuccess("Participante añadido, Tabla actualizada.");
  }

  async deleteParticipant(participant) {
    try {
      await Firebase.deleteParticipant(participant);
      let newBooleanArray = this.unCheckBusySlots(participant);
      await Firebase.updateDrawBooleanArray(newBooleanArray);
      toastSuccess("Participante eliminado correctamente.");
    } catch (e) {
      toastError(e.message);
    }
  }

  async updateDraw(sorteoData) {
    delete sorteoData._participants;
    return await Firebase.updateDraw(sorteoData);
  }

  async deleteImage(id) {
    return await Firebase.deleteDrawImage(id);
  }

  async postImage(file) {
    return await Firebase.postDrawImage(file);
  }

  // GETTERS Y SETTERS
  get participants() {
    return this._participants;
  }
  set participants(value) {
    this._participants = value;
  }
  get isActive() {
    return this._isActive;
  }
  set isActive(value) {
    this._isActive = value;
  }
  get slots() {
    return this._slots;
  }
  set slots(value) {
    this._slots = value;
  }
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }
  get image() {
    return this._image;
  }
  set image(value) {
    this._image = value;
  }
  get slots() {
    return this._slots;
  }
  set slots(value) {
    this._slots = value;
  }
}

// Getter y Setter para enlace
// get enlace() {
//     return this._enlace;
//   }

//   set enlace(value) {
//     this._enlace = value;
//   }
