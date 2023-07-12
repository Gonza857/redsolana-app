import React from "react";
import styled from "styled-components";
import { cards } from "../Inicio/Inicio";
import CasinoCard from "../../components/CasinoCard/CasinoCard";
import { AdminCasinoCard } from "../../components/AdminCasinoCard/AdminCasinoCard";

export const CasinosView = () => {
  return (
    <StyledView className="col-10 text-white p-4 d-flex justify-content-center">
      <CasinosContainer className="d-flex flex-wrap align-content-start gap-3 col-10">
        {cards.map((card) => (
          <AdminCasinoCard card={card} {...card} />
        ))}
      </CasinosContainer>
    </StyledView>
  );
};

const StyledView = styled.main`
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  overflow: hidden;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const CasinosContainer = styled.div`
  width: fit-content;
`;
