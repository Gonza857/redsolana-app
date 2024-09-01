import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const BrandCol = () => {
  return (
    <CopyrightColumn className="col-12 col-md-4 gap-3 px-2 px-sm-0">
      <Link to="/">
        <BrandContainer className="gap-2">
          <BrandLogo src="./assets/images/logo2.png" alt="brand-logo" />
          <BrandText>Red Solana</BrandText>
        </BrandContainer>
      </Link>
    </CopyrightColumn>
  );
};

const CopyrightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-top: 0.5px solid #464646;
  @media screen and (min-width: 768px) {
    border: none;
  }
  padding: 20px 0;
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandLogo = styled.img`
  background-color: #d4af37;
  background-image: linear-gradient(to bottom, #8c81ec, #66cdff);
  border-radius: 50%;
  transition: transform 1s;
  &:hover {
    transform: rotate(360deg) scale(1.05);
  }
  @media screen and (min-width: 320px) {
    width: 120px;
    height: 120px;
    padding: 20px;
  }
  @media screen and (min-width: 720px) {
    width: 150px;
    height: 150px;
    padding: 30px;
  }
`;

const BrandText = styled.h2`
  padding: 0;
  margin: 0;
  text-decoration: none !important;
  list-style: none;
  transition: color 0.3s;
  color: #d4af37;
  text-transform: uppercase;
  font-family: "Bebas Neue", sans-serif;
  &:hover {
    color: #fff;
  }
`;
