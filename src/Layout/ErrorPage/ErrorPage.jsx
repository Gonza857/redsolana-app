import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const ErrorPage = () => {
  return (
    <ErrorPageContainer>
      <Wrapper>
        <ErrorTitle>Error 404: Página no encontrada</ErrorTitle>
        <Link to="/">
          <ErrorBtn>Click aqui para ir a la pagina principal</ErrorBtn>
        </Link>
      </Wrapper>
    </ErrorPageContainer>
  );
};

const ErrorPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 1px solid red;
  height: 200px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px;
  border-radius: 20px;
  border: 0.5px solid #d4af37;
  background: radial-gradient(
    circle,
    rgba(88, 88, 88, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const ErrorTitle = styled.h5`
  font-size: 30px;
  text-align: center;
  color: #fff;
`;

const ErrorBtn = styled.button`
  padding: 10px 20px;
  width: fit-content;
  margin: auto;
  background-color: #d4af37;
  color: #000;
  font-weight: 600;
  transition: all 0.15s;
  border: 0.5px solid #fff;
  border-radius: 20px;
`;
