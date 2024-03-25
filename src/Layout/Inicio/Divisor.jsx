import React from "react";
import styled from "styled-components";

export const Divisor = ({ children }) => {
  return (
    <StyledDivisor className="d-flex align-items-center mt-lg-2">
      <span className="col-3"></span>
      <h3 className="col-6 text-center">{children}</h3>
      <span className="col-3"></span>
    </StyledDivisor>
  );
};

const StyledDivisor = styled.div`
  span {
    height: 10px;
    background-color: #fff;
  }
  h3 {
    padding: 0;
    margin: 0;
    color: #fff;
    font-family: "Bebas Neue", sans-serif;
    text-transform: uppercase;
    font-size: 3rem;
    @media screen and (min-width: 320px) {
      font-size: 2rem;
    }
  }
`;
