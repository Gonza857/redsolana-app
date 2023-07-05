import React from "react";
import styled from "styled-components";

export function Cronograma() {
  return (
    <CronogramaContainer>
      <CronogramaImage src="./assets/images/cronogramaNewJunio.jpg" />
    </CronogramaContainer>
  );
}

const CronogramaContainer = styled.div`
  width: 100%;
  margin-top: 70px;
  height: calc(100vh - 70px);
  background-image: url(./assets/images/fondoCardGold.png);
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  transition: all 0.3s;
  @media screen and (max-width: 736px) {
    background-size: 100% auto;
  }
`;

const CronogramaImage = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;
