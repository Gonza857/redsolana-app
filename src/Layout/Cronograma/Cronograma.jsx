import React from "react";
import styled from "styled-components";

function Cronograma() {
  return (
    <CronogramaContainer>
      <CronogramaImage src="./assets/images/crono.jpeg" />
    </CronogramaContainer>
  );
}

export default Cronograma;

const CronogramaContainer = styled.div`
  width: 100%;
  margin-top: 70px;
  height: calc(100vh - 70px);
  background-image: url(./assets/images/fondobyn.jpeg);
  background-size: 100% 100%;
`;

const CronogramaImage = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;
