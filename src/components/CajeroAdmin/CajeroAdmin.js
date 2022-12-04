import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { adminContext } from "../../storage/AdminContext";
import ModalEditCajeros from "../ModalEditCajeros/ModalEditCajeros";
import "animate.css";

function CajeroAdmin({ cajero, onClose }) {
  const { handleDelete } = useContext(adminContext);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = () => {
    setShowEdit(true);
    console.log(cajero);
  };

  return (
    <>
      <tr key={cajero.id} className="animate__animated animate__fadeIn">
        <td>{cajero.red}</td>
        <td>{cajero.nombre}</td>
        <td className="d-none">{cajero.genero}</td>
        <td>{cajero.numero}</td>
        <td>
          <Button>
            <FaEye />
          </Button>
        </td>
        <td>
          <Button
            onClick={() => {
              handleShowEdit(cajero);
            }}
          >
            <FaPen />
          </Button>
        </td>
        <td>
          <Button
            onClick={() => {
              handleDelete(cajero);
            }}
          >
            <FaTrash />
          </Button>
        </td>
      </tr>
      <ModalEditCajeros
        onClose={handleCloseEdit}
        show={showEdit}
        cajeroData={cajero}
      />
    </>
  );
}

export default CajeroAdmin;
