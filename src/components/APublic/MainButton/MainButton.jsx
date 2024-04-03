import React from "react";
import styled from "styled-components";

export const MainButton = ({ children, fn, primary, type, circle, red }) => {
  const style = {
    backgroundColor: primary ? "#3745d4" : red ? "#ab0000" : "#d4af37",
    color: primary ? "#fff" : "#000",
  };
  return (
    <>
      {circle ? (
        <CircleBtn
          onClick={fn}
          style={style}
          type={type}
          className="p-1 p-sm-2"
        >
          {children}
        </CircleBtn>
      ) : (
        <StyledBtn onClick={fn} style={style} type={type}>
          {children}
        </StyledBtn>
      )}
    </>
  );
};

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: 0;
  border-radius: 0.4em;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s;
  &:active {
    transform: scale(0.95);
  }
  a {
    color: inherit;
  }
`;

const CircleBtn = styled(StyledBtn)`
  border-radius: 50%;
  padding: 0;
  margin: auto;
  font-size: 0.7rem;
  @media screen and (min-width: 500px) {
    svg {
      font-size: 0.85rem;
    }
  }
  @media screen and (min-width: 768px) {
    svg {
      font-size: 1rem;
    }
  }
`;
