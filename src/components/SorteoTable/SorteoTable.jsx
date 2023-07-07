import React from "react";
import { Table } from "react-bootstrap";
import { AiFillInfoCircle, AiOutlineUserDelete } from "react-icons/ai";
import { FaEye, FaPen, FaTrash, FaUserEdit } from "react-icons/fa";
import { adminContext } from "../../storage/AdminContext";
import { useContext } from "react";

export const SorteoTable = () => {
  const { participants, deleteParticipant } = useContext(adminContext);

  const accionButton = () => {};

  const deleteThisParticipant = (participant) => {
    deleteParticipant(participant);
  };

  return (
    <Table
      striped
      bordered
      hover
      responsive
      variant="dark"
      className="align-middle"
      id="tablaParaExcel"
    >
      <thead>
        <tr>
          <th className="text-center">Número</th>
          <th className="text-center">Usuario</th>
          <th className="text-center">Plataforma</th>
          <th className="text-center">Nombre y apellido</th>
          <th className="text-center">Ultimos 3 DNI</th>
          <th className="text-center">
            <AiOutlineUserDelete style={{ color: "fff", fontSize: "20px" }} />
          </th>
          <th className="text-center">
            <FaUserEdit style={{ color: "fff", fontSize: "20px" }} />
          </th>
          <th className="text-center">
            <AiFillInfoCircle style={{ color: "fff", fontSize: "20px" }} />
          </th>
        </tr>
      </thead>
      <tbody>
        {participants.map((participant, indice) => {
          return (
            <tr>
              <td className="text-center" key={indice}>
                {participant.numero}
              </td>
              <td className="text-center" key={++indice}>
                {participant.usuario}
              </td>
              <td className="text-center" key={++indice}>
                {participant.plataforma}
              </td>
              <td className="text-center" key={++indice}>
                {participant.nombre_apellido}
              </td>
              <td className="text-center" key={++indice}>
                {participant.dni_ultimos}
              </td>
              <td className="p-0 text-center">
                <FaTrash
                  style={{ fontSize: "1rem" }}
                  onClick={() => deleteThisParticipant(participant)}
                />
              </td>
              <td className="p-0 text-center">
                <FaPen
                  style={{ fontSize: "1rem" }}
                  onClick={() => accionButton()}
                />
              </td>
              <td className="p-0 text-center">
                <FaEye
                  style={{ fontSize: "1rem" }}
                  onClick={() => accionButton()}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
