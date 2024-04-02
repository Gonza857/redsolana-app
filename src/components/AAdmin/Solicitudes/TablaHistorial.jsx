import React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { HistorialRow } from "./HistorialRow";

export const TablaHistorial = ({
  devolverHistorialHaciaPendiente,
  deleteThisSolicitud,
  isLoading,
  resueltas,
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
          <StyledTh className="">Fecha</StyledTh>
          <StyledTh className="">Nombre completo</StyledTh>
          <th className="d-none d-lg-table-cell">E-Mail</th>
          <th className="d-none d-md-table-cell">Celular</th>
          <th className="d-none d-sm-table-cell">Plataforma</th>
          <StyledTh className="">
            <AiOutlineWhatsApp />
          </StyledTh>
          <th className="d-none d-lg-table-cell">Resuelto</th>
          <StyledTh className="">
            <AiOutlineArrowLeft />
          </StyledTh>
          <StyledTh className="">
            <AiOutlineDelete />
          </StyledTh>
          <StyledTh className="d-lg-none">Ver</StyledTh>

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
        {isLoading || resueltas.length == 0 ? (
          <tr>
            <td>Cargando...</td>
          </tr>
        ) : (
          <>
            {resueltas.map((solicitud) => {
              console.log(solicitud);
              return <HistorialRow solicitud={solicitud} />;
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

const StyledDeleteBtn = styled.button`
  outline: none;
  background: none;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: #ff0000;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  &:hover {
    background-color: #9b0000;
  }
  svg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: #fff;
  }
`;

const StyledDesmarkBtn = styled(StyledDeleteBtn)`
  background-color: orange;
  svg {
    color: #000;
  }
`;
