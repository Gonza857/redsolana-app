import React from "react";
import { Table } from "react-bootstrap";
import {
  AiFillInfoCircle,
  AiOutlineTable,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { adminContext } from "../../storage/AdminContext";
import { useContext } from "react";
import Swal from "sweetalert2";
import { MainButton } from "../MainButton/MainButton";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useState } from "react";
import { ParticipantTr } from "../ParticipantTr/ParticipantTr";
import { ModalParticipant } from "../ModalParticipant/ModalParticipant";

const iconStyle = { fontSize: "1.5rem" };

export const DrawParticipantsTable = () => {
  const { participants, deleteParticipant, participantsQuantity } =
    useContext(adminContext);
  const [participant, setParticipant] = useState(null);

  const accionButton = () => {
    setShow(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDelete = (participant) => {
    Swal.fire({
      title: "¿Seguro que desea eliminar este participante?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteParticipant(participant);
      }
    });
  };

  const deleteThisParticipant = (participant) => {
    confirmDelete(participant);
  };

  const openModal = (participant) => {
    setShow(true);
    setParticipant(participant);
  };

  const obtainParticipant = () => {};

  return (
    <div className="col-12 d-flex flex-column align-items-center py-3 gap-3 bor3">
      <ModalParticipant
        handleClose={handleClose}
        show={show}
        participant={participant}
      />
      {participants?.length == 0 ? (
        <>
          <h3 className="text-white">No hay participantes registrados.</h3>
          <Link to="/admin/sorteo/agregar">
            <MainButton>Agregar</MainButton>
          </Link>
        </>
      ) : (
        <>
          <div className="d-flex gap-2 flex-wrap align-items-center justify-content-center">
            <Link
              to="/admin/sorteo/agregar"
              className="animate__animated animate__fadeIn"
            >
              <MainButton>
                Agregar participante
                <AiOutlineUserAdd style={iconStyle} />
              </MainButton>
            </Link>
            <Link
              to={"/admin/sorteo/numeros"}
              className="text-white animate__animated animate__fadeIn"
            >
              <MainButton>
                Ver tabla de números
                <AiOutlineTable style={iconStyle} />
              </MainButton>
            </Link>
            <ReactHTMLTableToExcel
              className="mainButton primary animate__animated animate__fadeIn"
              table="tablaParaExcel"
              filename="participantes"
              sheet="pagina 1"
              buttonText={`Descargar excel`}
            />
          </div>
          <h3 className="text-white">
            Participantes: <strong>{participantsQuantity}</strong>
          </h3>
          <div className="col-11 col-lg-9 col-xl-6">
            <Table
              striped
              bordered
              hover
              responsive
              variant="dark"
              className="align-middle animate__animated animate__fadeIn"
              id="tablaParaExcel"
            >
              <thead>
                <tr>
                  <th className="text-center">N°</th>
                  <th className="text-center">Usuario</th>
                  <th className="text-center d-none d-sm-table-cell">
                    Plataforma
                  </th>
                  <th className="text-center d-none d-md-table-cell">
                    Nombre y apellido
                  </th>
                  <th className="text-center d-none d-sm-table-cell">
                    Ultimos 3 DNI
                  </th>
                  <th className="text-center px-lg-3">
                    <AiOutlineUserDelete
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>
                  <th className="text-center px-lg-3">
                    <AiFillInfoCircle
                      style={{ color: "fff", fontSize: "20px" }}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => {
                  if (participant !== null) {
                    return (
                      <ParticipantTr
                        handleClose={handleClose}
                        show={show}
                        openModal={openModal}
                        participant={participant}
                        key={participant.id}
                      />
                    );
                  }
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};
