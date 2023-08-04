import React from "react";
import { useContext } from "react";
import { Animated } from "react-animated-css";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";
import { Ring } from "@uiball/loaders";
import { useEffect } from "react";

const cinco = new Array(5).fill(null);

function CasinoCard({ casinoImage, casinoName, link, loadFake }) {
  const { isGettingCasinos } = useContext(adminContext);

  return (
    <Animated animationIn="fadeIn" animationOut="fedeOut" isVisible={true}>
      <CardContainer>
        {loadFake ? (
          <CasinoCardLoading>
            <Ring size={40} lineWeight={5} speed={2} color="#d4af37" />
          </CasinoCardLoading>
        ) : (
          <>
            <ImgContainer>
              <a href={link} target="_blank" rel="noreferrer">
                <img src={casinoImage.url} alt={casinoName} />
              </a>
            </ImgContainer>
            <TextContainer>
              <p>
                Haz click{" "}
                <a href={link} target="_blank" rel="noreferrer">
                  aqui
                </a>{" "}
                para ir a {casinoName}
              </p>
            </TextContainer>
          </>
        )}
      </CardContainer>
    </Animated>
  );
}

export default CasinoCard;

const CasinoCardLoading = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 20px;
  transition: all 0.5s;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  height: 200px;
  a {
    width: 100%;
    height: 100%;
    display: block;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
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
      color: #d4af37;
    }
  }
`;
