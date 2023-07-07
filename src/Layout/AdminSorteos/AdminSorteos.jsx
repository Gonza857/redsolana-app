import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiFillInfoCircle, AiOutlineUserDelete } from "react-icons/ai";
import { FaEye, FaPen, FaTrash, FaUserEdit } from "react-icons/fa";
import { AddParticipantForm } from "../../components/AddParticipantForm/AddParticipantForm";
import { SorteoTable } from "../../components/SorteoTable/SorteoTable";
import { NumerosTable } from "../../components/NumerosTable/NumerosTable";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const numeros = new Array(170).fill(false);

export const AdminSorteos = () => {
  const [sorteoArray, setSorteoArray] = useState(numeros);
  const {
    sorteoActivo,
    setSorteoActivo,
    participants,
    addParticipant,
    getParticipants,
    viewNumberTable,
    viewParticipantsTable,
  } = useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const confirmDelete = () => {
    Swal.fire({
      title: "¿Seguro que deseas desactivar el sorteo?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSorteoActivo(false);
        Swal.fire(
          "¡Desactivado!",
          "El sorteo se ha desactivado correctamente.",
          "success"
        );
      }
    });
  };

  const createSorteo = () => {
    Swal.fire({
      title: "¿Quieres crear un sorteo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Crear sorteo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setSorteoActivo(true);
        Swal.fire(
          "¡Creado!",
          "El sorteo se ha activado correctamente",
          "success"
        );
      }
    });
  };

  useEffect(() => {
    console.table(participants);
  }, [participants]);

  return (
    <StyledSorteosContainer className="d-flex flex-column align-items-center bor2 p-1">
      <AdminBarContainer className="col-10 gap-3 gap-lg-0 flex-lg-row py-2 px-3 px-lg-0 flex-md-row bor1">
        {sorteoActivo ? (
          <>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Eliminar sorteo
            </button>
            <button className="btn btn-primary">Agregar participante</button>
          </>
        ) : (
          <>
            <button className="btn btn-success" onClick={createSorteo}>
              Crear sorteo
            </button>
            <button className="btn btn-danger" onClick={getParticipants}>
              Fetch Participants
            </button>
            <button className="btn btn-secondary" onClick={viewNumberTable}>
              Ver numeros
            </button>
            <button
              className="btn btn-secondary"
              onClick={viewParticipantsTable}
            >
              Ver participantes
            </button>
            <Link to={"/admin/sorteos/tabla-numeros"} className="text-white">
              <button className="btn btn-success">Ver tabla de números </button>
            </Link>
            <ReactHTMLTableToExcel
              className="btn btn-success"
              table="tablaParaExcel"
              filename="participantes"
              sheet="pagina 1"
              buttonText="Descargar en excel"
            />
          </>
        )}
      </AdminBarContainer>
      <div className="col-11 d-flex flex-column flex-lg-row justify-content-around bor1">
        <div className="bor3 col-12 col-lg-4 m-auto">
          <AddParticipantForm />
        </div>
        <div className="col-12 col-lg-8 bor3 m-auto">
          <h5 className="text-white text-center pt-4 pb-2">
            Estas visualizando los participantes
          </h5>
          <SorteoTable />
        </div>
      </div>
    </StyledSorteosContainer>
  );
};

const StyledSorteosContainer = styled.div`
  min-height: 100vh;
  margin-top: 70px;
  overflow: hidden;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const AdminBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  button {
    &:nth-child(3) {
      border-radius: 0 !important;
      svg {
        font-size: 25px !important;
        margin: 0;
      }
    }
    svg {
      font-size: 25px !important;
      margin-left: 8px;
    }
  }
`;
