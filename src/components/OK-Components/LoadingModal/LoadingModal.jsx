import { Ring } from "@uiball/loaders";
import React from "react";
import { Modal } from "react-bootstrap";

export const LoadingModal = ({ show, handleClose }) => {
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-w10"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Body className="d-flex justify-content-center">
        <Ring size={50} lineWeight={5} speed={2} color="#d4af37" />
      </Modal.Body>
    </Modal>
  );
};
