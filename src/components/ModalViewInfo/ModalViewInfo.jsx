import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { BsCircleFill } from "react-icons/bs";

export const ModalViewInfo = ({ onClose, show, cajeroData }) => {
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
          <div></div>
          <p>Red: {cajeroData.red}</p>
          <p>Nombre: {cajeroData.nombre}</p>
          <p>
            Genero:
            {cajeroData.genero !== "M" ? " Femenino" : " Masculino"}
          </p>
          <p>
            Estado:{" "}
            {cajeroData.estado === "desconectado" ? (
              <BsCircleFill style={{ color: "red" }} />
            ) : (
              <BsCircleFill style={{ color: "green" }} />
            )}
          </p>
          <p>Numero: {cajeroData.numero}</p>
          <p>
            Enlace:
            {cajeroData.enlace !== ""
              ? ` ${cajeroData.enlace}`
              : " No establecido."}
          </p>
        </div>
        {cajeroData.imagen !== null ? (
          <>
            <p>Imagen: Establecida.</p>
            <div className="col-5 m-auto p-0 m-0 my-2">
              <CajeroPhoto
                src={cajeroData.imagen?.url}
                alto="fotito"
                className="p-0 m-0"
              />
            </div>
            <div className="col-6 p-0 px-3 d-flex flex-column justify-content-evenly"></div>
          </>
        ) : (
          <p>Imagen: No establecida.</p>
        )}

        <SubmitContainer>
          <Button onClick={onClose}>Cerrar</Button>
        </SubmitContainer>
      </Modal.Body>
    </Modal>
  );
};

const CajeroPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SubmitContainer = styled.div`
  border-top: 1px solid #c7c7c7;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;
