import React from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCajerosForm from "../InputCajeros/AddCajerosForm";

function ModalSetCajeros({ onClose, show }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          Agregar nuevo cajero
          <AiOutlineUserAdd className="addCajeroIcon" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-0">
        <AddCajerosForm onClose={onClose} show={show} />
      </Modal.Body>
    </Modal>
  );
}

export default ModalSetCajeros;
