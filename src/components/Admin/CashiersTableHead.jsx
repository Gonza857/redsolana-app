import React from "react";
import {
  AiFillInfoCircle,
  AiOutlineOrderedList,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import styled from "styled-components";

const iconStlyle = { color: "fff", fontSize: "20px" };

export const CashiersTableHead = () => {
  return (
    <thead className="animate__animated animate__fadeIn">
      <tr className="align-middle">
        <th className="d-none d-md-table-cell">Pos</th>
        <th className="d-md-none" style={{ width: "5%" }}>
          <AiOutlineOrderedList style={iconStlyle} />
        </th>
        <th className="p-0">Red</th>
        <StyledTh className="p-0">Nombre</StyledTh>
        <th className="d-none d-md-table-cell p-0">Numero</th>
        <th className="d-none d-md-table-cell">Estado</th>
        <th className="d-none d-md-table-cell">Ver</th>
        <th className="d-md-none">
          <AiFillInfoCircle style={iconStlyle} />
        </th>
        <th className="d-none d-md-table-cell">Editar</th>
        <th className="d-md-none">
          <FaUserEdit style={iconStlyle} />
        </th>
        <th className="d-none d-md-table-cell">Eliminar</th>
        <th className="d-md-none">
          <AiOutlineUserDelete style={iconStlyle} />
        </th>
      </tr>
    </thead>
  );
};

const StyledTh = styled.th`
  width: 20%;
`;
