import React, { useContext } from "react";
import styled from "styled-components";
import CasinoCard from "../../components/CasinoCard/CasinoCard";
import { adminContext } from "../../storage/AdminContext";

function Inicio() {
  const { isOpenMenu } = useContext(adminContext);
  return (
    <InicioContainer
      className={`col-12 m-0 ${isOpenMenu ? "blockEvents" : "activeEvents"}`}
      style={{
        opacity: `${isOpenMenu ? "0.3" : "1"}`,
      }}
    >
      <Wrapper className="col-11 gap-4 col-lg-10 col-xl-9 col-xxl-8 py-4 p-md-0">
        <CasinoCard
          cardNumber={1}
          bgColor={``}
          bgImageUrl={`./assets/images/megaFaraonFondo.jpg`}
          bgPadding={``}
          imgRoute="megaFaraon.png"
          imgAlt="Casino Mega Faraon"
          casinoLink="https://megafaraon.com"
          casinoName="Mega Faraon"
        />
        <CasinoCard
          cardNumber={2}
          bgColor={`#161616`}
          bgImageUrl={``}
          bgPadding={`50px`}
          casinoLink="https://ganaencasa.co/"
          casinoName="Gana En Casa"
          imgAlt="Casino Gana En Casa"
          imgRoute="ganaencasa-logo.svg"
        />
        <CasinoCard
          cardNumber={3}
          bgColor={`#083d77`}
          bgImageUrl=" "
          bgPadding={`25px`}
          casinoLink="https://konabet.com"
          casinoName="Konabet"
          imgAlt="Casino Konabet"
          imgRoute="konabet-logo.svg"
        />
        <CasinoCard
          cardNumber={4}
          bgColor={`#180039`}
          bgImageUrl={``}
          bgPadding={`60px`}
          casinoLink="https://ajugar.net"
          casinoName="ajugar.net"
          imgAlt="Casino ajugar.net"
          imgRoute="aJugar-logo.png"
        />
      </Wrapper>
    </InicioContainer>
  );
}

export default Inicio;

const InicioContainer = styled.main`
  display: grid;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  min-height: 100vh;
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
