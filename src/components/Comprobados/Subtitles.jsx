import React from "react";
import styled from "styled-components";

export const Subtitles = ({ children }) => {
  return <StyledSubtitle>{children}</StyledSubtitle>;
};

const StyledSubtitle = styled.h3`
  padding: 0;
  margin: 0;
  color: #fff;
  font-family: "Bebas Neue", sans-serif;
  text-transform: uppercase;
  font-size: 2.2rem;
  @media screen and (min-width: 720px) {
    font-size: 2.5rem;
  }
  @media screen and (min-width: 992px) {
    font-size: 3rem;
  }
`;
