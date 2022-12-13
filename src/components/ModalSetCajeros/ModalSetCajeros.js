import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import AddCajerosForm from "../AddCajerosForm/AddCajerosForm";

function ModalSetCajeros({ onClose, show }) {
  // if (
  //   errors.red?.type === "required" ||
  //   errors.adminPass?.type === "required" ||
  //   errors.nombre?.type ||
  //   errors.genero ||
  //   errors.numero?.type
  // ) {
  //   completeFields();
  // }

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
