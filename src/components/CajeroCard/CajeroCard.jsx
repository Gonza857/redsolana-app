import React, { useEffect, useContext } from "react";
import { Animated } from "react-animated-css";
import { FaWhatsapp } from "react-icons/fa";
import styled from "styled-components";
import { BsCircleFill } from "react-icons/bs";
import { adminContext } from "../../storage/AdminContext";

function CajeroCard({ cajero }) {
  const { cajeros } = useContext(adminContext);

  useEffect(() => {
    if (cajero.nombre.length > 15) {
      let cambio = cajero.nombre.substring(12, -1);
      let nameUpdate = cambio.concat("...");
      cajero.nombre = nameUpdate;
    }
  }, [cajeros, cajero]);

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <CajeroCardContainer>
        <CajeroName>
          <p className="">{cajero.nombre}</p>
        </CajeroName>
        <CajeroImgContainer>
          <CajeroEstadoIcon>
            <BsCircleFill
              style={{
                color: `${cajero.estado === "conectado" ? "green" : "red"}`,
              }}
            />
          </CajeroEstadoIcon>
          {cajero.imagen === null ? (
            cajero.genero === "M" ? (
              <img
                src="./assets/images/hombre.png"
                alt="Imagen de cajero anonimo"
              />
            ) : (
              <img
                src="./assets/images/mujer.png"
                alt="Imagen de cajera anonima"
              />
            )
          ) : (
            <img
              src={cajero.imagen.url}
              alt="Imagen de cajero/a personalizada"
            />
          )}
        </CajeroImgContainer>
        <CajeroNumberContainer>
          <FaWhatsapp />
          {cajero.enlace === "" ? (
            <p className="m-0">{cajero.numero}</p>
          ) : (
            <a
              href={`https://${cajero.enlace}`}
              target="_blank"
              rel="noreferrer"
            >
              {cajero.numero}
            </a>
          )}
        </CajeroNumberContainer>
      </CajeroCardContainer>
    </Animated>
  );
}

export default CajeroCard;

const CajeroCardContainer = styled.div`
  width: 145px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.8px solid #d4af37;
  border-radius: 25px;
  margin-top: 15px;
  overflow: hidden;
  gap: 5px;
  @media screen and (min-width: 388px) {
    width: 155px;
  }
  @media screen and (min-width: 720px) {
    width: 165px;
  }
  @media screen and (min-width: 768px) {
    width: 170px;
  }
`;

const CajeroName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  height: 40px;
  width: 100%;
  p {
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 13px;
    @media screen and (min-width: 500px) {
      font-size: 14px;
    }
    @media screen and (min-width: 736px) {
      font-size: 16px;
    }
  }
`;

const CajeroImgContainer = styled.div`
  position: relative;
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: center right;
    @media screen and (max-width: 450px) {
      width: 130px;
      height: 130px;
    }
  }
`;

const CajeroEstadoIcon = styled.div`
  position: absolute;
  left: 0;
  top: -10px;
  @media screen and (min-width: 388px) {
    left: -11px;
    top: -10px;
  }
  @media screen and (min-width: 450px) {
    left: -1px;
    top: -10px;
  }
  @media screen and (min-width: 720px) {
    left: -6px;
    top: -10px;
  }
  @media screen and (min-width: 765px) {
    left: -9px;
    top: -10px;
  }
`;

const CajeroNumberContainer = styled.div`
  margin: 0;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  svg {
    font-size: 25px;
    color: #fff;
  }
  a,
  p {
    margin: 0;
    color: #fff;
    font-size: 15px;
  }
`;
