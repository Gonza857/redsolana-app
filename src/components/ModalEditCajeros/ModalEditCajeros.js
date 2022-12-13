import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updateCajeroInfo } from "../../firebase/firebase";
import { adminContext } from "../../storage/AdminContext";
import styled from "styled-components";
import EditCajerosForm from "../EditCajerosForm/EditCajerosForm";

function ModalEditCajeros({ onClose, show, cajeroData }) {
  const { cajeros, setCajeros } = useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const newCajero = {
      ...data,
      id: cajeroData.id,
    };
    let copyCajeros = [...cajeros];
    const searchCajeroPosition = cajeros.findIndex(
      (cajero) => cajero.id === newCajero.id
    );
    copyCajeros.splice(searchCajeroPosition, 1);
    copyCajeros.push(newCajero);
    setCajeros(copyCajeros);
    updateCajeroInfo(newCajero);
    onClose();
  };

  let generoMasc;
  let generoFem;
  if (cajeroData.genero === "M") {
    generoMasc = true;
    generoFem = false;
  } else {
    generoMasc = false;
    generoFem = true;
  }

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
          <EditCajerosForm cajeroData={cajeroData} onClose={onClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditCajeros;

const CajeroPhoto = styled.img`
  width: 100%;
  height: 100%;
  border: 3px solid red;
  object-fit: contain;
`;
