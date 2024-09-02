import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MainButton } from "../UI/MainButton";

export const ModalParticipant = ({ handleClose, show, participant }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Información del participante</h3>
        </Modal.Header>
        <Modal.Body>
          <p>
            Número: <strong>{participant?._number}</strong>
          </p>
          <p>
            Usuario: <strong>{participant?._user}</strong>
          </p>
          <p>
            Plataforma: <strong>{participant?._platform}</strong>
          </p>
          <p>
            Nombre y apellido: <strong>{participant?._fullname}</strong>
          </p>
          <p>
            Últimos 3 DNI: <strong>{participant?._lastDni}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <MainButton onClick={handleClose}>Cerrar</MainButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
