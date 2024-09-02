import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { askForDeleteDraw, toastError, toastSuccess } from "../helpers/helpers";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  logoutFirebase,
  signInFirebase,
} from "../firebase/authentication/login";
import {
  deleteScheduleImage,
  postScheduleImage,
} from "../firebase/storage/cronograma";
import { getScheduleImage } from "../firebase/storage/cronograma";
import { firebaseAuth } from "../firebase/firebase";
import moment from "moment";

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

export const solana = new Solana();

const deleteAllDrawParticipantsFromDB = () => {
  let couldDelete = false;
  let eliminados = 0;
  for (let i = 0; i < solana.draw.participants.length; i++) {
    Firebase.deleteParticipant(solana.draw.participants[i])
      .then(() => {
        eliminados++;
      })
      .catch((error) => {
        toastError(error.message);
      });
  }
  if (eliminados === solana.draw.participants.length) couldDelete = true;
  return couldDelete;
};

export const AdminContextProvider = (props) => {
  const navigate = useNavigate();
  const fb = new Firebase();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminAction, setIsAdminAction] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [isVerifingAdmin, setIsVerifingAdmin] = useState(false);

  /* ------ ESTADOS REVISADOS ------ */

  // ESTADO DE MENU ABIERTO
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // CASINOS
  const [casinos, setCasinos] = useState([]);
  const [casinoToEdit, setCasinoToEdit] = useState({});

  // CASHIERS
  const [cincoChicos, setCincoChicos] = useState([]);
  const [cashiers, setCashiers] = useState([]);
  const [searchedName, setSearchedName] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  // DRAW
  const [participants, setParticipants] = useState([]);
  const [draw, setDraw] = useState(null);
  const [sorteoActivo, setSorteoActivo] = useState(false);

  // REQUESTS
  const [requests, setRequests] = useState(null);

  // LOADERS
  // BUSCANDO CASINO - OK
  const [isGettingCasinos, setIsGettingCasinos] = useState(false);
  // CARGANDO SORTEO - OK
  const [isDrawLoading, setIsDrawLoading] = useState(true);
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

  const abrir = async () => {
    try {
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
        // Loaders
        setIsLoading(false);
        setIsDrawLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    abrir();
    keepSession();
  }, []);

  const c_deleteCashier = (cashier) => {
    Swal.fire(askForDeleteCashier).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        let cashierIndex = solana.getCashierIndexById(cashier._id);
        let copyCashiers = [...solana.cajeros];
        copyCashiers.splice(cashierIndex, 1);
        Firebase.deleteCashier(cashier._id).then(() => {
          c_getCashiers();
          toastSuccess("Cajero eliminado correctamente");
        });
      } else if (result.isDenied) {
        Swal.fire("Cajero no elimnado", "", "info");
      }
    });
  };

  const c_getCashiers = () => {
    Firebase.getCashiers().then((r) => {
      solana.cajeros = solana.orderCashiersPos(r);
      setCashiers(solana.cajeros);
      setIsLoading(false);
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

  // DRAW
  const c_postDrawImg = async (img) => {
    return await solana.draw.postImage(img);
  };
  const c_updateDraw = async (drawData) => {
    let result = await solana.draw.updateDraw(drawData);
    solana.getDrawAgain().then(() => {
      setDraw(solana.draw);
    });
    return result;
  };
  const c_deleteDraw = () => {
    askForDeleteDraw().then((r) => {
      if (r) {
        resetDraw();
        // navigate("/admin")
      }
    });
  };
  const c_getDrawParticipants = async () => {
    setIsLoading(true);
    Firebase.getParticipants().then(() => {
      solana.getDrawAgain().then((r) => {
        setDraw(solana.draw);
        setParticipants(solana.draw.participants);
        setIsLoading(false);
      });
    });
  };

  const resetDraw = async () => {
    let emptyDraw = {
      _slots: null,
      _description: null,
      _image: null,
      _isActive: false,
    };

    // Elimina participante por participante - Boolean
    let isResultOk = deleteAllDrawParticipantsFromDB();

    // Actualiza objeto sorteo
    isResultOk = solana.draw.updateDraw(emptyDraw);

    if (isResultOk && solana.draw.image !== null) {
      // Elimina imagen
      isResultOk = await solana.draw.deleteImage(solana.draw.image.randomId);
    }

    if (isResultOk) {
      solana.getDrawAgain().then(() => {
        setDraw(solana.draw);
      });
    }
  };

  // CASINOS
  const c_addCasino = async (casino, previewImage) => {
    const result = await Firebase.postCasinoImage(previewImage);
    if (result != undefined) {
      let { url, id } = result;
      casino._image = { url, id };
      Firebase.postCasino({ ...casino })
        .then((c) => {
          window.scrollTo(0, 0);
          toastSuccess("Casino cargado correctamente");
          navigate("/admin/casinos");
          abrir();
        })
        .catch((error) => toastError(error.message));
    }
  };

  const c_handleDeleteCasino = (casino) => {
    Firebase.deleteCasino({ ...casino })
      .then(() => {
        toastSuccess("Eliminado correctamente");
        navigate("/admin/casinos");
        abrir();
      })
      .catch((error) => toastError(error.message));
  };

  const c_getCasinoToEdit = (id) => {
    let c = solana.getCasinoById(id);
    if (c) {
      setCasinoToEdit(c);
    }
  };

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

  const scrollToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      navigate(`/#${id}`);
    }, 500);
  };

  const setLoader = (state) => {
    if (state === "EMPEZANDO") {
      setIsAdminAction(true);
    } else if (state === "TERMINANDO") {
      setSuccessState(true);
      setTimeout(() => {
        setIsAdminAction(false);
      }, 2500);
    }
  };

  useEffect(() => {
    // CALCULA Y SETEA LOS CUPOS OCUPADOS
    if (participants?.length > 0)
      setParticipantsQuantity(participantsCounter(participants));
  }, [participants]);

  const value = {
    setLoader,
    solana,
    fb,
    // ESTADOS
    casinos,
    cashiers,
    cincoChicos,
    isLoading,
    isDrawLoading,
    isAdminAction,
    successState,
    // SETTERS ESTADOS
    setIsLoading,
    setCashiers,
    setIsDrawLoading,
    setIsAdminAction,
    setSuccessState,
    // CAJEROS
    searchedName, // nombre del buscado
    c_searchCashier, // funcion de contexto
    c_resetCashierData, // funcion de contexto
    c_getCashiers,
    c_deleteCashier,

    // DRAW
    c_postDrawImg,
    c_updateDraw,
    c_deleteDraw,
    c_getDrawParticipants,
    // --- ACTIVADOS PARA HACER FUNCIONAR -> LUEGO OPTIMIZAR
    setPreviewDraw, // pre-vista del sorteo
    setPreviewImage,
    setDraw,
    draw,
    // casinos
    c_addCasino,
    c_handleDeleteCasino,
    c_getCasinoToEdit,
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
    isOpenMenu, // OK
    setIsOpenMenu,
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
    isGettingCasinos, // ESTADO LOADER
    // handleDeleteCasino,
    // getCasinos,
    // setSorteo, // GET AND SET SORTEO DB
    previewDraw,
    setPreviewSlots,
    previewSlots,
    previewImage,
    setPreviewDescription,
    previewDescription,
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
  };

  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};

export const SolicitudesContextProvider = (props) => {
  const [pendientes, setPendientes] = useState([]);
  const [requests, setRequests] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState([]);

  const c_getRequests = () => {
    setHistorial(solana.orderResolvedRequestByRecentTime());
    setPendientes(solana.orderUnresolvedRequestByRecentTime());
    setRequests([
      ...solana.orderResolvedRequestByRecentTime(),
      ...solana.orderUnresolvedRequestByRecentTime(),
    ]);
  };

  useEffect(() => {
    const abrir = async () => {
      let r = await solana.initialize();
      try {
        if (solana.state) {
          setPlatforms(r[5]);
          c_getRequests();
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    abrir();
  }, []);

  const c_handlePostPlatform = async (platform) => {
    return await Firebase.postPlatform(platform).then((addedPlatform) => {
      toastSuccess("¡Plataforma agregada correctamante!");
      setPlatforms([...platforms, addedPlatform]);
    });
  };

  const enviarPendienteHaciaHistorial = (solicitud) => {
    let { _id } = solicitud;
    let copyOfPendientes = [...pendientes];
    let indiceParaMover = copyOfPendientes.findIndex(
      (pendiente) => pendiente._id === _id
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
    solicitud._state = true;
    solicitud._solved = `${moment().format("LTS")} - ${moment().format("L")}`;
    Firebase.updateRequest(solicitud._id, solicitud).then(() => {
      toastSuccess("Actualizada correctamente.");
      enviarPendienteHaciaHistorial(solicitud);
    });
  };

  const deleteThisSolicitud = (solicitud) => {
    let copyOfHistorial = [...historial];
    let indiceBuscado = copyOfHistorial.findIndex(
      (thisSolicitud) => (thisSolicitud._id = solicitud._id)
    );
    copyOfHistorial.splice(indiceBuscado, 1);
    setHistorial(copyOfHistorial);
    Firebase.deleteRequest(solicitud)
      .then(() => {
        toastSuccess("Solicitud eliminada correctamente");
      })
      .catch(() => {
        toastError("Error");
      });
  };

  const devolverHistorialHaciaPendiente = (solicitud) => {
    solicitud._state = false;
    solicitud._solved = null;
    enviarHistorialHaciaPendiente(solicitud);

    Firebase.updateRequest(solicitud._id, solicitud).then(() => {
      toastSuccess("Actualizada correctamente.");
    });
  };

  const changePlatformVisibility = (platform) => {
    let copyOfPlatforms = [...platforms];
    let buscado = copyOfPlatforms.findIndex((p) => p._id === platform._id);
    copyOfPlatforms[buscado] = platform;
    setPlatforms(copyOfPlatforms);
  };

  const deletePlatform = (platform) => {
    Firebase.deletePlataform(platform).then(() => {
      toastSuccess("Eliminada correctamente.");
      let copyOfPlatforms = [...platforms];
      let buscado = copyOfPlatforms.findIndex((p) => p._id === platform._id);
      copyOfPlatforms.splice(buscado, 1);
      setPlatforms(copyOfPlatforms);
    });
  };

  const handleUpdate = async (e, platform) => {
    platform._isVisible = e.target.checked;
    await Firebase.updatePlatform(platform);
    changePlatformVisibility(platform);
    toastSuccess("Visibilidad actualizada correctamente");
    return true;
  };

  const value = {
    // news
    c_handlePostPlatform,
    // old - revisar
    enviarPendienteHaciaHistorial,
    enviarHistorialHaciaPendiente,
    actualizarEstadoSolicitud,
    devolverHistorialHaciaPendiente,
    deleteThisSolicitud,
    // VERIF
    c_getRequests,
    pendientes,
    solana,
    requests,
    // SAS
    setPlatforms,
    changePlatformVisibility,
    deletePlatform,
    handleUpdate,
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
