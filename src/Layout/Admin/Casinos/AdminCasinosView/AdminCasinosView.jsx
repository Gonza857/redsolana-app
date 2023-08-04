import React from "react";
import styled from "styled-components";
import CasinoCard from "../../../../components/CasinoCard/CasinoCard";
import { AdminCasinoCard } from "../../../../components/AdminCasinoCard/AdminCasinoCard";
import { useEffect } from "react";
import { useContext } from "react";
import { adminContext } from "../../../../storage/AdminContext";

export const AdminCasinosView = () => {
  const { casinos, getCasinos } = useContext(adminContext);
  useEffect(() => {
    getCasinos();
  }, []);
  return (
    <CasinosContainer className="d-flex flex-column align-items-center col-12 py-4 py-lg-2">
      <h3 className="text-white py-3 text-center">
        Estas visualizando los casinos actuales
      </h3>
      <div className="col-10 d-flex flex-wrap justify-content-center align-content-start gap-4">
        {casinos.map((card, i) => (
          <AdminCasinoCard card={card} key={i} />
        ))}
      </div>
    </CasinosContainer>
  );
};

const CasinosContainer = styled.div`
  /* width: fit-content; */
`;
