import React from "react";
import { Table } from "react-bootstrap";
import { AiOutlineCheck, AiOutlineWhatsApp } from "react-icons/ai";
import styled from "styled-components";
import { PendienteRow } from "./PendienteRow";

export const TablaPendientes = ({
  isLoading,
  noResueltas,
  actualizarEstadoSolicitud,
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
          <th className="">Fecha</th>
          <th className="">Nombre completo</th>
          <th className="col-2">E-Mail</th>
          <th className="col-2">Celular</th>
          <th className="">Plataforma</th>
          <th className="">
            <AiOutlineWhatsApp style={{ fontSize: "1.5rem" }} />
          </th>
          <th className="">Estado</th>
          <th className="">Marcar</th>

          {/* <th className="d-none d-md-table-cell">Fecha</th> */}
          {/* <th className="d-md-none" style={{ width: "5%" }}>
                <AiOutlineOrderedList
                  style={{ color: "fff", fontSize: "20px" }}
                />
              </th> */}
          {/* <th className="p-0">Red</th> */}
          {/* <StyledTh className="p-0">Nombre</StyledTh> */}
          {/* <th className="d-none d-md-table-cell p-0">Numero</th> */}
          {/* <th className="d-none d-lg-table-cell p-0">Genero</th> */}
          {/* <th className="d-none d-md-table-cell">Estado</th> */}
          {/* <th className="d-md-none">
                    <HiStatusOnline
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th> */}

          {/* <th className="d-none d-md-table-cell">Ver</th> */}
          {/* <th className="d-md-none">
                <AiFillInfoCircle style={{ color: "fff", fontSize: "20px" }} />
              </th> */}
          {/* <th className="d-none d-md-table-cell">Editar</th> */}
          {/* <th className="d-md-none">
                <FaUserEdit style={{ color: "fff", fontSize: "20px" }} />
              </th> */}
          {/* <th className="d-none d-md-table-cell">Eliminar</th> */}
          {/* <th className="d-md-none">
                <AiOutlineUserDelete
                  style={{ color: "fff", fontSize: "20px" }}
                />
              </th> */}
        </tr>
      </thead>
      <tbody>
        {isLoading || noResueltas.length == 0 ? (
          <>
            {noResueltas.length == 0 ? (
              <>
                <tr>
                  <td>Nada...</td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>Cargando...</td>
                </tr>
              </>
            )}
          </>
        ) : (
          <>
            {noResueltas.map((solicitud) => {
              return <PendienteRow solicitud={solicitud} />;
            })}
          </>
        )}
        {/* {isSearchingCajero ? (
              <>
                {searchResult.map((cajero) => {
                  return <CajeroAdmin cajero={cajero} key={cajero.id} />;
                })}
              </>
            ) : (
              <>
                {!isLoading &&
                  cajeros.map((cajero) => {
                    return <CajeroAdmin cajero={cajero} key={cajero.id} />;
                  })}
              </>
            )} */}
      </tbody>
    </Table>
  );
};

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
