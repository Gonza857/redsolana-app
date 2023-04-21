import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Metronome } from "@uiball/loaders";
import { BsCircleFill } from "react-icons/bs";
import { adminContext } from "../../storage/AdminContext";
import CajeroCard from "../../components/CajeroCard/CajeroCard";

function Cajeros() {
  const [isLoading, setIsLoading] = useState(false);
  const { cajeros } = useContext(adminContext);

  useEffect(() => {
    if (cajeros.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cajeros]);

  return (
    <CajerosMainContainer className="col-12 m-0">
      <CajerosEstadoInfo className="flex-md-row gap-3">
        <p className="m-0 order-1">
          Cajero en linea:
          <BsCircleFill style={{ color: "green", marginLeft: "10px" }} />
        </p>
        <h4 className="m-0 order-0 order-md-1">Cajeros verificados</h4>
        <p className="m-0 order-2">
          Cajero desconectado:
          <BsCircleFill style={{ color: "red", marginLeft: "10px" }} />
        </p>
      </CajerosEstadoInfo>
      <CajerosListContainer className="col-12 col-sm-11 col-md-10">
        {isLoading ? (
          <div className="m-auto">
            <Metronome size={40} speed={1.6} color="#fff" />
          </div>
        ) : (
          <>
            {cajeros.map((cajero) => {
              return <CajeroCard key={cajero.id} cajero={cajero} />;
            })}
          </>
        )}
      </CajerosListContainer>
    </CajerosMainContainer>
  );
}

export default Cajeros;

const CajerosMainContainer = styled.main`
  padding-top: 70px;
  min-height: 100vh;
  overflow: hidden;
  background-image: url(./assets/images/fondoCardDgr.png);
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  @media screen and (max-width: 736px) {
    background-size: 100% auto;
  }
`;

const CajerosEstadoInfo = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* border: 3px solid red; */
  h4 {
    text-align: center;
    color: #fff;
    padding: 10px 20px;
    margin: auto;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 80%);
    box-shadow: 0px 1px 80px 6px #66cdff, 0px 1px 80px 6px #8c81ec;
    -webkit-box-shadow: 0px 1px 106px 6px #66cdff, 0px 1px 106px 6px #8c81ec;
    -moz-box-shadow: 0px 1px 106px 6px #66cdff, 0px 1px 106px 6px #8c81ec;
  }
  p {
    background-color: #000000;
    padding: 10px 20px;
    border-radius: 20px;
    color: #fff;
    box-shadow: 0px 1px 60px 0px #66cdff, 0px 1px 60px 0px #8c81ec;
    -webkit-box-shadow: 0px 1px 60px 0px #66cdff, 0px 1px 60px 0px #8c81ec;
    -moz-box-shadow: 0px 1px 60px 0px #66cdff, 0px 1px 60px 0px #8c81ec;
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
  padding-bottom: 40px;
  @media screen and (min-width: 420px) {
    gap: 20px;
  }
`;
