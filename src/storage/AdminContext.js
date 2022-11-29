import { createContext, useState } from "react";

export const adminContext = createContext();

export const AdminContextProvider = (props) => {
  const [cajeros, setCajeros] = useState([]);

  // AÑADIR CAJEROS
  function addCajero(cajeroObj) {
    let ultimoId = cantidadCajeros();
    console.log(ultimoId);
    if (ultimoId === undefined) {
      const newCajero = {
        ...cajeroObj,
        id: 1,
      };
      console.log(newCajero);
      let copyCajeros = [...cajeros];
      copyCajeros.push(newCajero);
      setCajeros(copyCajeros);
    } else {
      const newCajero = {
        ...cajeroObj,
        id: ultimoId,
      };
      let copyCajeros = [...cajeros];
      copyCajeros.push(newCajero);
      setCajeros(copyCajeros);
    }
  }

  // EDITAR CAJEROS
  function updateCajeros(cajerosArr) {
    setCajeros(cajerosArr);
  }

  // FETCH CAJEROS
  async function traerCajeros() {
    try {
      let resolve = await fetch("./data/data.json");
      let result = await resolve.json();
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
  }

  function cantidadCajeros() {
    if (cajeros.length > 0) {
      let ultimo = cajeros.length - 1;
      let lastCajero = cajeros[ultimo];
      const { id } = lastCajero;
      return id + 1;
    }
  }

  const value = {
    cajeros,
    addCajero,
    traerCajeros,
    handleDelete,
    cantidadCajeros,
    updateCajeros,
  };
  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};
