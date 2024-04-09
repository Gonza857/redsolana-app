import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../../storage/AdminContext";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import { Link } from "react-router-dom";

export function Cronograma() {
  const { payScheduleImg, sorteoActivo } = useContext(adminContext);
  return (
    <Wrapper
      id="Cronograma"
      className="d-flex justify-content-center align-items-center mb-5 p-3"
      style={{
        maxHeight: sorteoActivo ? "calc(100vh - 90px)" : "calc(100vh - 60px)",
      }}
    >
      {payScheduleImg != null ? (
        <ImageContainer className="col-12 col-sm-8 col-md-6 col-lg-4">
          <img src={payScheduleImg} />
        </ImageContainer>
      ) : (
        <div className="mx-auto text-white text-center py-5 col-12 d-flex flex-column gap-4 align-items-center">
          <h3>Sin cronograma establecido.</h3>
        </div>
      )}
    </Wrapper>
  );
}

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
