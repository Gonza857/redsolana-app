import React from "react";
import styled from "styled-components";

export const BrandCopy = () => {
  return (
    <CopyrightText className="pt-lg-2">
      <p>© Red Solana - 2024. Todos los derechos reservados</p>
    </CopyrightText>
  );
};

const CopyrightText = styled.div`
  width: 100%;
  border-top: 1px solid #fff;
  p {
    width: 100%;
    text-align: center;
    padding: 0;
    margin: 0;
    padding: 10px 0;
    color: #fff;
    font-family: "Montserrat", sans-serif;
  }
`;
