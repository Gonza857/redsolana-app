import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";
import { MainButton } from "../../components/MainButton/MainButton";
import { Link } from "react-router-dom";

export function Cronograma() {
  const { payScheduleImg, sorteoActivo } = useContext(adminContext);
  return (
    <Wrapper
      className="d-flex justify-content-center align-items-center"
      style={{
        maxHeight: sorteoActivo ? "calc(100vh - 90px)" : "calc(100vh - 60px)",
      }}
    >
      {payScheduleImg != null ? (
        <ImageContainer>
          <img src={payScheduleImg} />
        </ImageContainer>
      ) : (
        <div className="mx-auto text-white text-center py-5 col-12 d-flex flex-column gap-4 align-items-center">
          <h3>Sin cronograma establecido.</h3>
          <Link to={"/"}>
            <MainButton>Volver a la página principal</MainButton>
          </Link>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-image: url(./assets/images/fondoCardGold.png);
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
  transition: all 0.3s;
  @media screen and (max-width: 736px) {
    background-size: 100% auto;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
