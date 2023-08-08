import React, { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import { useEffect } from "react";
import styled from "styled-components";

export const DrawNumbersTable = ({ slots, preview = false }) => {
  const { sorteoArray } = useContext(adminContext);
  if (preview) {
    return (
      <div className="col-12 mx-auto d-flex justify-content-center flex-wrap">
        {slots.map((value, i) => {
          return (
            <div className={`numberBox ${value ? "marcado" : "noMarcado"}`}>
              {i}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <StyledSlots className="col-12 col-md-10 col-lg-8 mx-auto my-2 gap-2">
        <h3>Estas visualizando los cupos disponibles</h3>
        <StyledSlotsWrapper>
          {sorteoArray.map((value, i) => {
            return (
              <div
                key={i}
                className={`numberBox ${value ? "marcado" : "noMarcado"}`}
              >
                {i}
              </div>
            );
          })}
        </StyledSlotsWrapper>
      </StyledSlots>
    );
  }
};

const StyledSlots = styled.div`
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const StyledSlotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  height: fit-content;
  justify-content: center;
`;
