import React from "react";
import styled from "styled-components";

export const Wrapper = ({ children }) => {
  return (
    <AdminBarContainer className="gap-3 gap-lg-0 flex-lg-row py-2 px-3 px-lg-0 flex-md-row">
      {children}
    </AdminBarContainer>
  );
};

const AdminBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
