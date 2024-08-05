import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Metronome } from "@uiball/loaders";
import { BsCircleFill } from "react-icons/bs";
import { adminContext } from "../../../storage/AdminContext";
import CajeroCard from "../../../components/CajeroCard/CajeroCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { Divisor } from "../../../components/AUser/Inicio/Divisor";

export const VistaCajeros = ({ limit }) => {
  const { solana, isOpenMenu, cincoChicos } = useContext(adminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
  const location = useLocation();

  let cajeros = solana.getCashiers();
  let isDrawActive = solana.getDraw().isActive;

  useEffect(() => {
    const url = location.pathname;
    setCurrentURL(url);
    if (cincoChicos.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cincoChicos]);

  return (
    <CajerosMainContainer
      className="col-12 m-0 gap-4 py-4"
      id="Cajeros"
      style={{
        minHeight: isDrawActive ? "calc(100vh - 90px)" : "calc(77vh - 60px)",
        filter: isOpenMenu ? "brightness(50%)" : "unset",
      }}
    >
      {currentURL == "/cajeros" ? (
        <div className="col-12">
          <Divisor>Cajeros</Divisor>
        </div>
      ) : (
        <></>
      )}

      <CajerosEstadoInfo className="gap-2 gap-lg-5">
        <BotonPrincipal>
          Disponible:
          <BsCircleFill style={{ color: "#00d60b", marginLeft: "10px" }} />
        </BotonPrincipal>
        <BotonPrincipal>
          Desconectado:
          <BsCircleFill style={{ color: "red", marginLeft: "10px" }} />
        </BotonPrincipal>
      </CajerosEstadoInfo>
      <CajerosListContainer className="col-12 col-sm-11 col-md-10 px-2">
        {isLoading ? (
          <div className="m-auto">
            <Metronome size={40} speed={1.6} color="#fff" />
          </div>
        ) : (
          <>
            {limit ? (
              <>
                {cincoChicos.map((cajero) => {
                  return <CajeroCard key={cajero.id} cajero={cajero} />;
                })}
              </>
            ) : (
              <>
                {cajeros.map((cajero) => {
                  return <CajeroCard key={cajero.id} cajero={cajero} />;
                })}
              </>
            )}
          </>
        )}
      </CajerosListContainer>
      {currentURL !== "/cajeros" ? (
        <>
          <Link to={"/cajeros"}>
            <BotonPrincipal>Ver más cajeros</BotonPrincipal>
          </Link>
        </>
      ) : (
        <></>
      )}
    </CajerosMainContainer>
  );
};

const BotonPrincipal = styled.button`
  font-family: "Bebas Neue", sans-serif;
  padding: 10px 30px;
  text-transform: uppercase;
  border-radius: 30px;
  width: fit-content;
  background-color: unset;
  color: #fff;
  outline: none;
  border: 0;
  font-size: 1.2rem;
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.32);
  @media screen and (max-width: 320px) {
    padding: 10px 20px;
    font-size: 0.8rem;
    border-radius: 10px;
  }
`;

const CajerosMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 1s;
  @media screen and (max-width: 736px) {
    background-size: 100% auto;
  }
`;

const CajerosEstadoInfo = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-around;
  p {
    background-color: #000000;
    padding: 10px 20px;
    border-radius: 20px;
    color: #fff;
    border: 0.1px solid #ffffff56;
    box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.32);
  }
`;

const CajerosListContainer = styled.div`
  background-position: center center;
  background-repeat: repeat;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: auto;
  @media screen and (min-width: 320px) {
    gap: 10px;
  }
  @media screen and (min-width: 420px) {
    gap: 20px;
  }
`;
