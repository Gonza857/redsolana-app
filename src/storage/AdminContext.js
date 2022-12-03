import { createContext, useEffect, useState } from "react";
import { deleteCajero, getAllCajeros } from "../firebase/firebase";

export const adminContext = createContext();

export const AdminContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [isSearchingCajero, setIsSearchingCajero] = useState(false);
  const [cajeros, setCajeros] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    false || localStorage.getItem("active")
  );

  // AÑADIR CAJEROS
  function addCajero(cajeroObj) {
    let copyCajeros = [...cajeros];
    copyCajeros.push(cajeroObj);
    setCajeros(copyCajeros);
  }

  // EDITAR CAJEROS
  function updateCajeros(cajerosArr) {
    setCajeros(cajerosArr);
  }

  // BUSCAR CAJERO
  function buscarCajero(cajeroData) {
    setIsSearchingCajero(true);
    setSearchedName(cajeroData.nombre);
    const search = cajeros.filter((caj) =>
      caj.nombre.includes(cajeroData.nombre)
    );
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

  useEffect(() => {
    traerCajeros();
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
    setIsSearchingCajero,
    isSearchingCajero,
    buscarCajero,
    searchResult,
    searchedName,
  };
  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};
