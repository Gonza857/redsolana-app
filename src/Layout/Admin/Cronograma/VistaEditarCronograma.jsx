import React from "react";
import styled from "styled-components";
import { Formulario } from "../../../components/AAdmin/Cronograma/Formulario";

export const VistaEditarCronograma = () => {
  return (
    <StyledContainer className="d-flex justify-content-center align-items-center">
      <Formulario />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  form {
    color: #fff;
  }
`;

const PreviewImage = styled.div`
  img {
    width: 100%;
    object-fit: contain;
  }
`;
