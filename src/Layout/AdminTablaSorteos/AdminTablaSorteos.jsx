import React from "react";
import { NumerosTable } from "../../components/DrawNumbersTable/DrawNumbersTable";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const AdminDraw = () => {
  return (
    <ContainerNumberTable>
      <div className="bor1 col-12">
        <button>
          <Link to={"/admin/sorteos"}>Volver</Link>
        </button>
      </div>
      <DrawNumberTable />
    </ContainerNumberTable>
  );
};

const ContainerNumberTable = styled.div`
  min-height: 100vh;
  margin-top: 70px;
  overflow: hidden;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;
