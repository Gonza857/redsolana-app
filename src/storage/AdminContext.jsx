import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toastError, toastSuccess } from "../helpers/helpers";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { deleteCajero, getAllCajeros } from "../firebase/database/cajeros";
import { uploadCheckerImageDB } from "../firebase/storage/cajeros";
import { deleteCasino, getAllCasinos } from "../firebase/database/casinos";
import {
  deleteParticipantDB,
  getAllParticipants,
  getSorteo,
  postParticipant,
  updateBooleanArray,
  updateDraw,
} from "../firebase/database/sorteo";
import {
  logoutFirebase,
  signInFirebase,
} from "../firebase/authentication/login";
import {
  deleteScheduleImage,
  postScheduleImage,
} from "../firebase/storage/cronograma";
import { getScheduleImage } from "../firebase/storage/cronograma";
import { firebaseAuth, messaging } from "../firebase/firebase";
import {
  deleteSolicitud,
  getTodasLasSolicitudes,
  updateSolicitud,
} from "../firebase/database/solicitudes";
import moment from "moment";
import {
  deletePlataforma,
  getTodasLasPlataformas,
  updatePlataforma,
} from "../firebase/database/plataformas";
import {
  deleteNovedadImg,
  getNovedadImg,
  postNovedadImg,
} from "../firebase/storage/novedades";
import Solana from "../classes/Solana";
import Firebase from "../classes/Firebase";

export const adminContext = createContext();

export const solicitudesContext = createContext();

export const cronoAndNewsContext = createContext();

const askForDeleteCashier = {
  title: "¿Estas seguro que quieres eliminar este cajero?",
  text: "Los cambios no se pueden deshacer.",
  showDenyButton: true,
  denyButtonText: `Cancelar`,
  confirmButtonText: "Eliminar",
  reverseButtons: true,
};

// /**
//  * Buscar cajeros por nombre
//  * @param cashierName - Nombre del cajero
//  * @returns Array de coincidencias
//  */
// const cashierFilter = (cashierName, Casino) => {
//   return Casino.getCashiersByName(cashierName.toLowerCase());

//   // let busquedad = arrayCajeros.filter((cajero) => {
//   //   if (cajero.nombre.toLowerCase().includes(param)) {
//   //     return cajero;
//   //   } else {
//   //     return null;
//   //   }
//   // });

//   // return busquedad;
// };

/**
//  * Busca cajero con la misma ID
//  * @param Cajero - (object)
//  * @returns Index del cajero buscado
//  */
// const findCheckerID = (cashier, Casino) => {
//   return Casino.getCashierIndexById(cashier);
// };

export const solana = new Solana();

export const AdminContextProvider = (props) => {
  const navigate = useNavigate();
  const fb = new Firebase();

  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  /* ------ ESTADOS REVISADOS ------ */

  // ESTADO DE MENU ABIERTO
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // CASINOS
  const [casinos, setCasinos] = useState([]);

  // CASHIERS
  const [cincoChicos, setCincoChicos] = useState([]);
  const [cashiers, setCashiers] = useState([]);
  const [searchedName, setSearchedName] = useState(null);

  // DRAW
  const [participants, setParticipants] = useState([]);
  const [draw, setDraw] = useState(null);

  // REQUESTS
  const [requests, setRequests] = useState(null);

  // LOADERS
  // BUSCANDO CASINO - OK
  const [isGettingCasinos, setIsGettingCasinos] = useState(false);
  // CARGANDO SORTEO - OK
  const [isDrawLoading, setIsDrawLoading] = useState(false);
  // BUSCANDO CAJERO - OK
  const [isSearchingCajero, setIsSearchingCajero] = useState(false);

  // MANEJO DE LOGIN
  const adminSignIn = (email, pass) => {
    setIsVerifingAdmin(true);
    signInFirebase(email, pass)
      .then(() => {
        toastSuccess("Sesión iniciada correctamente.");
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
        setIsAdmin(user.emailVerified);
      }
    });
    // BGN66FLIYjnVnO6c13K6Ad2GXIU_oPcbz8kXvkyS5ED5A0iWaXVzhRGiOm2SBE7DIVHhwsfUhXQ34cxU73g4Z5U
  };

  const logout = () => {
    logoutFirebase().then(() => {
      setIsAdmin(false);
      toastSuccess("Cerraste sesión correctamente");
    });
  };

  useEffect(() => {
    const abrir = async () => {
      try {
        console.log(solana.state);
        let r = await solana.initialize();
        if (solana.state) {
          //Traemos cajeros
          setCincoChicos(r[0]);
          setCashiers(r[1]);
          // Traemos casinos
          setCasinos(r[2]);
          setRequests(r[3]);
          setDraw(r[4]);
          setParticipants(r[4].participants);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    abrir();
  }, []);

  const c_deleteCashier = (cashier) => {
    console.log("Eliminando a: " + cashier.nombre);
    Swal.fire(askForDeleteCashier).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let cashierIndex = solana.getCashierIndexById(cashier.id);
        let copyCashiers = solana.cajeros;
        copyCashiers.splice(cashierIndex, 1);
        Firebase.deleteCashier(cashier);
        c_reGetCashiers();
        toastSuccess("Cajero eliminado correctamente");
      } else if (result.isDenied) {
        Swal.fire("Cajero no elimnado", "", "info");
      }
    });
  };

  const c_reGetCashiers = () => {
    Firebase.getCashiers().then((r) => {
      solana.cajeros = r;
      setCashiers(r);
    });
  };

  // CASHIER - search cashiers including the param
  const c_searchCashier = (cashierName) => {
    setIsSearchingCajero(true);
    setSearchedName(cashierName);
    let checkerFilterArray = solana.getCashiersByName(
      cashierName.toLowerCase()
    );
    setSearchResult(checkerFilterArray);
  };

  // RESET DATOS DEL CAJERO BUSCADO
  const c_resetCashierData = () => {
    setIsSearchingCajero(false);
    setSearchedName(null);
    setSearchResult(null);
  };

  // //    FUNCION ELIMINAR CAJEROS
  // function handleDelete(cajeroEliminado) {
  //   Swal.fire({
  //     title: "¿Estas seguro que quieres eliminar este cajero?",
  //     text: "Los cambios no se pueden deshacer.",
  //     showDenyButton: true,
  //     denyButtonText: `Cancelar`,
  //     confirmButtonText: "Eliminar",
  //     reverseButtons: true,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       let searchPosition = cajeros.findIndex(
  //         (cajeroFind) => cajeroFind.id === cajeroEliminado.id
  //       );
  //       let copyCajeros = [...cajeros];
  //       copyCajeros.splice(searchPosition, 1);
  //       setCajeros(copyCajeros);
  //       deleteCajero(cajeroEliminado);
  //       toastSuccess("Cajero eliminado correctamente");
  //     } else if (result.isDenied) {
  //       Swal.fire("Cajero no elimnado", "", "info");
  //     }
  //   });
  // }

  // Estado de usuario
  const [isVerifingAdmin, setIsVerifingAdmin] = useState(false);

  // ESTADO DE RESULTADO DE BUSQUEDA
  const [searchResult, setSearchResult] = useState([]);
  // ESTADO DE NOMBRE DE BUSQUEDA
  // ESTADO  DE BUSQUEDA
  // ESTADO DE ARRAY DE CAJEROS
  // ESTADO DE ADMIN

  // ESTADO CARGA DE CAJEROS

  /* / / / / / CAJEROS / / / / / */
  // SET CAJEROS
  // async function traerCajeros() {
  //   try {
  //     let cincoCaras = [...cincoChicos];
  //     const result = await getAllCajeros();
  //     setCajeros(result);
  //     setIsLoading(false);
  //     let limit = 6;
  //     let actual = 0;
  //     while (actual < limit) {
  //       cincoCaras.push(result[actual]);
  //       actual++;
  //     }
  //     setCincoChicos(cincoCaras);
  //   } catch (error) {
  //     toastError(error);
  //   }
  // }

  // // SUBIR IMAGEN DE CAJERO A DB
  // const uploadCheckerImage = (file) => {
  //   return uploadCheckerImageDB(file);
  // };

  /* / / / / / FIN CAJEROS / / / / / */

  /* / / / / / SORTEO / / / / / */

  /* INFORMACION GENERAL DEL SORTEO */

  // ESTADO SORTEO BOOLEAN
  const [sorteoActivo, setSorteoActivo] = useState(false);
  // ARRAY DE NUMEROS SORTEO
  const [sorteoArray, setSorteoArray] = useState([]);
  // OBJETO SORTEO
  // LOADER SORTEO

  /* PARTICIPANTES DEL SORTEO */

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

  const [casinoToEdit, setCasinoToEdit] = useState({});

  /* FUNCIONES */

  // GET CASINOS
  // async function getCasinos() {
  //   let result = [];
  //   try {
  //     const result = await getAllCasinos();
  //     setCasinos(result);
  //     setIsGettingCasinos(false);
  //   } catch (error) {
  //     toastError(error);
  //   }
  //   return result;
  // }

  // ELIMINAR CASINO - PASADA al OBJETO
  // const handleDeleteCasino = (casino) => {
  //   deleteCasino(casino).then(() => {
  //     toastSuccess("Eliminado correctamente");
  //     getCasinos();
  //   });
  // };

  /* / / / / / FIN SORTEO / / / / / */

  // // AÑADIR CAJEROS
  // const addCajero = (cajeroObj) => {
  //   setCajeros((cajeros) => [...cajeros, cajeroObj]);
  // };

  // // CAMBIAR POSICIÓN DE CAJEROS
  // function moveCajerosPosition(posicion, cajero, arrayCajeros) {
  //   /*
  //   CASOS:
  //   1) Cajero no existe previamente, agregamos en la posición deseada.
  //   2) Cajero ya existe, cambiamos su posición
  //   */
  //   let cajeroIndex = findCheckerID(cajero, arrayCajeros);
  //   if (cajeroIndex === -1) {
  //     // CASO 1
  //     //("AGREGADO Y CAMBIADO DE POSICIÓN");
  //     arrayCajeros.splice(posicion, 0, cajero);
  //     let newArray = [];
  //     arrayCajeros.forEach((caj, i) => {
  //       caj.pos = i;
  //       newArray.push(caj);
  //     });
  //     return newArray;
  //   } else {
  //     // CASO 2
  //     // ("CAMBIADO DE POSICIÓN");
  //     arrayCajeros.splice(cajeroIndex, 1);
  //     arrayCajeros.splice(posicion, 0, cajero);
  //     let newArray = [];
  //     arrayCajeros.forEach((caj, i) => {
  //       caj.pos = i;
  //       newArray.push(caj);
  //     });
  //     return newArray;
  //   }
  // }

  // // EDITAR CAJEROS
  // function updateCajeros(cajerosArr) {
  //   setCajeros(cajerosArr);
  // }

  // FUNCION ELIMINAR CAJEROS
  // function handleDelete(cajeroEliminado) {
  //   Swal.fire({
  //     title: "¿Estas seguro que quieres eliminar este cajero?",
  //     text: "Los cambios no se pueden deshacer.",
  //     showDenyButton: true,
  //     denyButtonText: `Cancelar`,
  //     confirmButtonText: "Eliminar",
  //     reverseButtons: true,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       let searchPosition = cajeros.findIndex(
  //         (cajeroFind) => cajeroFind.id === cajeroEliminado.id
  //       );
  //       let copyCajeros = [...cajeros];
  //       copyCajeros.splice(searchPosition, 1);
  //       setCajeros(copyCajeros);
  //       deleteCajero(cajeroEliminado);
  //       toastSuccess("Cajero eliminado correctamente");
  //     } else if (result.isDenied) {
  //       Swal.fire("Cajero no elimnado", "", "info");
  //     }
  //   });
  // }

  // FUNCIONES PARA SORTEO

  // SET PARTICIPANTES
  // async function getParticipants() {
  //   try {
  //     const result = await getAllParticipants();
  //     setParticipants(result);
  //     markDataBaseParticipants(result);
  //     setIsLoading(false);
  //   } catch (error) {
  //     toastError(error);
  //   }
  // }

  // const markDataBaseParticipants = (arrayParticipants) => {
  //   for (let participant of arrayParticipants) {
  //     getNumberAndMarkOnTable(participant);
  //   }
  // };

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

  // const unCheckBusySlots = (participant) => {
  //   let { numero } = participant;
  //   const copyOfBooleanArray = [...sorteoArray];
  //   let indice = 0;
  //   let unCheck = false;
  //   while (indice < copyOfBooleanArray.length && !unCheck) {
  //     if (copyOfBooleanArray[numero]) {
  //       copyOfBooleanArray[numero] = false;
  //       unCheck = true;
  //     }
  //     indice++;
  //   }
  //   return copyOfBooleanArray;
  // };

  // const addParticipant = (participant) => {
  //   // postParticipant(participant)
  //   //   .then(() => {
  //   //     toastSuccess("Participante añadido correctamente.");
  //   //     getParticipants();
  //   //     let newBooleanArray = markBusySlots(participant);
  //   //     updateBooleanArray(newBooleanArray).then(() => {
  //   //       setSorteoArray(newBooleanArray);
  //   //     });
  //   //   })
  //   //   .catch((error) => {
  //   //     toastError(error.message);
  //   //   });
  //   Casino.addDrawParticipant(participant);
  // };

  /** Función para eliminar participantes de Firebase
   * @param participant Object
  //  */
  // const deleteParticipant = (participant) => {
  //   deleteParticipantDB(participant)
  //     .then(() => {
  //       toastSuccess("Participante eliminado correctamente.");
  //       getParticipants();
  //       let newBooleanArray = unCheckBusySlots(participant);
  //       updateBooleanArray(newBooleanArray).then(() => {
  //         setSorteoArray(newBooleanArray);
  //       });
  //     })
  //     .catch((error) => {
  //       toastError(error.message);
  //     });
  // };

  // const getNumberAndMarkOnTable = (participant) => {
  //   let { numero } = participant;
  //   sorteoArray[numero - 1] = true;
  // };

  /** Función para controlar si se escribe un número fuera de los admitidos
   * en la tabla de numeros del sorteo
   * @param number
   * @returns boolean si es posible ocupar ese espacio
   */
  // const isNumberAvaible = (number) => {
  //   let indice = 0;
  //   let puedeOcupar = false;
  //   if (number > sorteoArray.length - 1 || number < 0) {
  //     return -1;
  //   } else {
  //     while (indice < sorteoArray.length) {
  //       if (!sorteoArray[number]) {
  //         puedeOcupar = true;
  //         break;
  //       }
  //       indice++;
  //     }
  //   }
  //   return puedeOcupar;
  // };

  // Yanina, Mega, Yanina riberos, 373

  const markOnBooleanArray = (participant) => {
    let { numero } = participant;
    let copyOfBooleanArray = [...sorteoArray];
    copyOfBooleanArray[numero] = true;
    setSorteoArray(copyOfBooleanArray);
    updateBooleanArray(copyOfBooleanArray);
  };

  // MANEJO DE CASINOS

  // const setSorteo = () => {
  //   getSorteo().then((sorteo) => {
  //     // SETEAR OBJETO SORTEO
  //     setSorteoInfo(sorteo[0]);
  //     // SETEAR ESTADO
  //     setSorteoActivo(sorteo[0].isActive);
  //     // SETEAR ARRAY DE BOOLEAN
  //     setSorteoArray(sorteo[0].slots);
  //     setIsDrawLoading(false);
  //   }, []);
  // };

  // const getSorteoAgain = () => {
  //   getSorteo()
  //     .then((sorteo) => {
  //       // SETEAR ESTADO
  //       setSorteoActivo(sorteo[0].isActive);
  //       // SETEAR ARRAY DE BOOLEAN
  //       setSorteoArray(sorteo[0].slots);
  //       // SETEAR OBJETO SORTEO
  //       setSorteoInfo(sorteo[0]);
  //       setIsDrawLoading(false);
  //     })
  //     .catch((error) => {
  //       toastError(error.message);
  //     });
  // };

  // const deleteDraw = () => {
  //   Swal.fire({
  //     title: "¿Seguro que deseas eliminar el sorteo actual?",
  //     text: "Esta acción no se puede deshacer",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       resetDraw();
  //     }
  //   });
  // };

  // const resetDraw = () => {
  //   const emptyDraw = {
  //     isActive: false,
  //     slots: null,
  //     image: null,
  //     description: null,
  //   };

  //   for (let i = 0; i < participants.length; i++) {
  //     deleteParticipantDB(participants[i]).catch((error) => {
  //       toastError(error.message);
  //     });
  //   }
  //   updateDraw(emptyDraw).then(() => {
  //     Swal.fire(
  //       "¡Eliminado!",
  //       "El sorteo se eliminó correctamente.",
  //       "success"
  //     );
  //   });
  // };

  const scrollToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      navigate(`/#${id}`);
    }, 500);
  };

  useEffect(() => {
    // CALCULA Y SETEA LOS CUPOS OCUPADOS
    if (participants?.length > 0)
      setParticipantsQuantity(participantsCounter(participants));
  }, [participants]);

  const value = {
    solana,
    fb,
    casinos,
    cashiers,
    // CAJEROS
    searchedName, // nombre del buscado
    c_searchCashier, // funcion de contexto
    c_resetCashierData, // funcion de contexto
    c_reGetCashiers,
    c_deleteCashier,
    // cajeros,
    // setCajeros,
    // handleDelete,
    // addCajero,
    // updateCajeros,
    isAdmin,
    setIsAdmin,
    // resetCheckerData, // RESETEAR BUSQUEDA
    setIsSearchingCajero,
    isSearchingCajero,
    // buscarCajero,
    searchResult,
    searchedName,
    isOpenMenu, // OK
    setIsOpenMenu,
    setIsLoading,
    isLoading,
    sorteoActivo,
    setSorteoActivo,
    participants,
    sorteoArray,

    // isNumberAvaible,
    // deleteParticipant,
    setLastParticipant,
    lastParticipant,
    wasAdded,
    setWasAdded,
    casinos,
    isGettingCasinos, // ESTADO LOADER
    // handleDeleteCasino,
    // getCasinos,
    // setPreviewDraw, //sorteo
    // setSorteo, // GET AND SET SORTEO DB
    previewDraw,
    setPreviewSlots,
    previewSlots,
    setPreviewImage,
    previewImage,
    setPreviewDescription,
    previewDescription,
    // sorteoInfo,
    // getSorteoAgain,
    // deleteDraw, // NO SE XD TODO:
    // resetDraw, // RESET SORTEO (VUELVE VALORES A NULOS/VACIOS)
    isDrawLoading, // ESTADO DE CARGA DE SORTEO
    setIsDrawLoading, // SET ESTADO DE CARGA DE SORTEO
    markOnBooleanArray, // AGREGAR PARTICIPANTES
    participantsQuantity, // CANTIDAD DE PARTICIPANTES INSCRIPTOS
    // CAJEROS
    // uploadCheckerImage, // SUBIR IMAGEN CAJEROS
    adminSignIn, // FUNCION PARA INICIAR SESION
    logout, // CERRAR SESION
    isVerifingAdmin, // ESTADO DE VERIFIACIÓN ADMIN
    //  CASINOS
    setCasinoToEdit, // SETTER CASINO PARA EDITAR
    casinoToEdit, // INFO CASINO PARA EDITAR
    scrollToSection,
    cincoChicos,
  };

  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};

export const SolicitudesContextProvider = (props) => {
  const [pendientes, setPendientes] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    getSolicitudes();
    getPlataformas();
  }, []);

  const getPlataformas = () => {
    setIsLoading(true);
    getTodasLasPlataformas().then((result) => {
      setPlatforms(result);
      setIsLoading(false);
    });
  };

  const getSolicitudes = () => {
    setIsLoading(true);
    getTodasLasSolicitudes().then((pedidos) => {
      let noRes = [];
      let res = [];
      pedidos.forEach((pedido) => {
        if (!pedido.state) {
          noRes.push(pedido);
        } else {
          res.push(pedido);
        }
      });
      setHistorial(res);
      setPendientes(noRes);
      setIsLoading(false);
    });
  };

  const enviarPendienteHaciaHistorial = (solicitud) => {
    let { id } = solicitud;
    let copyOfPendientes = [...pendientes];
    let indiceParaMover = copyOfPendientes.findIndex(
      (pendiente) => pendiente.id === id
    );
    let eliminado = copyOfPendientes[indiceParaMover];
    copyOfPendientes.splice(indiceParaMover, 1);
    let copyOfHistorial = [...historial];
    copyOfHistorial.push(eliminado);
    setPendientes(copyOfPendientes);
    setHistorial(copyOfHistorial);
  };

  const enviarHistorialHaciaPendiente = (solicitud) => {
    let { id } = solicitud;
    let copyOfHistorial = [...historial];
    let indiceParaMover = copyOfHistorial.findIndex(
      (pendiente) => pendiente.id === id
    );
    let buscado = copyOfHistorial[indiceParaMover];
    copyOfHistorial.splice(indiceParaMover, 1);
    let copyOfPendientes = [...pendientes];
    copyOfPendientes.push(buscado);
    setPendientes(copyOfPendientes);
    setHistorial(copyOfHistorial);
  };

  const actualizarEstadoSolicitud = (solicitud) => {
    solicitud.state = true;
    solicitud.solved = `${moment().format("LTS")} - ${moment().format("L")}`;
    enviarPendienteHaciaHistorial(solicitud);

    updateSolicitud(solicitud.id, solicitud).then(() => {
      toastSuccess("Actualizada correctamente.");
    });
  };

  const deleteThisSolicitud = (solicitud) => {
    let copyOfHistorial = [...historial];
    let indiceBuscado = copyOfHistorial.findIndex(
      (thisSolicitud) => (thisSolicitud.id = solicitud.id)
    );
    copyOfHistorial.splice(indiceBuscado, 1);
    setHistorial(copyOfHistorial);
    deleteSolicitud(solicitud)
      .then(() => {
        toastSuccess("Solicitud eliminada correctamente");
      })
      .catch(() => {
        toastError("Error");
      });
  };

  const devolverHistorialHaciaPendiente = (solicitud) => {
    solicitud.state = false;
    solicitud.solved = null;
    enviarHistorialHaciaPendiente(solicitud);

    updateSolicitud(solicitud.id, solicitud).then(() => {
      toastSuccess("Actualizada correctamente.");
    });
  };

  const changePlatformVisibility = (platform) => {
    let copyOfPlatforms = [...platforms];
    let buscado = copyOfPlatforms.findIndex((p) => p.id === platform.id);
    copyOfPlatforms[buscado] = platform;
    setPlatforms(copyOfPlatforms);
  };

  const deletePlatform = (platform) => {
    deletePlataforma(platform).then(() => {
      toastSuccess("Eliminada correctamente.");
      let copyOfPlatforms = [...platforms];
      let buscado = copyOfPlatforms.findIndex((p) => p.id === platform.id);
      copyOfPlatforms.splice(buscado, 1);
      setPlatforms(copyOfPlatforms);
    });
  };

  const handleUpdate = (e, platform) => {
    updatePlataforma(platform).then(() => {
      changePlatformVisibility(platform);
      platform.visible = e.target.checked;
    });
  };

  const value = {
    enviarPendienteHaciaHistorial,
    enviarHistorialHaciaPendiente,
    actualizarEstadoSolicitud,
    devolverHistorialHaciaPendiente,
    deleteThisSolicitud,
    getSolicitudes,
    setPlatforms,
    changePlatformVisibility,
    deletePlatform,
    handleUpdate,
    pendientes,
    historial,
    isLoading,
    platforms,
  };
  return (
    <solicitudesContext.Provider value={value}>
      {props.children}
    </solicitudesContext.Provider>
  );
};

export const CronoAndNewsContextProvider = (props) => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null); // mismo estado para crono y news
  const [newsImage, setNewsImage] = useState(null);
  const [scheduleImage, setScheduleImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = (event) => {
      fileContent = event.target.result;
      setPreviewImage(fileContent);
    };
    reader.readAsDataURL(file);
    return fileContent;
  };

  /**
   * Actualiza imagen de novedades, eliminando y subiendo si la actualiza y subiendo si agrega nueva.
   */
  const handleNovedadImg = () => {
    setIsLoadingImage(true);
    if (newsImage != null && previewImage != null) {
      deleteNovedadImg().then(() => {
        postNovedadImg(previewImage).then(() => {
          toastSuccess("Imagen actualizada correctamente.");
          setIsLoadingImage(false);
          setPreviewImage(null);
          setNewsImage(previewImage);
          navigate("/admin");
        });
      });
    } else {
      postNovedadImg(previewImage).then(() => {
        toastSuccess("Imagen actualizada correctamente.");
        setIsLoadingImage(false);
        setPreviewImage(null);
        setNewsImage(previewImage);
        navigate("/admin");
      });
    }
  };

  /**
   * Solo elimina imagen de novedades y deja su valor en null.
   */
  const deleteNovedad = () => {
    setIsLoadingImage(true);
    deleteNovedadImg().then(() => {
      toastSuccess("Imagen eliminada correctamente.");
      setNewsImage(null);
      setIsLoadingImage(false);
      setPreviewImage(null);
      navigate("/admin");
    });
  };

  /**
   * Trae imagen del cronograma, si no hay, será null y se vera reflejado en la interfaz.
   */
  const getCronograma = async () => {
    try {
      let scheduleImg = await getScheduleImage();
      if (scheduleImg === 0) {
        setScheduleImage(null);
      } else {
        setScheduleImage(scheduleImg);
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  const getNovedades = async () => {
    try {
      let novedadImg = await getNovedadImg();
      if (novedadImg === 0) {
        setNewsImage(null);
      } else {
        setNewsImage(novedadImg);
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  /**
   * Actualiza imagen del cronograma, eliminando y subiendo si la actualiza y subiendo si agrega nueva.
   * @param {String} newImageX64
   */
  const handleCronogramaImg = () => {
    setIsLoadingImage(true);
    if (scheduleImage != null && previewImage != null) {
      deleteScheduleImage().then(() => {
        postScheduleImage(previewImage)
          .then(() => {
            setScheduleImage(previewImage);
            toastSuccess("Imagen actualizada correctamente.");
            setIsLoadingImage(false);
            setPreviewImage(null);
            navigate("/admin");
          })
          .catch((error) => toastError(error.message));
      });
    } else {
      postScheduleImage(previewImage)
        .then(() => {
          toastSuccess("Imagen actualizada correctamente.");
          setScheduleImage(previewImage);
          setIsLoadingImage(false);
          setPreviewImage(null);
          navigate("/admin");
        })
        .catch((error) => toastError(error.message));
    }
  };

  const deleteSchedule = () => {
    setIsLoadingImage(true);
    deleteScheduleImage().then(() => {
      toastSuccess("Imagen eliminada correctamente.");
      setScheduleImage(null);
      setIsLoadingImage(false);
      setPreviewImage(null);
      navigate("/admin");
    });
  };

  useEffect(() => {
    getCronograma();
    getNovedades();
  }, []);

  const value = {
    previewImage,
    setPreviewImage,
    newsImage,
    setNewsImage,
    handleFileUpload,
    handleNovedadImg,
    handleCronogramaImg,
    getNovedades,
    deleteNovedad,
    deleteSchedule,
    isLoadingImage,
    scheduleImage,
  };

  return (
    <cronoAndNewsContext.Provider value={value}>
      {props.children}
    </cronoAndNewsContext.Provider>
  );
};
