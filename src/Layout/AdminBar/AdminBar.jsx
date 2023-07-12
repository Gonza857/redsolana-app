import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoAdd } from "react-icons/io5";
import { AiOutlineOrderedList, AiOutlineTable } from "react-icons/ai";
import { MdOutlinePageview } from "react-icons/md";

const iconStyle = { fontSize: "1.5rem" };

export const AdminBar = () => {
  return (
    <StyledAdminBar className="col-2 bor1 text-white ps-4 pt-2">
      <h2>Admin</h2>
      <div className="d-flex flex-column gap-4">
        <ul lassName="p-0 m-0 bor2">
          <li>
            <h3>Cajeros</h3>
          </li>
          <li className="d-flex align-items-center gap-2">
            <AiOutlineOrderedList style={iconStyle} />
            <Link to="/admin/cajeros">
              <StyledOption>Ver cajeros</StyledOption>
            </Link>
          </li>
        </ul>
        <ul lassName="p-0 m-0 bor2">
          <li>
            <h3>Sorteos</h3>
          </li>
          <li className="d-flex align-items-center gap-2">
            <AiOutlineOrderedList style={iconStyle} />
            <Link to="/admin/sorteos">
              <StyledOption>Ver participantes</StyledOption>
            </Link>
          </li>
          <li className="d-flex align-items-center gap-2">
            <AiOutlineTable style={iconStyle} />
            <Link to="/admin/sorteos/tabla-numeros">
              <StyledOption>Ver numeros</StyledOption>
            </Link>
          </li>
        </ul>
        <ul className="p-0 m-0 bor2">
          <li>
            <h3>Casinos</h3>
          </li>
          <li className="d-flex align-items-center gap-2">
            <IoAdd style={iconStyle} />
            <Link to="/admin/casinos/agregar">
              <StyledOption>Agregar</StyledOption>
            </Link>
          </li>
          <li className="d-flex align-items-center gap-2">
            <MdOutlinePageview style={iconStyle} />
            <Link to="/admin/ver-casinos">
              <StyledOption>Ver casinos</StyledOption>
            </Link>
          </li>
        </ul>
      </div>
    </StyledAdminBar>
  );
};

const StyledAdminBar = styled.section`
  min-height: calc(100vh - 70px);
  margin-top: 70px;
`;

const StyledOption = styled.p`
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #fff;
`;
