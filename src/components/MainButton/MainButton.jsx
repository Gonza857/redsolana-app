import React from "react";
import styled from "styled-components";

export const MainButton = ({ children, fn, primary, type }) => {
  const style = {
    backgroundColor: primary ? "#d4af37" : "#7037d4",
    color: primary ? "#000" : "#fff",
  };
  return (
    <StyledBtn onClick={fn} style={style} type={type}>
      {children}
    </StyledBtn>
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
