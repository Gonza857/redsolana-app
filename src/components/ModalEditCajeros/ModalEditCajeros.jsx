import React from "react";
import { Modal } from "react-bootstrap";
import EditCajerosForm from "../EditCajerosForm/EditCajerosForm";

function ModalEditCajeros({ onClose, show, cajeroData, cajeroIndex }) {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar información del cajero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCajerosForm
            cajeroData={cajeroData}
            onClose={onClose}
            cajeroIndex={cajeroIndex}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditCajeros;
