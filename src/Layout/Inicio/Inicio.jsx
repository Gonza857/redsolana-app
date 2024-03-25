import React, { useContext } from "react";
import styled from "styled-components";
import CasinoCard from "../../components/CasinoCard/CasinoCard";
import { adminContext } from "../../storage/AdminContext";
import { useEffect } from "react";
import { useState } from "react";
import { Cajeros } from "../Cajeros/Cajeros";
import { CajerosView } from "../CajerosView/CajerosView";
import { Cronograma } from "../Cronograma/Cronograma";
import { Divisor } from "./Divisor";

export const cards = [
  {
    cardNumber: 1,
    bgColor: "",
    bgImageUrl: "./assets/images/megaFaraonFondo.jpg",
    bgPadding: "",
    casinoLink: "https://megafaraon.com",
    casinoName: "Mega Faraon",
    imgRoute: "megaFaraon.png",
    imgAlt: "Casino Mega Faraon",
  },
  {
    cardNumber: 2,
    bgColor: "#083d77",
    bgImageUrl: " ",
    bgPadding: "25px",
    casinoLink: "https://konabet.com",
    casinoName: "Konabet",
    imgAlt: "Casino Konabet",
    imgRoute: "konabet-logo.svg",
  },
  {
    cardNumber: 3,
    bgColor: "#002752",
    bgImageUrl: "",
    bgPadding: "50px",
    casinoLink: "https://bet30.co/",
    casinoName: "Bet30",
    imgAlt: "Casino Bet30",
    imgRoute: "bet-30.svg",
  },
  {
    cardNumber: 4,
    bgColor: "#180039",
    bgImageUrl: "",
    bgPadding: "60px",
    casinoLink: "https://ajugar.net",
    casinoName: "ajugar.net",
    imgAlt: "Casino ajugar.net",
    imgRoute: "aJugar-logo.png",
  },
  {
    cardNumber: 5,
    bgColor: "#333",
    bgImageUrl: "",
    bgPadding: "20px",
    imgRoute: "vikingo.png",
    imgAlt: "Casino Vikingo",
    casinoLink: "https://vikingo-play.net/jugadores/index.php",
    casinoName: "Vikingo",
  },
];

const cinco = new Array(6).fill(null);

export function Inicio() {
  const { isOpenMenu, casinos, isGettingCasinos, sorteoActivo } =
    useContext(adminContext);
  const [loadFake, setLoadFake] = useState(false);

  useEffect(() => {
    if (casinos.length == 0) {
      setLoadFake(true);
    } else {
      setLoadFake(false);
    }
  }, [casinos]);

  return (
    <main className="d-flex flex-column gap-4 gap-lg-5 col-12">
      <HeaderContainer className="col-12 m-auto" id="Home">
        <HeaderInfo className="d-flex flex-column flex-wrap gap-2 align-items-lg-center justify-content-lg-center bor1">
          <img src="./assets/images/header-bg-styled.jpg" />
          <div className="gap-2">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto, a.
            </p>
            <BotonPrincipal>PEDÍ TU USUARIO</BotonPrincipal>
          </div>
        </HeaderInfo>
      </HeaderContainer>
      <Divisor>Casinos</Divisor>
      <InicioContainer
        id="Casinos"
        className={`bor1 col-12 m-0 ${
          isOpenMenu ? "blockEvents" : "activeEvents"
        }`}
        style={{
          opacity: `${isOpenMenu ? "0.3" : "1"}`,
        }}
      >
        <Wrapper className="col-12 gap-4 col-lg-10 py-4 bor4">
          {loadFake ? (
            <>
              {cinco.map((card) => (
                <CasinoCard key={card?.link} {...card} loadFake={loadFake} />
              ))}
            </>
          ) : (
            <>
              {casinos.map((card) => (
                <CasinoCard key={card?.link} {...card} loadFake={loadFake} />
              ))}
            </>
          )}
        </Wrapper>
      </InicioContainer>
      <Divisor>Cajeros</Divisor>
      <CajerosView limit={true} />
      <Divisor>Cronograma de pago</Divisor>
      <Cronograma />
    </main>
  );
}

const BotonPrincipal = styled.button`
  font-family: "Bebas Neue", sans-serif;
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 30px;
  width: fit-content;
  background-color: #d4af37;
  color: #000;
  outline: none;
  border: 0;
  font-size: 1rem;
`;

const HeaderContainer = styled.div`
  @media screen and (min-width: 720px) {
    height: calc(100vh - 60px);
  }
`;

const HeaderInfo = styled.div`
  margin: auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width: 320px) {
    width: 100%;
    height: 300px;
  }
  img {
    @media screen and (min-width: 320px) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  div {
    /* width: 420px; */
    height: fit-content;
    position: absolute;
    right: 0;
    /* margin-right: 50px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 3px solid violet; */
    @media screen and (min-width: 320px) {
      width: 100%;
      height: 100%;
      padding: 0 20px;
    }
    p {
      margin: 0;
      font-family: "Bebas Neue", sans-serif;
      color: #fff;
      border: 3px solid burlywood;
      @media screen and (min-width: 320px) {
        font-size: 1.2rem;
      }
    }
  }
`;

const InicioContainer = styled.main`
  display: grid;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: auto;
`;
