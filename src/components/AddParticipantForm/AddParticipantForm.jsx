import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { adminContext } from "../../storage/AdminContext";
import { postParticipant } from "../../firebase/firebase";
import { toastError, toastSuccess } from "../../helpers/helpers";
import styled from "styled-components";
import { MainButton } from "../APublic/MainButton/MainButton";
import { useNavigate } from "react-router-dom";

export const AddParticipantForm = ({
  lastParticipant,
  wantToUseTheLast,
  wantToUseLastParticipant,
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const {
    addParticipant,
    isNumberAvaible,
    setWasAdded,
    setLastParticipant,
    sorteoArray,
    wasAdded,
  } = useContext(adminContext);

  const onSubmit = (data) => {
    data.numero = Number(data.numero);
    data.dni_ultimos = Number(data.dni_ultimos);
    if (isNumberAvaible(data.numero) == true) {
      setWasAdded(true);
      setLastParticipant(data);
      addParticipant(data);
      window.scrollTo(0, 0);
      reset();
      navigate("/admin/sorteo/participantes");
    } else if (isNumberAvaible(data.numero) == -1) {
      toastError(
        `Número inexistente, introduce un número entre 0 y ${
          sorteoArray.length - 1
        }.`
      );
    } else {
      toastError("Número ocupado.");
    }
  };

  const limpiarFormulario = () => {
    wantToUseLastParticipant();
    reset();
  };

  return (
    <StyledForm
      className="d-flex flex-column align-content-center gap-2 p-2 p-sm-3 p-xl-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputContainer className="col-12 d-flex gap-2 justify-content-between align-items-lg-center">
        <label htmlFor="numero" className="text-white col-6">
          Número
        </label>
        <StyledNumberInput
          type="number"
          name="numero"
          defaultValue={0}
          {...register("numero", {
            required: true,
          })}
        />
      </InputContainer>
      <InputContainer className="col-12 d-flex gap-2 justify-content-between align-items-lg-center">
        <label htmlFor="dni_ultimos" className="text-white col-6">
          Ultimos 3 digitos DNI
        </label>
        <StyledNumberInput
          type="number"
          defaultValue={wantToUseTheLast ? lastParticipant?.dni_ultimos : 0}
          name="dni_ultimos"
          {...register("dni_ultimos", {
            required: true,
          })}
        />
      </InputContainer>
      <InputContainer className="col-12 d-flex gap-2 justify-content-between align-items-lg-center">
        <label htmlFor="usuario" className="text-white col-6">
          Usuario
        </label>
        <input
          type="text"
          defaultValue={wantToUseTheLast ? lastParticipant?.usuario : ""}
          name="usuario"
          {...register("usuario", {
            required: true,
          })}
        />
      </InputContainer>
      <InputContainer className="col-12 d-flex gap-2 justify-content-between align-items-lg-center">
        <label htmlFor="plataforma" className="text-white col-6">
          Plataforma
        </label>
        <input
          type="text"
          defaultValue={wantToUseTheLast ? lastParticipant?.plataforma : ""}
          name="plataforma"
          {...register("plataforma", {
            required: true,
          })}
        />
      </InputContainer>
      <InputContainer className="col-12 d-flex gap-2 justify-content-between align-items-lg-center">
        <label htmlFor="nombre_apellido" className="text-white col-6">
          Nombre y apellido
        </label>
        <input
          type="text"
          defaultValue={
            wantToUseTheLast ? lastParticipant?.nombre_apellido : ""
          }
          name="nombre_apellido"
          {...register("nombre_apellido", {
            required: true,
          })}
        />
      </InputContainer>
      <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center align-items-center gap-2 pt-3">
        <MainButton primary={true} className="col-3 m-auto my-2" type="submit">
          Enviar
        </MainButton>
        <MainButton className="col-3 m-auto my-2" onClick={limpiarFormulario}>
          Limpiar
        </MainButton>
        {wasAdded && (
          <>
            <MainButton
              primary={true}
              type="button"
              fn={wantToUseLastParticipant}
            >
              Usar participante anterior
            </MainButton>
          </>
        )}
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 0.6rem;
  padding: 20px;
  border: 1px solid gold;
`;

const StyledNumberInput = styled.input`
  border: 3px solid violet;
`;

const InputContainer = styled.div`
  display: flex;
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
  label {
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 5px #3498db;
    }
    &::placeholder {
      color: #999;
    }
    &::-webkit-input-placeholder {
      color: #999;
    }
    &::-moz-placeholder {
      color: #999;
    }
    &:-ms-input-placeholder {
      color: #999;
    }
    &:-moz-placeholder {
      color: #999;
    }
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #999;
  }
  &::-webkit-input-placeholder {
    color: #999;
  }
  &::-moz-placeholder {
    color: #999;
  }
  &:-ms-input-placeholder {
    color: #999;
  }
  &:-moz-placeholder {
    color: #999;
  }
`;
