import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import "./adminBar.css";
import { useForm } from "react-hook-form";
import { adminContext } from "../../storage/AdminContext";
import ModalSetCajeros from "../../components/ModalSetCajeros/ModalSetCajeros";
import { toast } from "react-toastify";

function AdminBar({ busquedad }) {
  const { setIsSearchingCajero, buscarCajero } = useContext(adminContext);
  console.log(busquedad);
  const { register, handleSubmit } = useForm();
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  function handleAddCajero() {
    handleShowAdd();
  }

  const onSubmit = (data, e) => {
    e.target.reset();
    if (data.nombre === "") {
      toast.info("Debes ingresar un nombre antes de realizar la busqueda.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsSearchingCajero(false);
    } else {
      buscarCajero(data);
    }
  };

  return (
    <div className="d-flex justify-content-evenly py-2">
      <ModalSetCajeros show={showAdd} onClose={handleCloseAdd} />
      <Button onClick={() => handleAddCajero()}>
        Nuevo cajero
        <AiOutlineUserAdd className="addCajeroIcon" />
      </Button>
      <div className="col-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex searchForm align-content-center justify-content-between"
        >
          <span
            className="d-flex align-items-center px-2 timesIcon"
            onClick={() => {
              setIsSearchingCajero(false);
            }}
          >
            <FaTimes />
          </span>
          <input
            className="searchInput w-100"
            type="text"
            placeholder="Busqueda por nombre de cajero"
            name="searchInput"
            {...register("nombre")}
          />
          <Button type="submit">
            <AiOutlineSearch />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminBar;
