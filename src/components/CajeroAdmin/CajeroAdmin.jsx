import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { adminContext } from "../../storage/AdminContext";
import ModalEditCajeros from "../ModalEditCajeros/ModalEditCajeros";
import "animate.css";
import { ModalViewInfo } from "../ModalViewInfo/ModalViewInfo";
import "./cajeroAdmin.css";
import { BsCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { MainButton } from "../UI/MainButton";

function CajeroAdmin({ cajero }) {
  const { c_deleteCashier, cajeros } = useContext(adminContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    if (cajero.nombre.length > 15) {
      let cambio = cajero.nombre.substring(12, -1);
      let nameUpdate = cambio.concat("...");
      cajero.nombre = nameUpdate;
    }
  }, [cajeros, cajero]);

  return (
    <>
      <tr className="animate__animated animate__fadeIn">
        <StyledTd>{cajero.pos + 1}</StyledTd>
        <StyledTd>{cajero.red}</StyledTd>
        <StyledTd>{cajero.nombre}</StyledTd>
        <td className="d-none d-md-table-cell">{cajero.numero}</td>
        <td className="d-none d-md-table-cell">
          {cajero.estado === "desconectado" ? (
            <BsCircleFill style={{ color: "red" }} />
          ) : (
            <BsCircleFill style={{ color: "green" }} />
          )}
        </td>
        <td className="">
          <MainButton
            circle={true}
            primary={true}
            onClick={() => {
              handleShowInfo(cajero);
            }}
          >
            <FaEye />
          </MainButton>
        </td>

        <td className="">
          <MainButton
            circle={true}
            onClick={() => {
              handleShowEdit(cajero);
            }}
          >
            <FaPen />
          </MainButton>
        </td>
        <td>
          <MainButton
            circle={true}
            red={true}
            onClick={() => {
              c_deleteCashier(cajero);
            }}
          >
            <FaTrash />
          </MainButton>
        </td>
      </tr>
      <ModalEditCajeros
        onClose={handleCloseEdit}
        show={showEdit}
        cajeroData={cajero}
        cajeroIndex={cajero.pos + 1}
      />
      <ModalViewInfo
        onClose={handleCloseInfo}
        show={showInfo}
        cajeroData={cajero}
        cajeroIndex={cajero.pos + 1}
      />
    </>
  );
}

export default CajeroAdmin;

const StyledTd = styled.td`
  font-size: 0.7rem;
  @media screen and (min-width: 500px) {
    font-size: 0.85rem;
  }
  @media screen and (min-width: 600px) {
    font-size: 1rem;
  }
`;
