import React, { useContext } from "react";
import { cronoAndNewsContext } from "../../../storage/AdminContext";

import styled from "styled-components";

export const Novedades = () => {
  const { newsImage } = useContext(cronoAndNewsContext);

  return (
    <div className="col-12 d-flex justify-content-center">
      <MainContainer className="col-12 col-md-8 d-flex gap-lg-2 flex-column align-items-center px-3 pt-2 pt-lg-3 pb-4">
        {newsImage !== null ? (
          <>
            <h3 className="text-white">Cartelera de novedades</h3>
            <StyledImageContainer className="col-12 col-sm-11 col-md-10 col-lg-6">
              <img src={newsImage} />
            </StyledImageContainer>
          </>
        ) : (
          <StyledNoNewsContainer
            className="text-white d-flex justify-content-center
          align-items-center"
          >
            <h3>Sin novedades.</h3>
          </StyledNoNewsContainer>
        )}
      </MainContainer>
    </div>
  );
};

const StyledNoNewsContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const MainContainer = styled.div`
  min-height: calc(100vh - 70px);
  @media screen and (min-width: 768px) {
    background-color: rgb(22, 25, 30);
    box-shadow: 0px 0px 25px 6px rgba(255, 255, 255, 0.34);
  }
`;

const FormContainer = styled.form``;

const ButtonsContainer = styled.div`
  height: 15%;
`;

const PreviewImage = styled.div`
  width: 100%;
  @media screen and (min-width: 500px) {
    width: 50%;
  }
  @media screen and (min-width: 968px) {
    width: 50%;
  }
  img {
    width: 100%;
    object-fit: contain;
  }
`;
