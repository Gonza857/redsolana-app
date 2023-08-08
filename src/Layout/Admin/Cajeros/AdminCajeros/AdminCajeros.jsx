import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../../../../storage/AdminContext";
import CajeroAdmin from "../../../../components/CajeroAdmin/CajeroAdmin";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { AdminBar } from "../../../../components/AdminBar/AdminBar.jsx";
import { Metronome } from "@uiball/loaders";
import {
  AiFillInfoCircle,
  AiOutlineOrderedList,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import styled from "styled-components";
import { HiStatusOnline } from "react-icons/hi";

export function AdminCajeros() {
  const {
    cajeros,
    isAdmin,
    isSearchingCajero,
    searchResult,
    searchedName,
    isLoading,
  } = useContext(adminContext);
  const navigate = useNavigate();

  return (
    <>
      {isAdmin ? (
        <AdminCajerosContainer className="col-12 py-2">
          <Wrapper className="col-12 col-sm-10 col-lg-9 col-xl-8">
            <AdminBar busquedad={searchResult !== [] || false} />
            {isSearchingCajero ? (
              <>
                {searchResult.length === 0 ? (
                  <>
                    <p className="m-0 py-2 text-white">
                      No se encontraron resultados con la busquedad de: "
                      <strong>{searchedName}</strong>"
                    </p>
                  </>
                ) : (
                  <>
                    {searchedName && (
                      <p className="m-0 py-2 text-white">
                        Se muestran resultados de la busquedad de: "
                        <strong>{searchedName}</strong>"
                      </p>
                    )}
                  </>
                )}
              </>
            ) : (
              <AllCajerosText className="py-3">
                Estas visualizando todos los cajeros verificados
              </AllCajerosText>
            )}
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
                  <th className="d-none d-md-table-cell">Pos</th>
                  <th className="d-md-none" style={{ width: "5%" }}>
                    <AiOutlineOrderedList
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>
                  <th className="p-0">Red</th>
                  <StyledTh className="p-0">Nombre</StyledTh>
                  <th className="d-none d-md-table-cell p-0">Numero</th>
                  {/* <th className="d-none d-lg-table-cell p-0">Genero</th> */}
                  <th className="d-none d-md-table-cell">Estado</th>
                  {/* <th className="d-md-none">
                    <HiStatusOnline
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th> */}

                  <th className="d-none d-md-table-cell">Ver</th>
                  <th className="d-md-none">
                    <AiFillInfoCircle
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>
                  <th className="d-none d-md-table-cell">Editar</th>
                  <th className="d-md-none">
                    <FaUserEdit style={{ color: "fff", fontSize: "20px" }} />
                  </th>
                  <th className="d-none d-md-table-cell">Eliminar</th>
                  <th className="d-md-none">
                    <AiOutlineUserDelete
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {isSearchingCajero ? (
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
                )}
              </tbody>
            </Table>
            {isLoading && (
              <div className="m-auto">
                <Metronome size={40} speed={1.6} color="#fff" />
              </div>
            )}
          </Wrapper>
        </AdminCajerosContainer>
      ) : (
        navigate("/admin")
      )}
    </>
  );
}

const StyledTh = styled.th`
  width: 20%;
`;

const AdminCajerosContainer = styled.div`
  @media (min-width: 320px) {
    th {
      font-size: 12px;
    }
  }

  @media (min-width: 600px) {
    th {
      font-size: 15px;
    }
  }

  @media (min-width: 1024px) {
    th {
      font-size: 17px;
    }
  }
`;

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const AllCajerosText = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  margin: 0;
`;
