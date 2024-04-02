import React, { useContext } from "react";
import styled from "styled-components";
import { solicitudesContext } from "../../../storage/AdminContext";
import { AiOutlineCheck } from "react-icons/ai";
import { MainButton } from "../../MainButton/MainButton";

export const PendienteRow = ({ solicitud }) => {
  const { actualizarEstadoSolicitud } = useContext(solicitudesContext);
  return (
    <tr className="animate__animated animate__fadeIn" key={solicitud.id}>
      <td>{solicitud.date}</td>
      <td>{solicitud.fullname}</td>
      <td>{solicitud.email}</td>
      <td>{solicitud.phone}</td>
      <td>{solicitud.platform}</td>
      <td>
        <StyledButtonContainer className="m-auto">
          <a href={`https://wa.me/549${solicitud.phone}`}>
            <img src="./assets/images/wsp-logo.png" />
          </a>
        </StyledButtonContainer>
      </td>
      <td className="align-middle">
        <StyledCheckBtn onClick={() => actualizarEstadoSolicitud(solicitud)}>
          <AiOutlineCheck />
        </StyledCheckBtn>
      </td>
    </tr>
  );
};

const StyledButtonContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const StyledCheckBtn = styled.button`
  outline: none;
  background: none;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: #25d366;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  &:hover {
    background-color: #177e3d;
  }
  svg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    color: #000;
  }
`;
