import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { adminContext } from "../../storage/AdminContext";
import ModalSetCajeros from "../ModalSetCajeros/ModalSetCajeros";
import { toast } from "react-toastify";
import styled from "styled-components";
import { MainButton } from "../MainButton/MainButton";
import { Link } from "react-router-dom";

const completeNameAlert = () => {
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
};

function AdminBar() {
  const { setIsSearchingCajero, buscarCajero, traerCajeros, verCajerosTabla } =
    useContext(adminContext);
  const { register, handleSubmit, reset } = useForm();
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const onSubmit = (data) => {
    if (data.nombre === "") completeNameAlert();
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    buscarCajero(e.target.value);
    if (e.target.value == 0) setIsSearchingCajero(false);
  };

  return (
    <AdminBarContainer className="gap-3 gap-lg-0 flex-lg-row py-2 px-3 px-lg-0 flex-md-row">
      <ModalSetCajeros show={showAdd} onClose={handleCloseAdd} />
      <Link to={"/admin/cajeros/agregar"}>
        <MainButton
          className="col-8 col-sm-5 col-md-4 col-lg-3"
          fn={handleShowAdd}
        >
          Nuevo cajero
          <AiOutlineUserAdd />
        </MainButton>
      </Link>
      <div className="col-12 col-sm-9 col-md-7 col-lg-4">
        <SearchForm onSubmit={handleSubmit(onSubmit)}>
          <CrossContainer
            className="px-2"
            onClick={() => {
              setIsSearchingCajero(false);
              reset();
            }}
          >
            <FaTimes />
          </CrossContainer>
          <SearchInput
            type="text"
            placeholder="Buscar cajero"
            name="searchInput"
            {...register("nombre")}
            onChange={handleOnChange}
          />
          <Button type="submit" className="searchBtn">
            <AiOutlineSearch />
          </Button>
        </SearchForm>
      </div>
    </AdminBarContainer>
  );
}

export default AdminBar;

const AdminBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  button {
    &:nth-child(3) {
      border-radius: 0 !important;
      svg {
        font-size: 25px !important;
        margin: 0;
      }
    }
    svg {
      font-size: 25px !important;
      margin-left: 8px;
    }
  }
`;

const SearchForm = styled.form`
  border-radius: 10px;
  overflow: hidden;
  border: 0.1px solid #464646;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const CrossContainer = styled.span`
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  background-color: #0d6efd;
  transition: all 0.15s;
  &:hover {
    background-color: #0b5ed7;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  text-align: center;
  border: none;
  outline: none;
  padding: 5px 10px;
`;
