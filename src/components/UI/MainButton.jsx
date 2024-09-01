import React from "react";
import styled from "styled-components";

export const MainButton = ({
  children,
  primary,
  circle,
  red,
  big,
  ...args
}) => {
  return (
    <>
      {circle ? (
        <CircleBtn className="p-1 p-sm-2 primary" {...args}>
          {children}
        </CircleBtn>
      ) : (
        <>
          <StyledBtn
            className={`d-flex justify-content-center ${big && "header-btn"} ${
              primary ? "primary " : "secondary "
            } ${red && "redBtn "}`}
            {...args}
          >
            {children}
          </StyledBtn>
        </>
      )}
    </>
  );
};

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  padding: 8px 15px;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s;
  &:active {
    transform: scale(0.95);
  }
  a {
    color: inherit;
  }
  @media screen and (min-width: 500px) {
    padding: 10px 20px;
    font-size: 1rem;
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
