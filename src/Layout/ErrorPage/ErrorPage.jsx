import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ErrorPage() {
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
}

export default ErrorPage;

const ErrorPageContainer = styled.div`
  margin-top: 70px;
  height: calc(100vh - 70px);
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
