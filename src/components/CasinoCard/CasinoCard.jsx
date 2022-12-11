import React from "react";
import { Animated } from "react-animated-css";
import styled from "styled-components";

function CasinoCard({
  casinoLink,
  imgRoute,
  imgAlt,
  casinoName,
  bgColor = undefined,
  bgImageUrl = undefined,
  bgPadding = undefined,
}) {
  const style = {
    backgroundColor: `${bgColor ? `${bgColor}` : "unset"}`,
    backgroundImage: `${bgImageUrl ? `url(${bgImageUrl})` : "unset"}`,
    padding: `${bgPadding ? `${bgPadding}` : "unset"}`,
  };

  return (
    <Animated
      animationIn="fadeInLeft"
      animationOut="fedeOutRight"
      isVisible={true}
    >
      <CardContainer>
        <ImgContainer style={style}>
          <a href={casinoLink} target="_blank">
            <RedImg src={`./assets/images/${imgRoute}`} alt={imgAlt} />
          </a>
        </ImgContainer>
        <TextContainer>
          <p>
            Haz click{" "}
            <a href={casinoLink} target="_blank">
              aqui
            </a>{" "}
            para ir a {casinoName}
          </p>
        </TextContainer>
      </CardContainer>
    </Animated>
  );
}

export default CasinoCard;

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
    width: 320px;
  }
  @media (min-width: 700px) {
    width: 320px;
  }
  @media (min-width: 1024px) {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  background-position: center center;
  background-size: cover;
  height: 200px;
`;

const RedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  p {
    font-weight: 600;
    color: #fff;
    margin: 0;
    a {
      color: #d4af37;
    }
  }
`;
