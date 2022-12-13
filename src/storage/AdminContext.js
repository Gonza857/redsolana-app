import { createContext, useEffect, useState } from "react";
import { deleteCajero, getAllCajeros } from "../firebase/firebase";

export const adminContext = createContext();

export const AdminContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [isSearchingCajero, setIsSearchingCajero] = useState(false);
  const [cajeros, setCajeros] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    true || localStorage.getItem("active") //FIXME:
  );
  const [numberSection, setNumberSection] = useState(null);

  // AÑADIR CAJEROS
  function addCajero(cajeroObj) {
    let copyCajeros = [...cajeros];
    copyCajeros.push(cajeroObj);
    setCajeros([]);
    traerCajeros();
  }

  // EDITAR CAJEROS
  function updateCajeros(cajerosArr) {
    setCajeros(cajerosArr);
  }

  // BUSCAR CAJERO
  function buscarCajero(cajeroData) {
    setIsSearchingCajero(true);
    setSearchedName(cajeroData.nombre);
    const search = cajeros.filter((caj) => {
      let param = caj.nombre.toLowerCase();
      return param.includes(cajeroData.nombre);
    });
    console.log(search);
    if (search.length === 0) {
      console.log("No se encontró");
    } else {
      setSearchResult(search);
    }
  }

  // SET CAJEROS
  async function traerCajeros() {
    try {
      const result = await getAllCajeros();
      setCajeros(result);
    } catch (error) {
      console.log(error);
    }
  }

  // FUNCION ELIMINAR CAJEROS
  function handleDelete(cajeroEliminado) {
    // agregar alerta para poder confirmar antes de eliminar
    let searchPosition = cajeros.findIndex(
      (cajeroFind) => cajeroFind.id === cajeroEliminado.id
    );
    let copyCajeros = [...cajeros];
    copyCajeros.splice(searchPosition, 1);
    setCajeros(copyCajeros);
    deleteCajero(cajeroEliminado);
  }

  //
  function verificarUrl() {
    const actualUrl = window.location.href;
    console.log(actualUrl);
    return actualUrl;
  }

  useEffect(() => {
    traerCajeros();
  }, []);

  useEffect(() => {
    console.log(cajeros);
  }, [cajeros]);

  useEffect(() => {
    console.log(numberSection);
  }, [numberSection]);

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
    verificarUrl,
    numberSection,
    setNumberSection,
  };
  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};
