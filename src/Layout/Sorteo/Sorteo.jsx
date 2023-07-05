import React from "react";
import { useState } from "react";
import styled from "styled-components";

const numeros = new Array(170).fill(false);

export const Sorteo = () => {
  const [sorteoArray, setSorteoArray] = useState(numeros);
  return (
    <>
      <SorteoContainer className="d-flex flex-column align-items-center">
        <StyledBannerSorteo className="col-12 py-1">
          <h4 className="p-0 m-0">
            ¡Sorteo Activo! Participa haciendo click <a>aquí</a>
          </h4>
        </StyledBannerSorteo>
        <h3 className="m-0 text-white py-4">¡Participa del sorteo!</h3>
        <div className="col-xl-8 mx-auto d-flex flex-wrap">
          <div className="col-xl-4 d-flex align-items-center justify-content-center">
            <StyledImg
              src="https://www.typingpal.com/images/1/3/a/8/4/13a845e178cb05ecc149ffc850ad9a6eac19f85d-lorem-ipsum.png"
              alt=""
            />
          </div>
          <div className="col-xl-8">
            <StyledText className="px-xl-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              consequuntur, veritatis, rem, quasi laborum iusto alias nulla
              asperiores exercitationem ducimus ea sint quam eaque at
              reiciendis. Laborum incidunt natus quisquam? Aut sapiente eligendi
              voluptate, molestiae provident veritatis odit eveniet
              perspiciatis! Ipsa magnam et cupiditate, quam qui corporis
              similique quaerat, nemo, maxime quasi fugit dicta deserunt dolor
              iusto ad saepe ut?
            </StyledText>
          </div>
        </div>
        <h3 className="text-white">Cupos disponibles</h3>
        <StyledTableNumbers className="col-8 d-flex flex-wrap text-white justify-content-center pt-2">
          {sorteoArray.map((value, i) => {
            let aux = i % 3 == 0;
            if (aux) {
              value = true;
            } else {
              value = false;
            }
            return (
              <div className={`numberBox ${value ? "marcado" : "noMarcado"}`}>
                {++i}
              </div>
            );
          })}
        </StyledTableNumbers>
      </SorteoContainer>
    </>
  );
};

const StyledBannerSorteo = styled.div`
  background-color: #cfac00;
  color: #000;
  font-size: 1.5rem;
  text-align: center;
`;

const SorteoContainer = styled.div`
  padding-top: 70px;
  min-height: 100vh;
  overflow: hidden;
  background-image: url(./assets/images/fondoCardGold.png);
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;
`;

const StyledImg = styled.img`
  border: 3px solid green;
  border-radius: 20px;
  width: 200px;
`;

const StyledText = styled.p`
  color: #fff;
`;

const StyledTableNumbers = styled.div`
  background-color: #0000006a;
`;
