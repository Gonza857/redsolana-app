import React from "react";
import styled from "styled-components";
import { Form } from "./components/Form";

export const EditView = () => {
  return (
    <StyledContainer className="d-flex justify-content-center align-items-center">
      <Form />
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
