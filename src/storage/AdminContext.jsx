import { createContext, useEffect, useState } from "react";
import { deleteCajero, getAllCajeros } from "../firebase/firebase";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const adminContext = createContext();

export const AdminContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [isSearchingCajero, setIsSearchingCajero] = useState(false);
  const [cajeros, setCajeros] = useState([]);
  const [isAdmin, setIsAdmin] = useState(
    false || localStorage.getItem("active")
  );
  const [numberSection, setNumberSection] = useState(null);

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
    let copyCajeros = [...cajeros];
    copyCajeros.push(cajeroObj);
    setCajeros(copyCajeros);
  }

  // CAMBIAR POSICIÓN DE CAJEROS
  function moveCajerosPosition(posicion, cajero, arrayCajeros) {
    /*
    CASOS:
    1) SI EL ELEMENTO NO EXISTE, OSEA ESTAMOS AGREGANDO EN UNA POSICION DESEADA
    2) SI EL ELEMENTO EXISTE, OSEA ESTAMOS CAMBIANDO LA POSICION DEL ELEMENTO
    */
    let cajeroIndex = arrayCajeros.findIndex(
      (cajFind) => cajFind.id === cajero.id
    );
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
  function buscarCajero(data) {
    setIsSearchingCajero(true);
    setSearchedName(data.nombre);
    let param = data.nombre.toLowerCase();
    let busquedad = cajeros.filter((cajero) => {
      cajero.nombre = cajero.nombre.toLowerCase();

      if (cajero.nombre.includes(param)) {
        return cajero;
      } else {
        return null;
      }
    });

    setSearchResult(busquedad);
  }

  // SET CAJEROS
  async function traerCajeros() {
    try {
      const result = await getAllCajeros();
      setCajeros(result);
    } catch (error) {
      toast.error(`Error: ${error.code}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

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
          toast.success("Cajero eliminado correctamente!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (result.isDenied) {
          toast.info("Cajero no eliminado.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
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
    numberSection,
    setNumberSection,
    moveCajerosPosition,
  };

  return (
    <adminContext.Provider value={value}>
      {props.children}
    </adminContext.Provider>
  );
};
