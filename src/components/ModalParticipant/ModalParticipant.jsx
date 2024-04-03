import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MainButton } from "../APublic/MainButton/MainButton";

export const ModalParticipant = ({ handleClose, show, participant }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Información del participante</h3>
        </Modal.Header>
        <Modal.Body>
          <p>
            Número: <strong>{participant?.numero}</strong>
          </p>
          <p>
            Usuario: <strong>{participant?.usuario}</strong>
          </p>
          <p>
            Plataforma: <strong>{participant?.plataforma}</strong>
          </p>
          <p>
            Nombre y apellido: <strong>{participant?.nombre_apellido}</strong>
          </p>
          <p>
            Últimos 3 DNI: <strong>{participant?.dni_ultimos}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <MainButton fn={handleClose}>Cerrar</MainButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
