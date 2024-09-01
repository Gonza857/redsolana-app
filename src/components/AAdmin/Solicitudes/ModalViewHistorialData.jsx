import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { MainButton } from "../../UI/MainButton";

export const ModalViewHistorialData = ({ onClose, show, solicitud }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Información de la solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Fecha:</strong> {solicitud._date}
        </p>
        <p>
          <strong>Nombre completo:</strong> {solicitud._fullname}
        </p>
        <p>
          <strong>E-Mail:</strong> {solicitud._email}
        </p>
        <p>
          <strong>Celular:</strong> {solicitud._phone}
        </p>
        <p>
          <strong>Plataforma:</strong> {solicitud._platform}
        </p>
        <p>
          <strong>Resuelto: </strong>
          {solicitud._solved == null ? "No resuelto" : solicitud._solved}
        </p>
        <SubmitContainer>
          <MainButton onClick={() => onClose()}>Cerrar</MainButton>
        </SubmitContainer>
      </Modal.Body>
    </Modal>
  );
};

const SubmitContainer = styled.div`
  border-top: 1px solid #c7c7c7;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;
