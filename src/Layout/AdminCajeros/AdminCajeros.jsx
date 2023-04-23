import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../../storage/AdminContext";
import CajeroAdmin from "../../components/CajeroAdmin/CajeroAdmin";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import AdminBar from "../../components/AdminBar/AdminBar.jsx";
import { Metronome } from "@uiball/loaders";
import {
  AiFillInfoCircle,
  AiOutlineOrderedList,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import styled from "styled-components";
import { HiStatusOnline } from "react-icons/hi";

function AdminCajeros() {
  const [isLoading, setIsLoading] = useState(false);

  const { cajeros, isAdmin, isSearchingCajero, searchResult, searchedName } =
    useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cajeros.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cajeros]);

  return (
    <>
      {isAdmin ? (
        <AdminCajerosContainer className="col-12 p-1">
          <Wrapper className="col-12 col-sm-10 col-lg-9 col-xl-8 mt-2">
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
                  <th className="d-md-none">
                    <AiOutlineOrderedList
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>
                  <th className="p-0">Red</th>
                  <th className="p-0">Nombre</th>
                  <th className="d-none d-md-table-cell p-0">Numero</th>
                  <th className="d-none d-md-table-cell p-0">Genero</th>
                  <th className="d-none d-md-table-cell">Estado</th>
                  <th className="d-md-none">
                    <HiStatusOnline
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>

                  <th className="d-none d-md-table-cell">Info</th>
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

export default AdminCajeros;

const AdminCajerosContainer = styled.div`
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  min-height: 100vh;
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
