import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalViewInfo({ onClose, show, cajeroData }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Información del cajero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Red: {cajeroData.red}</p>
          <p>Nombre: {cajeroData.nombre}</p>
          <p>Genero: {cajeroData.genero}</p>
          <p>Numero: {cajeroData.numero}</p>
          <p>Enlace: {cajeroData.enlace}</p>
        </div>
        <Button variant="info" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalViewInfo;
