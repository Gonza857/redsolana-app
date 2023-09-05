import { createContext, useEffect, useState } from "react";
import {
  deleteCajero,
  deleteParticipantDB,
  getAllCajeros,
  getAllCasinos,
  getAllParticipants,
  postParticipant,
  deleteCasino,
  getSorteo,
  updateDraw,
  updateBooleanArray,
  uploadCheckerImageDB,
  signInFirebase,
  firebaseAuth,
  logoutFirebase,
  getScheduleImage,
  deleteScheduleImage,
  postScheduleImage,
} from "../firebase/firebase";
import Swal from "sweetalert2";
import { toastError, toastSuccess } from "../helpers/helpers";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

export const AdminContextProvider = (props) => {
  const navigate = useNavigate();
  // - - - - MANEJO DE ESTADOS - - - -
  /* / / / / / CRONOGRAMA / / / / / */
  const [wantsToUpdateImage, setWantsToUpdateImage] = useState(false);
  const [payScheduleImg, setPayScheduleImg] = useState(null);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  /* / / / / / FIN CRONOGRAMA / / / / / */

  /* / / / / / USUARIO / / / / / */
  const [admin, setAdmin] = useState(null);
  const [isVerifingAdmin, setIsVerifingAdmin] = useState(false);
  /* / / / / / FIN  USUARIO / / / / / */

  // ESTADO DE RESULTADO DE BUSQUEDA
  const [searchResult, setSearchResult] = useState([]);
  // ESTADO DE NOMBRE DE BUSQUEDA
  const [searchedName, setSearchedName] = useState(null);
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

  /* / / / / / CAJEROS / / / / / */

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

  // SUBIR IMAGEN DE CAJERO A DB
  const uploadCheckerImage = (file) => {
    return uploadCheckerImageDB(file);
  };

  /* / / / / / FIN CAJEROS / / / / / */

  /* / / / / / SORTEO / / / / / */

  /* INFORMACION GENERAL DEL SORTEO */

  // ESTADO SORTEO BOOLEAN
  const [sorteoActivo, setSorteoActivo] = useState(false);
  // ARRAY DE NUMEROS SORTEO
  const [sorteoArray, setSorteoArray] = useState([]);
  // OBJETO SORTEO
  const [sorteoInfo, setSorteoInfo] = useState(null);
  // LOADER SORTEO
  const [isDrawLoading, setIsDrawLoading] = useState(true);

  /* PARTICIPANTES DEL SORTEO */

  // PARTICIPANTES DEL SORTEO
  const [participants, setParticipants] = useState([]);
  // SE AGREGO ALGUNO?
  const [wasAdded, setWasAdded] = useState(false);
  // ULTIMO PARTICIPANTE AGREGADO
  const [lastParticipant, setLastParticipant] = useState(null);
  // ULTIMO PARTICIPANTE AGREGADO
  const [participantsQuantity, setParticipantsQuantity] = useState(0);

  /* PREVIEW */
  const [previewDraw, setPreviewDraw] = useState(null);
  const [previewDescription, setPreviewDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewSlots, setPreviewSlots] = useState(null);

  const participantsCounter = (copyParticipants) => {
    let counter = 0;
    let indice = 0;
    while (indice < copyParticipants.length) {
      if (copyParticipants[indice] !== null) counter++;
      indice++;
    }
    return counter;
  };

  /* / / / / / FIN SORTEO / / / / / */

  /* / / / / / CASINOS / / / / / */

  // ARRAY DE CASINOS
  const [casinos, setCasinos] = useState([]);
  // ESTADO DE LOADING
  const [isGettingCasinos, setIsGettingCasinos] = useState(true);
  const [casinoToEdit, setCasinoToEdit] = useState({});

  /* FUNCIONES */

  // GET CASINOS
  async function getCasinos() {
    try {
      const result = await getAllCasinos();
      setCasinos(result);
      setIsGettingCasinos(false);
    } catch (error) {
      toastError(error);
    }
  }

  // ELIMINAR CASINO
  const handleDeleteCasino = (casino) => {
    deleteCasino(casino).then(() => {
      toastSuccess("Eliminado correctamente");
      getCasinos();
    });
  };

  /* / / / / / FIN SORTEO / / / / / */

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
      // ("CAMBIADO DE POSICIÓN");
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

  // RESET DATOS DEL CAJERO BUSCADO
  const resetCheckerData = () => {
    setIsSearchingCajero(false);
    setSearchedName(null);
    setSearchResult(null);
  };

  // CONSOLE.TABLE CAJEROS
  const verCajerosTabla = () => {
    console.table(cajeros);
  };

  // FUNCION ELIMINAR CAJEROS
  function handleDelete(cajeroEliminado) {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar este cajero?",
      text: "Los cambios no se pueden deshacer.",
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      confirmButtonText: "Eliminar",
      reverseButtons: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
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
        Swal.fire("Cajero no elimnado", "", "info");
      }
    });
  }

  // FUNCIONES PARA SORTEO

  // SET PARTICIPANTES
  async function getParticipants() {
    try {
      const result = await getAllParticipants();
      setParticipants(result);
      markDataBaseParticipants(result);
      setIsLoading(false);
    } catch (error) {
      toastError(error);
    }
  }

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

  const markBusySlots = (participant) => {
    let { numero } = participant;
    const copyOfBooleanArray = [...sorteoArray];
    let indice = 0;
    let ocupado = false;
    while (indice < copyOfBooleanArray.length && !ocupado) {
      if (!copyOfBooleanArray[numero]) {
        copyOfBooleanArray[numero] = true;
        ocupado = true;
      }
      indice++;
    }
    return copyOfBooleanArray;
  };

  const unCheckBusySlots = (participant) => {
    let { numero } = participant;
    const copyOfBooleanArray = [...sorteoArray];
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
  };

  const addParticipant = (participant) => {
    postParticipant(participant)
      .then(() => {
        toastSuccess("Participante añadido correctamente.");
        getParticipants();
        let newBooleanArray = markBusySlots(participant);
        updateBooleanArray(newBooleanArray).then(() => {
          setSorteoArray(newBooleanArray);
        });
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  /** Función para eliminar participantes de Firebase
   * @param participant Object
   */
  const deleteParticipant = (participant) => {
    deleteParticipantDB(participant)
      .then(() => {
        toastSuccess("Participante eliminado correctamente.");
        getParticipants();
        let newBooleanArray = unCheckBusySlots(participant);
        updateBooleanArray(newBooleanArray).then(() => {
          setSorteoArray(newBooleanArray);
        });
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  const getNumberAndMarkOnTable = (participant) => {
    let { numero } = participant;
    sorteoArray[numero - 1] = true;
  };

  /** Función para controlar si se escribe un número fuera de los admitidos
   * en la tabla de numeros del sorteo
   * @param number
   * @returns boolean si es posible ocupar ese espacio
   */
  const isNumberAvaible = (number) => {
    let indice = 0;
    let puedeOcupar = false;
    if (number > sorteoArray.length - 1 || number < 0) {
      return -1;
    } else {
      while (indice < sorteoArray.length) {
        if (!sorteoArray[number]) {
          puedeOcupar = true;
          break;
        }
        indice++;
      }
    }
    return puedeOcupar;
  };

  // Yanina, Mega, Yanina riberos, 373

  const markOnBooleanArray = (participant) => {
    let { numero } = participant;
    let copyOfBooleanArray = [...sorteoArray];
    copyOfBooleanArray[numero] = true;
    setSorteoArray(copyOfBooleanArray);
    updateBooleanArray(copyOfBooleanArray);
  };

  // MANEJO DE CASINOS

  const setSorteo = () => {
    getSorteo().then((sorteo) => {
      // SETEAR OBJETO SORTEO
      console.log(sorteo);
      setSorteoInfo(sorteo[0]);
      // SETEAR ESTADO
      setSorteoActivo(sorteo[0].isActive);
      // SETEAR ARRAY DE BOOLEAN
      setSorteoArray(sorteo[0].slots);
      setIsDrawLoading(false);
    }, []);
  };

  const getSorteoAgain = () => {
    getSorteo()
      .then((sorteo) => {
        // SETEAR ESTADO
        setSorteoActivo(sorteo[0].isActive);
        // SETEAR ARRAY DE BOOLEAN
        setSorteoArray(sorteo[0].slots);
        // SETEAR OBJETO SORTEO
        setSorteoInfo(sorteo[0]);
        setIsDrawLoading(false);
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  const deleteDraw = () => {
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
        resetDraw();
      }
    });
  };

  const resetDraw = () => {
    const emptyDraw = {
      isActive: false,
      slots: null,
      image: null,
      description: null,
    };

    for (let i = 0; i < participants.length; i++) {
      deleteParticipantDB(participants[i]).catch((error) => {
        toastError(error.message);
      });
    }
    updateDraw(emptyDraw).then(() => {
      Swal.fire(
        "¡Eliminado!",
        "El sorteo se eliminó correctamente.",
        "success"
      );
    });
  };

  // MANEJO DE LOGIN
  const adminSignIn = (email, pass) => {
    setIsVerifingAdmin(true);
    signInFirebase(email, pass)
      .then((firebaseUser) => {
        toastSuccess("Sesión iniciada correctamente.");
        setAdmin(firebaseUser);
        setIsAdmin(true);
        setIsVerifingAdmin(false);
      })
      .catch((error) => {
        toastError(error.message);
      });
  };

  const keepSession = () => {
    onAuthStateChanged(firebaseAuth(), (user) => {
      if (user) {
        setIsVerifingAdmin(false);
        setAdmin(user);
        setIsAdmin(user.emailVerified);
      }
    });
  };

  const logout = () => {
    logoutFirebase().then(() => {
      setAdmin(null);
      setIsAdmin(false);
      toastSuccess("Cerraste sesión correctamente");
    });
  };

  /**
   * Actualiza imagen del cronograma, eliminando y subiendo si la actualiza y subiendo si agrega nueva.
   * @param {String} newImageX64
   */
  const handlePayScheduleImage = (newImageX64) => {
    setIsLoadingSchedule(true);
    if (!wantsToUpdateImage) {
      deleteScheduleImage().then(() => {
        postScheduleImage(newImageX64).then(() => {
          setPayScheduleImg(newImageX64);
          toastSuccess("Imagen actualizada correctamente.");
          setIsLoadingSchedule(false);
          navigate("/admin");
        });
      });
    } else {
      postScheduleImage(newImageX64).then(() => {
        toastSuccess("Imagen actualizada correctamente.");
        setPayScheduleImg(newImageX64);
        setIsLoadingSchedule(false);
        navigate("/admin");
      });
    }
  };

  /**
   * Solo elimina imagen del cronograma y deja su valor en null.
   */
  const firstDeleteScheduleImage = () => {
    setIsLoadingSchedule(true);
    deleteScheduleImage().then(() => {
      toastSuccess("Imagen actualizada correctamente.");
      setIsLoadingSchedule(false);
      setPayScheduleImg(null);
      navigate("/admin");
    });
  };

  /**
   * Trae imagen del cronograma, si no hay, será null y se vera reflejado en la interfaz
   */
  const getCronograma = async () => {
    try {
      let getImageFromSchedule = await getScheduleImage();
      if (getImageFromSchedule === 0) {
        setPayScheduleImg(null);
      } else {
        setPayScheduleImg(getImageFromSchedule);
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  useEffect(() => {
    // CALCULA Y SETEA LOS CUPOS OCUPADOS
    if (participants?.length > 0)
      setParticipantsQuantity(participantsCounter(participants));
  }, [participants]);

  // useEffect Montado
  useEffect(() => {
    // Traemos data del sorteo.
    setSorteo();
    // Traemos cajeros.
    traerCajeros();
    // Traemos participantes del sorteo
    getParticipants();
    // Vigilar sesión (admin)
    keepSession();
    // Traemos casinos.
    getCasinos();
    // Traemos imagen del cronograma
    getCronograma();
  }, []);

  const value = {
    cajeros,
    setCajeros,
    traerCajeros,
    handleDelete,
    addCajero,
    updateCajeros,
    isAdmin,
    setIsAdmin,
    resetCheckerData, // RESETEAR BUSQUEDA
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
    participants,
    addParticipant,
    sorteoArray,

    isNumberAvaible,
    deleteParticipant,
    setLastParticipant,
    lastParticipant,
    wasAdded,
    setWasAdded,
    casinos,
    isGettingCasinos, // ESTADO LOADER
    handleDeleteCasino,
    getCasinos,
    setPreviewDraw, //sorteo
    setSorteo, // GET AND SET SORTEO DB
    previewDraw,
    setPreviewSlots,
    previewSlots,
    setPreviewImage,
    previewImage,
    setPreviewDescription,
    previewDescription,
    sorteoInfo,
    getSorteoAgain,
    deleteDraw, // NO SE XD TODO:
    resetDraw, // RESET SORTEO (VUELVE VALORES A NULOS/VACIOS)
    isDrawLoading, // ESTADO DE CARGA DE SORTEO
    setIsDrawLoading, // SET ESTADO DE CARGA DE SORTEO
    markOnBooleanArray, // AGREGAR PARTICIPANTES
    participantsQuantity, // CANTIDAD DE PARTICIPANTES INSCRIPTOS
    // CAJEROS
    uploadCheckerImage, // SUBIR IMAGEN CAJEROS
    adminSignIn, // FUNCION PARA INICIAR SESION
    logout, // CERRAR SESION
    isVerifingAdmin, // ESTADO DE VERIFIACIÓN ADMIN
    //  CASINOS
    setCasinoToEdit, // SETTER CASINO PARA EDITAR
    casinoToEdit, // INFO CASINO PARA EDITAR
    payScheduleImg, // IMAGEN CRONOGRAMA
    setWantsToUpdateImage,
    handlePayScheduleImage,
    isLoadingSchedule,
    setIsLoadingSchedule,
    firstDeleteScheduleImage,
  };

  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};
