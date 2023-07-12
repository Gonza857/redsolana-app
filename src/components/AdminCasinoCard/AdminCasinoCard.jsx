import React from "react";
import styled from "styled-components";

export const AdminCasinoCard = ({
  card,
  casinoLink,
  imgRoute,
  imgAlt,
  casinoName,
  bgColor = undefined,
  bgImageUrl = undefined,
  bgPadding = undefined,
}) => {
  const style = {
    backgroundColor: `${bgColor ? `${bgColor}` : "unset"}`,
    backgroundImage: `${bgImageUrl ? `url(${bgImageUrl})` : "unset"}`,
  };

  return (
    <StyledCard className="bor2 d-flex flex-column align-items-center justify-content-evenly">
      <ImageContainer style={style}>
        <a href={casinoLink} target="_blank" rel="noreferrer">
          <RedImg src={`./assets/images/${imgRoute}`} alt={imgAlt} s />
        </a>
      </ImageContainer>
      <CardInfo className="bor2 d-flex gap-2 justify-content-center">
        <p className="bor2 m-0">{card.casinoName}</p>
        <button>Editar</button>
      </CardInfo>
    </StyledCard>
  );
};

const CardInfo = styled.div`
  height: 20%;
`;

const StyledCard = styled.div`
  width: 250px;
  height: 200px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  background-position: center center;
  background-size: cover;

  a {
    height: 100%;
    width: 100%;
    img {
      padding: 15px;
      width: 100%;
    }
  }
`;

const RedImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
