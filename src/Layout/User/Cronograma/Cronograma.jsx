import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  adminContext,
  cronoAndNewsContext,
} from "../../../storage/AdminContext";

export function Cronograma() {
  const { solana } = useContext(adminContext);
  const { scheduleImage } = useContext(cronoAndNewsContext);
  let isDrawActive = solana.draw.isActive;
  return (
    <Wrapper
      id="Cronograma"
      className="d-flex justify-content-center align-items-center mb-5 p-3"
      style={{
        maxHeight: isDrawActive ? "calc(100vh - 90px)" : "calc(100vh - 60px)",
      }}
    >
      {scheduleImage != null ? (
        <ImageContainer className="col-12 col-sm-8 col-md-6 col-lg-4">
          <img src={scheduleImage} alt="Imagén Cronograma" />
        </ImageContainer>
      ) : (
        <StyledScheduleContainer
          className="text-white d-flex justify-content-center
        align-items-center"
        >
          <h3>Sin cronograma establecido.</h3>
        </StyledScheduleContainer>
      )}
    </Wrapper>
  );
}

const StyledScheduleContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  transition: all 0.3s;
  @media screen and (max-width: 736px) {
    background-size: 100% auto;
  }
`;

const ImageContainer = styled.div`
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
