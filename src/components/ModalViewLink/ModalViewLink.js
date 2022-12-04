import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalViewLink({ onClose, show, cajeroData }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Enlace de WhatsApp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Enlace: {cajeroData.enlace}</p>
        </div>
        <Button variant="info" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalViewLink;
