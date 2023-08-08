import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

export const PreviewCard = ({ casinoPreview, previewImageUrl, casinoName }) => {
  return (
    <CardContainer>
      <ImgContainer>
        <a href={casinoPreview?.link} target="_blank" rel="noreferrer">
          <BgImg src={previewImageUrl} alt={casinoPreview?.casinoName} />
        </a>
      </ImgContainer>
      <TextContainer>
        <p>
          Haz click{" "}
          <a href={casinoPreview?.link} target="_blank" rel="noreferrer">
            aqui{" "}
          </a>
          para ir a {casinoName}
        </p>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  text-align: center;
  border-radius: 20px;
  transition: transform 0.3s;
  box-shadow: 1px 1px 50px -11px rgba(212, 175, 55, 0.75);
  -webkit-box-shadow: 1px 1px 50px -11px rgba(212, 175, 55, 0.75);
  -moz-box-shadow: 1px 1px 50px -11px rgba(212, 175, 55, 0.75);
  overflow: hidden;
  &:hover {
    transform: scale(1.025);
  }
  @media (min-width: 320px) {
    height: fit-content;
    width: 290px;
  }
  @media (min-width: 700px) {
    width: 320px;
  }
`;

const ImgContainer = styled.div`
  background-position: center center;
  background-size: cover;
  height: 200px;
  position: relative;
  a {
    width: 100%;
    height: 100%;
  }
`;

const BgImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogoImg = styled.img`
  position: absolute;
  object-fit: contain;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  @media (min-width: 320px) {
    font-size: 1rem;
  }
  p {
    font-weight: 600;
    color: #fff;
    margin: 0;
    a {
      color: #d4af37 !important;
    }
  }
`;

const BgFlatColor = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`;
