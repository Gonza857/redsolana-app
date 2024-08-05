import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { adminContext } from "../../../storage/AdminContext";
import { useEffect } from "react";

export const Sorteo = () => {
  const { solana } = useContext(adminContext);
  const [ocupados, setOcupados] = useState(0);
  let draw = solana.getDraw();
  let { isActive, slots } = solana.getDraw();
  useEffect(() => {
    if (isActive) {
      if (solana.getDraw() !== null) {
        let slotsOcupados = 0;
        for (let i = 0; i < slots.length; i++) {
          if (slots[i]) {
            slotsOcupados++;
          }
        }
        slotsOcupados = slots.length - slotsOcupados;
        setOcupados(slotsOcupados);
      }
    }
  }, [solana.getDraw()]);
  return (
    <>
      {isActive ? (
        <>
          <SorteoContainer>
            <Overlay className="d-flex flex-column align-items-center py-4 gap-3 col-12">
              <h3 className="m-0 text-white pb-3">¡Participa del sorteo!</h3>
              <StyledDrawCard className="col-12 d-flex flex-column flex-wrap align-items-center flex-md-row justify-content-md-center align-items-md-stretch mx-auto">
                <StyledImg className="col-12 col-md-6 col-xl-4 d-flex align-items-center justify-content-center">
                  <img src={solana.getDraw()?.image?.url} alt="Draw Image" />
                </StyledImg>
                <StyledTextContainer className="col-12 col-md-6 col-xl-4 p-3 px-lg-4">
                  <p>Descripción:</p>
                  <pre>{solana.getDraw()?.description}</pre>
                </StyledTextContainer>
              </StyledDrawCard>
              <h3 className="text-white">
                Cupos disponibles:
                <strong>{" " + ocupados}</strong>
              </h3>
              <StyledTableNumbers className="col-11 col-lg-8 d-flex flex-wrap text-white justify-content-center">
                {slots.map((value, i) => {
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
