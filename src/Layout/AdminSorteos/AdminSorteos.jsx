import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const users = [
  {
    number: 0,
    username: "gonza857",
    platform: "prueba",
    fullname: "Gonza Alex",
    dni: 606,
  },
  {
    number: 0,
    username: "gonza857",
    platform: "prueba",
    fullname: "Gonza Alex",
    dni: 606,
  },
  {
    number: 0,
    username: "gonza857",
    platform: "prueba",
    fullname: "Gonza Alex",
    dni: 606,
  },
];

const numeros = new Array(170).fill(false);

export const AdminSorteos = () => {
  const [sorteoArray, setSorteoArray] = useState(numeros);

  return (
    <StyledSorteosContainer className="d-flex flex-column align-items-center">
      <div className="col-6 mx-auto pt-3 d-flex gap-5 justify-content-center">
        <button className="btn btn-danger">Eliminar sorteo</button>
        <button className="btn btn-primary">Agregar participante</button>
        <button className="btn btn-success">Crear sorteo</button>
      </div>
      <div className="col-6 mx-auto">
        <h5 className="text-white text-center pt-4 pb-2">
          Estas visualizando los participantes
        </h5>
        <Table
          striped
          bordered
          hover
          responsive
          variant="dark"
          className="align-middle"
        >
          <thead>
            <tr>
              <th className="text-center">Número</th>
              <th className="text-center">Usuario</th>
              <th className="text-center">Plataforma</th>
              <th className="text-center">Nombre y apellido</th>
              <th className="text-center">Ultimos 3 DNI</th>
            </tr>
          </thead>
          <tbody>
            {users.map((cajero, indice) => {
              return (
                <tr>
                  <td className="text-center" key={indice}>
                    {cajero.number}
                  </td>
                  <td className="text-center" key={++indice}>
                    {cajero.username}
                  </td>
                  <td className="text-center" key={++indice}>
                    {cajero.platform}
                  </td>
                  <td className="text-center" key={++indice}>
                    {cajero.fullname}
                  </td>
                  <td className="text-center" key={++indice}>
                    {cajero.dni}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="col-6 mx-auto d-flex justify-content-center flex-wrap py-4">
        {sorteoArray.map((value, i) => {
          let aux = i % 2 == 0;
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
      </div>
    </StyledSorteosContainer>
  );
};

const StyledSorteosContainer = styled.div`
  padding-top: 70px;
  min-height: 100vh;
  overflow: hidden;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;
