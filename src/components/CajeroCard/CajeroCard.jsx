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
      <CajeroCardContainer className="py-2">
        <CajeroImgContainer>
          <CajeroEstadoIcon
            style={{
              backgroundColor: `${
                cajero.estado === "conectado" ? "#00d60b" : "red"
              }`,
            }}
          ></CajeroEstadoIcon>
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
              loading="lazy"
              src={cajero.imagen.url}
              alt="Imagen de cajero/a personalizada"
            />
          )}
        </CajeroImgContainer>
        <CajeroName>
          <p className="">{cajero.nombre}</p>
        </CajeroName>

        <CajeroNumberContainer>
          <BotonPrincipal>
            {cajero.enlace === "" ? (
              <p className="m-0">{cajero.numero}</p>
            ) : (
              <a
                href={`https://${cajero.enlace}`}
                target="_blank"
                rel="noreferrer"
              >
                Contactar
              </a>
            )}
            <FaWhatsapp />
          </BotonPrincipal>
        </CajeroNumberContainer>
      </CajeroCardContainer>
    </Animated>
  );
}

export default CajeroCard;

const BotonPrincipal = styled.button`
  font-family: "Bebas Neue", sans-serif;
  /* padding: 5px 20px; */
  text-transform: uppercase;
  border-radius: 30px;
  width: fit-content;
  background-color: #d4af37;
  outline: none;
  border: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  svg,
  p,
  a {
    color: #000 !important;
    width: fit-content;
  }
  p,
  a {
    font-size: 1.3rem;
  }
  svg {
    font-size: 1.7rem;
  }
  @media screen and (min-width: 320px) {
    padding: 5px 15px;
    p,
    a {
      font-size: 0.9rem;
    }
    svg {
      font-size: 1rem;
    }
  }
`;

const CajeroCardContainer = styled.div`
  width: 145px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-around;
  border: 0.1px solid #ffffff56;
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.32);
  background-color: #3745d4;
  border-radius: 20px;
  overflow: hidden;
  gap: 5px;
  @media screen and (min-width: 388px) {
    width: 155px;
  }
  @media screen and (min-width: 720px) {
    width: 165px;
  }
  @media screen and (min-width: 768px) {
    width: 180px;
    height: 250px;
  }
`;

const CajeroName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  color: #fff;
  text-align: center;
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
  width: 80%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  img {
    display: block;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.562);
    border: 0.1px solid #ffffff56;
    @media screen and (min-width: 320px) {
      width: 100px;
      height: 100px;
    }
    /* @media screen and (max-width: 450px) {
      width: 130px;
      height: 130px;
    } */
  }
`;

const CajeroEstadoIcon = styled.div`
  /* border: 1px solid red; */
  height: fit-content;
  position: absolute;
  left: 0;
  z-index: 950;
  border-radius: 50%;
  height: 1rem;
  width: 1rem;
  border: 0.1px solid #ffffff10;
  @media screen and (min-width: 320px) {
    height: 0.8rem;
    width: 0.8rem;
  }
  /* @media screen and (min-width: 450px) {
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
  }  */
`;

const CajeroNumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
