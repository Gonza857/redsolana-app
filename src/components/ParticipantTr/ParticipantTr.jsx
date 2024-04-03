import React from "react";
import { ModalParticipant } from "../ModalParticipant/ModalParticipant";
import { FaEye, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import Swal from "sweetalert2";
import { MainButton } from "../APublic/MainButton/MainButton";

export const ParticipantTr = ({
  participant,
  handleClose,
  show,
  openModal,
}) => {
  const { deleteParticipant } = useContext(adminContext);
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
  return (
    <tr>
      <td className="text-center">{participant?.numero}</td>
      <td className="text-center">{participant?.usuario}</td>
      <td className="text-center d-none d-sm-table-cell">
        {participant?.plataforma}
      </td>
      <td className="text-center d-none d-md-table-cell">
        {participant?.nombre_apellido}
      </td>
      <td className="text-center d-none d-sm-table-cell">
        {participant?.dni_ultimos}
      </td>
      <td className="p-0 text-center">
        <MainButton circle={true}>
          <FaEye
            style={{ fontSize: "1rem" }}
            onClick={() => {
              openModal(participant);
            }}
          />
        </MainButton>
      </td>
      <td className="p-0 text-center">
        <MainButton circle={true} red={true}>
          <FaTrash
            style={{ fontSize: "1rem" }}
            onClick={() => confirmDelete(participant)}
          />
        </MainButton>
      </td>
    </tr>
  );
};
