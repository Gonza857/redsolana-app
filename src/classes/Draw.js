import Swal from "sweetalert2";
import { postParticipant } from "../firebase/database/sorteo";
import { toastError, toastSuccess } from "../helpers/helpers";
import Firebase from "./Firebase";

export default class Draw {
  constructor({ participants, slots, description, image, isActive }) {
    this._id = 0;
    this._participants = participants;
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
    for (const p of this.participants) {
      Firebase.deleteParticipant(p).catch((error) => toastError(error.message));
    }
    Firebase.updateDraw(new Draw()).then(() =>
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
    let { numero } = participant;
    const copyOfBooleanArray = this.slots;
    let indice = 0;
    let unCheck = false;
    while (indice < copyOfBooleanArray.length && !unCheck) {
      if (copyOfBooleanArray[numero]) {
        copyOfBooleanArray[numero] = false;
        unCheck = true;
      }
      indice++;
    }
    return copyOfBooleanArray;
  }

  isSlotAvailable(number) {
    let indice = 0;
    let puedeOcupar = false;
    if (number > this.slots.length - 1 || number < 0) {
      return -1;
    } else {
      while (indice < this.slots.length) {
        if (!this.slots[number]) {
          puedeOcupar = true;
          break;
        }
        indice++;
      }
    }
    return puedeOcupar;
  }

  markSlotAsTrue(participant) {
    if (participant !== null) this._slots[participant.numero - 1] = true;
  }

  markSlotPerParticipant() {
    for (let participant of this.participants) {
      this.markSlotAsTrue(participant);
    }
  }

  getParticipansQuantity() {
    return this.participants.length;
  }

  async addParticipant(participant) {
    postParticipant(participant)
      .then(() => {
        toastSuccess("Participante añadido correctamente.");
        return true;
        // getParticipants();
        // let newBooleanArray = markBusySlots(participant);
        // updateBooleanArray(newBooleanArray).then(() => {
        //   setSorteoArray(newBooleanArray);
        // });
      })
      .catch((error) => {
        toastError(error.message);
        return false;
      });
  }

  async deleteParticipant(participant) {
    Firebase.deleteParticipant(participant)
      .then(() => {
        // toastSuccess("Participante eliminado correctamente.");
        // getParticipants();
        let newBooleanArray = this.unCheckBusySlots(participant);
        Firebase.updateDrawBooleanArray(newBooleanArray).then(() => {
          //   setSorteoArray(newBooleanArray);
        });
      })
      .catch((error) => {
        toastError(error.message);
      });
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
}

// Getter y Setter para enlace
// get enlace() {
//     return this._enlace;
//   }

//   set enlace(value) {
//     this._enlace = value;
//   }
