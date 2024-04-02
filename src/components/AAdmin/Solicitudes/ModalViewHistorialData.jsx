import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

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
          <strong>Fecha:</strong> {solicitud.date}
        </p>
        <p>
          <strong>Nombre completo:</strong> {solicitud.fullname}
        </p>
        <p>
          <strong>E-Mail:</strong> {solicitud.email}
        </p>
        <p>
          <strong>Celular:</strong> {solicitud.phone}
        </p>
        <p>
          <strong>Plataforma:</strong> {solicitud.platform}
        </p>
        <p>
          <strong>Resuelto:</strong> {solicitud.solved}
        </p>
        <SubmitContainer>
          <Button onClick={onClose}>Cerrar</Button>
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
