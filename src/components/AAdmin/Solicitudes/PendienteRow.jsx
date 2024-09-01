import React, { useContext, useState } from "react";
import styled from "styled-components";
import { solicitudesContext } from "../../../storage/AdminContext";
import { AiOutlineCheck, AiOutlineWhatsApp } from "react-icons/ai";
import { ModalViewHistorialData } from "./ModalViewHistorialData";
import { FaEye } from "react-icons/fa";

export const PendienteRow = ({ solicitud }) => {
  const { actualizarEstadoSolicitud } = useContext(solicitudesContext);

  const [showInfo, setShowInfo] = useState(false);

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  return (
    <>
      <tr className="animate__animated animate__fadeIn" key={solicitud.id}>
        <td className="p-0">
          {solicitud._date} - {solicitud._time}
        </td>
        <td className="p-0">{solicitud._fullname}</td>
        <td className="p-0 d-none d-lg-table-cell">{solicitud._email}</td>
        <td className="p-0 d-none d-md-table-cell">{solicitud._phone}</td>
        <td className="p-0 d-none d-sm-table-cell">{solicitud._platform}</td>
        <td className="p-1 d-flex">
          <StyledWspBtn>
            <a
              href={`https://wa.me/549${solicitud._phone}`}
              target="_BLANK"
              rel="noreferrer"
            >
              <AiOutlineWhatsApp />
            </a>
          </StyledWspBtn>
          <StyledCheckBtn onClick={() => actualizarEstadoSolicitud(solicitud)}>
            <AiOutlineCheck />
          </StyledCheckBtn>
          <StyledViewBtn onClick={() => handleShowInfo()}>
            <FaEye />
          </StyledViewBtn>
        </td>
      </tr>
      <ModalViewHistorialData
        onClose={handleCloseInfo}
        show={showInfo}
        solicitud={solicitud}
      />
    </>
  );
};

const StyledCheckBtn = styled.button`
  outline: none;
  background: none;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
  background-color: #25d366;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  &:hover {
    background-color: #177e3d;
  }
  @media screen and (min-width: 992px) {
    width: 40px;
    height: 40px;
  }
  svg {
    font-size: 1rem;
    border-radius: 50%;
    color: #000;
    @media screen and (min-width: 992px) {
      font-size: 1.5rem;
    }
  }
`;

const StyledViewBtn = styled(StyledCheckBtn)`
  background-color: #d4af37;
  svg {
    color: #000;
  }
`;

const StyledWspBtn = styled(StyledCheckBtn)`
  background-color: #25d366;
  svg {
    color: #000;
  }
`;
