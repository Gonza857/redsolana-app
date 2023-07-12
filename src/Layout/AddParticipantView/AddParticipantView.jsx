import React from "react";
import styled from "styled-components";
import { AddParticipantForm } from "../../components/AddParticipantForm/AddParticipantForm";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import { useState } from "react";

export const AddParticipantView = ({}) => {
  const [wantToUseTheLast, setWantToUseTheLast] = useState(false);
  const { lastParticipant, wasAdded } = useContext(adminContext);

  const wantToUseLastParticipant = () => {
    setWantToUseTheLast(true);
  };

  return (
    <StyledView className="d-flex flex-column align-items-center bor1 text-white">
      <h1>Agregar participante</h1>
      <div className="col-8 col-lg-10 d-flex justify-content-evenly bor3">
        <div className="col-7 col-xl-5 bor2">
          <AddParticipantForm
            lastParticipant={lastParticipant}
            wantToUseTheLast={wantToUseTheLast}
            setWantToUseTheLast={setWantToUseTheLast}
          />
        </div>
        {wasAdded && (
          <>
            <div className="col-4 col-xl-3 bor1 d-flex flex-column justify-content-around">
              <h5 className="text-white text-center m-0">
                Participante anterior
              </h5>
              <p className="m-0">
                Ultimos 3 digitos DNI:
                <strong> {lastParticipant?.dni_ultimos}</strong>
              </p>
              <p className="m-0">
                Usuario: <strong> {lastParticipant?.usuario}</strong>
              </p>
              <p className="m-0">
                Plataforma: <strong> {lastParticipant?.plataforma}</strong>
              </p>
              <p className="m-0">
                Nombre y apellido:
                <strong> {lastParticipant?.nombre_apellido}</strong>
              </p>
              <button
                className="btn btn-success"
                onClick={wantToUseLastParticipant}
              >
                Usar participante anterior
              </button>
            </div>
          </>
        )}
      </div>
    </StyledView>
  );
};

const StyledView = styled.main`
  min-height: 100vh;
  margin-top: 70px;
  overflow: hidden;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;
