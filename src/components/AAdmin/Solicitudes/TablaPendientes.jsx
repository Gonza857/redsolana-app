import React from "react";
import { Table } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineWhatsApp } from "react-icons/ai";
import styled from "styled-components";
import { PendienteRow } from "./PendienteRow";
import { Metronome } from "@uiball/loaders";
import { Subtitles } from "../../Comprobados/Subtitles";

export const TablaPendientes = ({
  isLoading,
  noResueltas,
  actualizarEstadoSolicitud,
}) => {
  return (
    <>
      {isLoading ? (
        <>
          <Subtitles>Cargando solicitudes</Subtitles>
        </>
      ) : (
        <>
          {noResueltas.length == 0 ? (
            <>
              <Subtitles>No hay solicitudes</Subtitles>
            </>
          ) : (
            <>
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
                    <StyledTh className="">Fecha</StyledTh>
                    <StyledTh className="">Nombre completo</StyledTh>
                    <th className="col-2 d-none d-lg-table-cell">E-Mail</th>
                    <th className="col-2 d-none d-md-table-cell">Celular</th>
                    <th className="d-none d-sm-table-cell">Plataforma</th>
                    <StyledTh>
                      <AiOutlineWhatsApp />
                    </StyledTh>
                    <StyledTh className="">Resolver</StyledTh>
                    <StyledTh className="d-lg-none">Ver</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && (
                    <>
                      {noResueltas.map((solicitud) => {
                        return <PendienteRow solicitud={solicitud} />;
                      })}
                    </>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
      {isLoading && (
        <div className="m-auto">
          <Metronome size={40} speed={1.6} color="#fff" />
        </div>
      )}
    </>
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

const StyledButtonContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const StyledCheckBtn = styled.button`
  outline: none;
  background: none;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: #25d366;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  &:hover {
    background-color: #177e3d;
  }
  svg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: #000;
  }
`;
