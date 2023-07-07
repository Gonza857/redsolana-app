import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { adminContext } from "../../storage/AdminContext";
import { postParticipant } from "../../firebase/firebase";
import { toastError, toastSuccess } from "../../helpers/helpers";
import styled from "styled-components";

export const AddParticipantForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { addParticipant, participants, isNumberAvaible } =
    useContext(adminContext);

  const onSubmit = (data) => {
    data.numero = Number(data.numero);
    data.dni_ultimos = Number(data.dni_ultimos);
    if (isNumberAvaible(data.numero) == true) {
      postParticipant(data)
        .then(() => {
          addParticipant(data);
          toastSuccess("Participante agregado correctamente");
        })
        .catch((error) => {
          toastError(error.message);
        });
    } else if (isNumberAvaible(data.numero) == -1) {
      toastError("Número inexistente, introduce un número entre 1 y 1000.");
    } else {
      toastError("Número ocupado, elige otro.");
    }
  };

  return (
    <form
      className="d-flex flex-column align-content-center gap-2 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-12 d-flex gap-2 align-items-center">
        <label htmlFor="numero" className="text-white col-6">
          Numero
        </label>
        <StyledNumberInput
          type="number"
          name="numero"
          {...register("numero", {
            required: true,
          })}
        />
      </div>
      <div className="col-12 d-flex gap-2 align-items-center">
        <label htmlFor="dni_ultimos" className="text-white col-6">
          Ultimos 3 digitos DNI
        </label>
        <StyledNumberInput
          type="number"
          defaultValue="100"
          name="dni_ultimos"
          {...register("dni_ultimos", {
            required: true,
          })}
        />
      </div>
      <div className="col-12 d-flex gap-2 align-items-center">
        <label htmlFor="usuario" className="text-white col-6">
          Usuario
        </label>
        <input
          type="text"
          defaultValue="carlos111"
          name="usuario"
          {...register("usuario", {
            required: true,
          })}
        />
      </div>
      <div className="col-12 d-flex gap-2 align-items-center">
        <label htmlFor="plataforma" className="text-white col-6">
          Plataforma
        </label>
        <input
          type="text"
          defaultValue="plataforma"
          name="plataforma"
          {...register("plataforma", {
            required: true,
          })}
        />
      </div>

      <div className="col-12 d-flex gap-2 align-items-center">
        <label htmlFor="nombre_apellido" className="text-white col-6">
          Nombre y apellido
        </label>
        <input
          type="text"
          defaultValue="Carlos prueba"
          name="nombre_apellido"
          {...register("nombre_apellido", {
            required: true,
          })}
        />
      </div>

      <button className="btn btn-success col-3 m-auto my-2" type="submit">
        Enviar
      </button>
    </form>
  );
};

const StyledNumberInput = styled.input`
  border: 3px solid violet;
`;
