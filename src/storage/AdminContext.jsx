import { createContext, useEffect, useState } from "react";
import {
  deleteCajero,
  deleteParticipantDB,
  getAllCajeros,
  getAllParticipants,
  getSingleParticipant,
  monitorAuthState,
  postParticipant,
} from "../firebase/firebase";
import Swal from "sweetalert2";
import { toastError, toastSuccess, toastInfo } from "../helpers/helpers";

export const adminContext = createContext();

/**
 * Busca cajero con la misma ID
 * @param checkersArray - (array)
 * @param formData - Información tomada del formulario de busquedad
 * @returns Index del buscado
 */
function cashierFilter(cashier, cajeros) {
  let param = cashier.toLowerCase();
  let busquedad = cajeros.filter((cajero) => {
    if (cajero.nombre.toLowerCase().includes(param)) {
      return cajero;
    } else {
      return null;
    }
  });
  return busquedad;
}

/**
 * Busca cajero con la misma ID
 * @param Cajero - (object)
 * @returns Index del buscado
 */
const findCheckerID = (checker, checkersArray) => {
  return checkersArray.findIndex(
    (thisChecker) => thisChecker.id === checker.id
  );
};

const numeros = new Array(1000).fill(false);

export const AdminContextProvider = (props) => {
  // ESTADO DE RESULTADO DE BUSQUEDA
  const [searchResult, setSearchResult] = useState([]);
  // ESTADO DE NOMBRE DE BUSQUEDA
  const [searchedName, setSearchedName] = useState("");
  // ESTADO  DE BUSQUEDA
  const [isSearchingCajero, setIsSearchingCajero] = useState(false);
  // ESTADO DE ARRAY DE CAJEROS
  const [cajeros, setCajeros] = useState([]);
  // ESTADO DE ADMIN
  const [isAdmin, setIsAdmin] = useState(false);
  // ESTADO DE MENU ABIERTO
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  // ESTADO CARGA DE CAJEROS
  const [isLoading, setIsLoading] = useState(true);

  // ESTADO SORTEO
  const [sorteoActivo, setSorteoActivo] = useState(false);
  // ESTADO SORTEO
  const [participants, setParticipants] = useState([]);
  // ARRAY DE NUMEROS SORTEO
  const [sorteoArray, setSorteoArray] = useState(numeros);
  // ULTIMO NUMERO COMPRADO
  const [lastNumber, setLastNumber] = useState(0);
  // SE AGREGO ALGUNO?
  const [wasAdded, setWasAdded] = useState(false);
  // ULTIMO PARTICIPANTE AGREGADO
  const [lastParticipant, setLastParticipant] = useState(null);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary mx-2",
      cancelButton: "btn btn-danger",
      denyButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  // AÑADIR CAJEROS
  function addCajero(cajeroObj) {
    setCajeros((cajeros) => [...cajeros, cajeroObj]);
  }

  // CAMBIAR POSICIÓN DE CAJEROS
  function moveCajerosPosition(posicion, cajero, arrayCajeros) {
    /*
    CASOS:
    1) SI EL ELEMENTO NO EXISTE, OSEA ESTAMOS AGREGANDO EN UNA POSICION DESEADA
    2) SI EL ELEMENTO EXISTE, OSEA ESTAMOS CAMBIANDO LA POSICION DEL ELEMENTO
    */
    let cajeroIndex = findCheckerID(cajero, arrayCajeros);
    if (cajeroIndex === -1) {
      // CASO 1
      // console.log("AGREGADO Y CAMBIADO DE POSICIÓN");
      arrayCajeros.splice(posicion, 0, cajero);
      let newArray = [];
      arrayCajeros.forEach((caj, i) => {
        caj.pos = i;
        newArray.push(caj);
      });
      return newArray;
    } else {
      // CASO 2
      // console.log("CAMBIADO DE POSICIÓN");
      arrayCajeros.splice(cajeroIndex, 1);
      arrayCajeros.splice(posicion, 0, cajero);
      let newArray = [];
      arrayCajeros.forEach((caj, i) => {
        caj.pos = i;
        newArray.push(caj);
      });
      return newArray;
    }
  }

  // EDITAR CAJEROS
  function updateCajeros(cajerosArr) {
    setCajeros(cajerosArr);
  }

  // BUSCAR CAJERO
  function buscarCajero(cachierName) {
    setIsSearchingCajero(true);
    setSearchedName(cachierName);
    let checkerFilterArray = cashierFilter(cachierName, cajeros);
    setSearchResult(checkerFilterArray);
  }

  // SET CAJEROS
  async function traerCajeros() {
    try {
      const result = await getAllCajeros();
      setCajeros(result);
      setIsLoading(false);
    } catch (error) {
      toastError(error);
    }
  }

  // CONSOLE.TABLE CAJEROS
  const verCajerosTabla = () => {
    console.table(cajeros);
  };

  // FUNCION ELIMINAR CAJEROS
  function handleDelete(cajeroEliminado) {
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro que quieres eliminar este cajero?",
        text: "Los cambios no se pueden deshacer.",
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: "Eliminar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          let searchPosition = cajeros.findIndex(
            (cajeroFind) => cajeroFind.id === cajeroEliminado.id
          );
          let copyCajeros = [...cajeros];
          copyCajeros.splice(searchPosition, 1);
          setCajeros(copyCajeros);
          deleteCajero(cajeroEliminado);
          toastSuccess("Cajero eliminado correctamente");
        } else if (result.isDenied) {
          toastInfo("Cajero no elimnado");
        }
      });
  }

  useEffect(() => {
    traerCajeros().then(() => {
      setIsLoading(false);
    });
    getParticipants();
    setIsAdmin(() => {
      let ver = monitorAuthState();
      // if (
      //   ver === process.env.REACT_APP_USER1 ||
      //   ver === process.env.REACT_APP_USER2
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
      return true;
    });
  }, []);

  // FUNCIONES PARA SORTEO

  // SET PARTICIPANTES
  async function getParticipants() {
    try {
      const result = await getAllParticipants();
      setParticipants(result);
      markDataBaseParticipants(result);
      viewNumberTable();
      setIsLoading(false);
    } catch (error) {
      toastError(error);
    }
  }

  const viewNumberTable = () => {
    // console.table(sorteoArray);
  };

  const viewParticipantsTable = () => {
    // console.table(participants);
  };

  const markDataBaseParticipants = (arrayParticipants) => {
    for (let participant of arrayParticipants) {
      getNumberAndMarkOnTable(participant);
    }
  };

  function addLocalParticipant(participantObj) {
    setWasAdded(true);
    setLastParticipant(participantObj);
    getNumberAndMarkOnTable(participantObj);
    setParticipants((participant) => [...participant, participantObj]);
  }

  const addParticipant = async (participantObj) => {
    try {
      const agregado = await postParticipant(participantObj);
      addLocalParticipant(agregado);
    } catch (error) {
      console.log(error);
    }
  };

  const getNumberAndMarkOnTable = (participant) => {
    let { numero } = participant;
    sorteoArray[numero - 1] = true;
  };

  const isNumberAvaible = (number) => {
    let indice = 0;
    let puedeOcupar = false;
    if (number > sorteoArray.length || number < 0) {
      return -1;
    } else {
      while (indice < sorteoArray.length) {
        if (sorteoArray[number - 1] == false) {
          puedeOcupar = true;
          break;
        }
        indice++;
      }
    }

    return puedeOcupar;
  };

  const deleteParticipant = (participant) => {
    deleteParticipantDB(participant)
      .then(() => {
        toastSuccess("Participante eliminado correctamente.");
        getParticipants();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // MANEJO DE CASINOS
  const viewNewCasino = (data) => {
    console.log(data)
  }

  const value = {
    cajeros,
    setCajeros,
    traerCajeros,
    handleDelete,
    addCajero,
    updateCajeros,
    isAdmin,
    setIsAdmin,
    setIsSearchingCajero,
    isSearchingCajero,
    buscarCajero,
    searchResult,
    searchedName,
    moveCajerosPosition,
    isOpenMenu,
    setIsOpenMenu,
    verCajerosTabla,
    setIsLoading,
    isLoading,
    sorteoActivo,
    setSorteoActivo,
    getParticipants,
    participants,
    addParticipant,
    sorteoArray,
    lastNumber,
    viewNumberTable,
    viewParticipantsTable,
    isNumberAvaible,
    deleteParticipant,
    setLastParticipant,
    lastParticipant,
    wasAdded,
    setWasAdded,
    viewNewCasino
  };

  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};
