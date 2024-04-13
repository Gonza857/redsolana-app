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
        <td>{solicitud.date}</td>
        <td>{solicitud.fullname}</td>
        <td className="d-none d-lg-table-cell">{solicitud.email}</td>
        <td className="d-none d-md-table-cell">{solicitud.phone}</td>
        <td className="d-none d-sm-table-cell">{solicitud.platform}</td>
        <td>
          <StyledWspBtn>
            <a
              href={`https://wa.me/549${solicitud.phone}`}
              target="_BLANK"
              rel="noreferrer"
            >
              <AiOutlineWhatsApp />
            </a>
          </StyledWspBtn>
        </td>
        <td>
          <StyledCheckBtn onClick={() => actualizarEstadoSolicitud(solicitud)}>
            <AiOutlineCheck />
          </StyledCheckBtn>
        </td>
        <td className="d-lg-none">
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
