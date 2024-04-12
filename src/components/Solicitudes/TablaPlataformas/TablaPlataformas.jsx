import React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import { PlataformaTr } from "./PlataformaTr";

const encabezadosTabla = ["Plataforma", "Estado", "Ocultar", "Eliminar"];

export const TablaPlataformas = ({
  isLoading,
  platforms,
  handleUpdate,
  deletePlatform,
}) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      variant="dark"
      className="align-middle"
    >
      <thead className="animate__animated animate__fadeIn">
        <tr className="align-middle">
          {encabezadosTabla.map((enc) => (
            <StyledTh key={`${enc}0`}>{enc}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {!isLoading && (
          <>
            {platforms.map((platform) => {
              return (
                <PlataformaTr
                  platform={platform}
                  handleUpdate={handleUpdate}
                  deletePlatform={deletePlatform}
                />
              );
            })}
          </>
        )}
      </tbody>
    </Table>
  );
};

const StyledTh = styled.th`
  font-size: 0.7rem;
  @media screen and (min-width: 500px) {
    font-size: 0.85rem;
  }
  @media screen and (min-width: 600px) {
    font-size: 1rem;
  }
  svg {
    font-size: 1.2rem;
    @media screen and (min-width: 500px) {
      font-size: 1.5rem;
    }
  }
`;
