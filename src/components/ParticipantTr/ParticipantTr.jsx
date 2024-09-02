import React from "react";
import { ModalParticipant } from "../ModalParticipant/ModalParticipant";
import { FaEye, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { adminContext, solana } from "../../storage/AdminContext";
import Swal from "sweetalert2";
import { MainButton } from "../UI/MainButton";

export const ParticipantTr = ({ participant, openModal }) => {
  const { c_getDrawParticipants } = useContext(adminContext);
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
        solana.draw.deleteParticipant(participant);
        c_getDrawParticipants();
      }
    });
  };
  return (
    <tr>
      <td className="text-center">{participant._number}</td>
      <td className="text-center">{participant._user}</td>
      <td className="text-center d-none d-sm-table-cell">
        {participant._platform}
      </td>
      <td className="text-center d-none d-md-table-cell">
        {participant._fullname}
      </td>
      <td className="text-center d-none d-sm-table-cell">
        {participant?._lastDni}
      </td>
      <td className="p-1 text-center">
        <div className="d-flex gap-2">
          <MainButton
            circle={true}
            onClick={() => {
              openModal(participant);
            }}
          >
            <FaEye style={{ fontSize: "1rem" }} />
          </MainButton>
          <MainButton circle={true} red={true}>
            <FaTrash
              style={{ fontSize: "1rem" }}
              onClick={() => confirmDelete(participant)}
            />
          </MainButton>
        </div>
      </td>
    </tr>
  );
};
