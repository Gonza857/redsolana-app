import React from "react";
import { Animated } from "react-animated-css";
import styled from "styled-components";
import { Ring } from "@uiball/loaders";

export const CasinoCard = ({ casinoImage, casinoName, link, loadFake }) => {
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
                <a href={link} target="_blank" rel="noreferrer">
                  {casinoName}
                </a>
              </p>
            </TextContainer>
          </>
        )}
      </CardContainer>
    </Animated>
  );
};

const CasinoCardLoading = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: all 0.5s;
  border: 0.1px solid #ffffff56;
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.32);
  background-color: #3745d4;
  border-radius: 20px;
  overflow: hidden;
`;

const CardContainer = styled.div`
  text-align: center;
  transition: transform 0.3s;
  border: 0.1px solid #ffffff60;
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.32);
  background-color: #3745d4;
  border-radius: 20px;
  overflow: hidden;
  zz &:hover {
    transform: scale(1.025);
  }
  @media (min-width: 320px) {
    height: fit-content;
    width: 250px;
    height: 220px;
  }
  @media (min-width: 720px) {
    height: fit-content;
    width: 300px;
    height: 220px;
  }
`;

const ImgContainer = styled.div`
  height: 170px;
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
  background-color: #3745d4;
  border: 0.1px solid #ffffff60;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  @media (min-width: 320px) {
    font-size: 1rem;
  }
  p {
    font-weight: 600;
    margin: 0;
    a {
      color: #fff;
    }
  }
`;
