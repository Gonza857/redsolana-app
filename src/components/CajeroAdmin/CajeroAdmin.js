import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import { adminContext } from "../../storage/AdminContext";
import ModalEditCajeros from "../ModalEditCajeros/ModalEditCajeros";

function CajeroAdmin({ cajero, onClose, show }) {
  const { handleDelete } = useContext(adminContext);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = () => {
    setShowEdit(true);
    console.log(cajero);
  };
  return (
    <>
      <tr key={cajero.id}>
        <td>{cajero.red}</td>
        <td>{cajero.nombre}</td>
        <td>{cajero.genero}</td>
        <td>{cajero.numero}</td>
        <td>{cajero.enlace}</td>
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