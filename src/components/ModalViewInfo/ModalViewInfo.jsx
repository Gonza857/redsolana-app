import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { BsCircleFill } from "react-icons/bs";
import { MainButton } from "../UI/MainButton";

const InfoRow = ({ name, data }) => {
  return (
    <p className="p-0 m-0">
      <strong>{name}: </strong>
      {data}
    </p>
  );
};

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
        <div className="d-flex gap-1 flex-column">
          <InfoRow name={"Red"} data={cajeroData._network} />
          <InfoRow name={"Nombre"} data={cajeroData._name} />
          <InfoRow
            name={"Genero"}
            data={cajeroData._genre !== "M" ? " Femenino" : " Masculino"}
          />
          <InfoRow
            name={"Estado"}
            data={
              cajeroData._state === "desconectado" ? (
                <BsCircleFill style={{ color: "red" }} />
              ) : (
                <BsCircleFill style={{ color: "green" }} />
              )
            }
          />
          <InfoRow name={"Número"} data={cajeroData._phone} />
          <InfoRow
            name={"Enlace"}
            data={
              cajeroData._link !== ""
                ? ` ${cajeroData._link}`
                : " No establecido."
            }
          />
        </div>
        {cajeroData._image !== null ? (
          <>
            <InfoRow name={"Imagen"} data={"Establecida."} />
            <div className="col-5 m-auto p-0 m-0 my-2">
              <CajeroPhoto
                src={cajeroData._image?.url}
                alto="fotito"
                className="p-0 m-0"
              />
            </div>
            <div className="col-6 p-0 px-3 d-flex flex-column justify-content-evenly"></div>
          </>
        ) : (
          <InfoRow name={"Imagen"} data={"No establecida."} />
        )}

        <SubmitContainer>
          <MainButton onClick={onClose}>Cerrar</MainButton>
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
