import React from "react";
import styled from "styled-components";

export const MainButton = ({ children, fn }) => {
  return <StyledBtn onClick={fn}>{children}</StyledBtn>;
};

const StyledBtn = styled.button`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  border: 0;
  border-radius: 0.4em;
  background-color: #7037d4;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s;
  &:hover {
    background-color: #8541fa;
  }
  &:active {
    transform: scale(0.95);
  }
`;
