import React, { useContext } from "react";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { adminContext } from "../../storage/AdminContext";
import styled from "styled-components";
import { MainButton } from "../APublic/MainButton/MainButton";
import { Link } from "react-router-dom";
import { toastInfo } from "../../helpers/helpers";

export const AdminBar = () => {
  const { buscarCajero, searchedName, resetCheckerData, solana } =
    useContext(adminContext);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = () => {
    if (searchedName === null)
      toastInfo("Debes ingresar un nombre antes de realizar la busqueda.");
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    buscarCajero(e.target.value);
    if (e.target.value == 0) resetCheckerData();
  };

  return (
    <AdminBarContainer className="gap-3 gap-lg-0 flex-lg-row py-2 px-3 px-lg-0 flex-md-row">
      <div>
        <Link to={"/admin/cajeros/agregar"}>
          <MainButton>
            Nuevo cajero
            <AiOutlineUserAdd />
          </MainButton>
        </Link>
      </div>
      <div className="col-12 col-sm-9 col-md-7 col-lg-4">
        <SearchForm onSubmit={handleSubmit(onSubmit)}>
          <CrossContainer
            type="button"
            onClick={() => {
              resetCheckerData();
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
          <ClearLinkBtn type="submit">
            <AiOutlineSearch />
          </ClearLinkBtn>
        </SearchForm>
      </div>
    </AdminBarContainer>
  );
};

const AdminBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SearchForm = styled.form`
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  border: 0.1px solid #464646;
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  width: 100%;
  text-align: center;
  border: none;
  outline: none;
  padding: 5px 10px;
`;

const ClearLinkBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 0;
  border-bottom-right-radius: 0.4em;
  border-top-right-radius: 0.4em;
  transition: all 0.3s;
  background-color: #7037d4;
  color: #fff;
  height: 100%;
  width: 15%;
  &:active {
    transform: scale(0.95);
  }
  &:hover {
    background-color: #5c2dac;
  }
  svg {
    margin: 0 !important;
  }
  @media screen and (min-width: 768px) {
    width: 10%;
  }
`;

const CrossContainer = styled(ClearLinkBtn)`
  cursor: pointer;
  border-radius: 0;
  border-bottom-left-radius: 0.4em;
  border-top-left-radius: 0.4em;
  &:hover {
    background-color: #5c2dac;
  }
`;
