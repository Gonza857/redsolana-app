import React, { useContext } from "react";
import { adminContext } from "../../../storage/AdminContext.jsx";
import CajeroAdmin from "../../../components/CajeroAdmin/CajeroAdmin.jsx";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { AdminBar } from "../../../components/AdminBar/AdminBar.jsx";
import styled from "styled-components";
import { CashiersTableHead } from "../../../components/Admin/CashiersTableHead.jsx";
import { Loader } from "../../../components/UI/Loader.jsx";

export function AdminCajeros() {
  const {
    solana,
    isAdmin,
    isSearchingCajero,
    searchResult,
    searchedName,
    isLoading,
  } = useContext(adminContext);
  const navigate = useNavigate();
  const avisarBusquedad = () => console.log("Llamado de hijo a padre");
  if (!isAdmin) navigate("/");

  return (
    <AdminCajerosContainer className="col-12 py-2">
      <Wrapper className="col-12 col-sm-10 col-lg-9 col-xl-8">
        <AdminBar z={avisarBusquedad} />
        {isSearchingCajero ? (
          <>
            {searchResult.length === 0 ? (
              <ResultText searchedName={searchedName}>
                No se encontraron resultados con la busquedad de: "
              </ResultText>
            ) : (
              <ResultText searchedName={searchedName}>
                Se muestran resultados de la busquedad de: "
              </ResultText>
            )}
          </>
        ) : (
          <AllCajerosText className="py-3">
            Estas visualizando todos los cajeros verificados
          </AllCajerosText>
        )}
        <TableLayout>
          {isSearchingCajero ? (
            <>
              {searchResult.map((cajero) => {
                return <CajeroAdmin cajero={cajero} key={cajero.id} />;
              })}
            </>
          ) : (
            <>
              {!isLoading &&
                solana.cajeros.map((cajero) => {
                  return <CajeroAdmin cajero={cajero} key={cajero.id} />;
                })}
            </>
          )}
        </TableLayout>
        {isLoading && (
          <div className="m-auto">
            <Loader />
          </div>
        )}
      </Wrapper>
    </AdminCajerosContainer>
  );
}

const TableLayout = ({ children }) => {
  return (
    <Table
      striped
      bordered
      hover
      responsive
      variant="dark"
      className="align-middle"
    >
      <CashiersTableHead />
      <tbody>{children}</tbody>
    </Table>
  );
};

const ResultText = ({ children, searchedName }) => {
  return (
    <AllCajerosText className="py-3">
      {children}
      <strong>{searchedName}</strong>"
    </AllCajerosText>
  );
};

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
