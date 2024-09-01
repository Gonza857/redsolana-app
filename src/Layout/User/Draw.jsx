import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";

import { useEffect } from "react";
import { adminContext } from "../../storage/AdminContext";

export const Draw = () => {
  const { solana } = useContext(adminContext);

  return (
    <>
      {solana.draw.isActive ? (
        <>
          <SorteoContainer>
            <Overlay className="d-flex flex-column align-items-center py-4 gap-3 col-12">
              <h3 className="m-0 text-white pb-3">¡Participa del sorteo!</h3>
              <StyledDrawCard className="col-12 d-flex flex-column flex-wrap align-items-center flex-md-row justify-content-md-center align-items-md-stretch mx-auto">
                <StyledImg className="col-12 col-md-6 col-xl-4 d-flex align-items-center justify-content-center">
                  <img src={solana.draw.image.url} alt="Draw Image" />
                </StyledImg>
                <StyledTextContainer className="col-12 col-md-6 col-xl-4 p-3 px-lg-4">
                  <p>Descripción:</p>
                  <pre>{solana.draw.description}</pre>
                </StyledTextContainer>
              </StyledDrawCard>
              <p className="d-flex gap-2">
                Cupos disponibles:
                <strong>
                  {solana.draw.getAvailableSlots() +
                    "/" +
                    solana.draw.slots.length}
                </strong>
              </p>
              <StyledTableNumbers className="col-11 col-lg-8 d-flex flex-wrap text-white justify-content-center">
                {solana.draw.slots.map((value, i) => {
                  return (
                    <div
                      className={`numberBox ${value ? "marcado" : "noMarcado"}`}
                    >
                      {i}
                    </div>
                  );
                })}
              </StyledTableNumbers>
            </Overlay>
          </SorteoContainer>
        </>
      ) : (
        <div className="col-12 text-white text-center py-5">
          <h3>No hay sorteos activos</h3>
        </div>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const SorteoContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
  background-image: url(./assets/images/fondoCardGold.png);
  background-position: center center;
  background-size: 100%;
  background-repeat: repeat;
  position: relative;
`;

const StyledDrawCard = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  height: fit-content;
  min-height: 220px;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    max-height: 450px;
  }
`;

const StyledImg = styled.div`
  overflow: hidden;
  height: 60%;
  @media screen and (min-width: 768px) {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StyledTextContainer = styled.div`
  border-top: 1px solid gold;
  color: #fff;
  height: 40%;
  @media screen and (min-width: 768px) {
    border: 0;
    height: 100%;
  }
  pre {
    overflow: hidden;
    white-space: pre-wrap;
  }
`;

const StyledTableNumbers = styled.div``;
