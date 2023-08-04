import React, { useContext } from "react";
import styled from "styled-components";
import CasinoCard from "../../components/CasinoCard/CasinoCard";
import { adminContext } from "../../storage/AdminContext";
import { Ring } from "@uiball/loaders";
import { Animated } from "react-animated-css";
import { useEffect } from "react";
import { useState } from "react";

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

const cinco = new Array(5).fill(null);

export function Inicio() {
  const { isOpenMenu, casinos, isGettingCasinos } = useContext(adminContext);
  const [loadFake, setLoadFake] = useState(false);
  
  useEffect(() => {
    if (casinos.length == 0) {
      setLoadFake(true);
    } else {
      setLoadFake(false);
    }
  }, [casinos]);

  return (
    <InicioContainer
      className={`col-12 m-0 ${isOpenMenu ? "blockEvents" : "activeEvents"}`}
      style={{
        opacity: `${isOpenMenu ? "0.3" : "1"}`,
      }}
    >
      <Wrapper className="col-11 gap-4 col-lg-10 py-4">
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
  );
}

const InicioContainer = styled.main`
  display: grid;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-image: url(./assets/images/fondoCardGold.png);
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  transition: all 0.3s;
  @media screen and (max-width: 736px) {
    background-size: 100% auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: auto;
`;
