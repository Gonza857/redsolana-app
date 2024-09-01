import React from "react";
import { solana } from "../../../storage/AdminContext";
import styled from "styled-components";

export const DrawNumbersTable = ({ slots, preview = false }) => {
  if (preview) {
    return (
      <div className="col-12 mx-auto d-flex justify-content-left flex-wrap">
        {slots.map((value, i) => {
          return (
            <div
              className={`numberBox ${value ? "marcado" : "noMarcado"}`}
              key={i}
            >
              {i}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <StyledSlots className="col-12 col-md-10 col-lg-8 mx-auto my-2 gap-2">
        <div>
          <h3>Estas visualizando los cupos disponibles</h3>
          <p>
            Disponibles:
            {solana.draw.getAvailableSlots() + "/" + solana.draw.slots.length}
          </p>
        </div>
        <StyledSlotsWrapper>
          {solana.draw.slots.map((value, i) => {
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
