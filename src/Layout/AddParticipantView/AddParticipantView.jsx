import React from "react";
import styled from "styled-components";
import { AddParticipantForm } from "../../components/AddParticipantForm/AddParticipantForm";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import { useState } from "react";
import { MainButton } from "../../components/MainButton/MainButton";

export const AddParticipantView = ({}) => {
  const [wantToUseTheLast, setWantToUseTheLast] = useState(false);
  const { lastParticipant, wasAdded } = useContext(adminContext);

  const wantToUseLastParticipant = () => {
    setWantToUseTheLast(true);
  };

  return (
    <StyledView className="col-12 d-flex flex-column align-items-center text-white pb-3 pt-xl-1">
      <h3 className="py-3">Agregar participante</h3>
      <div className="col-11 col-lg-10 d-flex flex-column flex-lg-row justify-content-evenly align-items-sm-center gap-2 gap-md-4">
        <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-5">
          <AddParticipantForm
            lastParticipant={lastParticipant}
            wantToUseTheLast={wantToUseTheLast}
            wantToUseLastParticipant={wantToUseLastParticipant}
          />
        </div>
        {wasAdded && (
          <>
            <StyledLastAdded className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 d-flex flex-column justify-content-around gap-2">
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
            </StyledLastAdded>
          </>
        )}
      </div>
    </StyledView>
  );
};

const StyledView = styled.main``;

const StyledLastAdded = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 0.6rem;
  padding: 20px;
  border: 1px solid gold;
`;
