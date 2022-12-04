import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { adminContext } from "../../storage/AdminContext";
import ModalEditCajeros from "../ModalEditCajeros/ModalEditCajeros";
import "animate.css";
import ModalViewInfo from "../ModalViewInfo/ModalViewInfo";
import ModalViewLink from "../ModalViewLink/ModalViewLink";
import "./cajeroAdmin.css";

function CajeroAdmin({ cajero, onClose }) {
  const { handleDelete } = useContext(adminContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleCloseLink = () => setShowLink(false);
  const handleShowLink = () => {
    setShowLink(true);
  };

  return (
    <>
      <tr key={cajero.id} className="animate__animated animate__fadeIn">
        <td>{cajero.red}</td>
        <td>{cajero.nombre}</td>
        <td className="d-md-none">
          <Button
            className="cajeroBtn"
            onClick={() => {
              handleShowInfo(cajero);
            }}
          >
            <FaEye />
          </Button>
        </td>
        <td className="d-none d-md-table-cell">{cajero.genero}</td>
        <td className="d-none d-md-table-cell">{cajero.numero}</td>
        <td className="d-none d-md-table-cell">
          <Button
            className="cajeroBtn"
            onClick={() => {
              handleShowLink(cajero);
            }}
          >
            <FaEye />
          </Button>
        </td>
        <td>
          <Button
            className="cajeroBtn"
            onClick={() => {
              handleShowEdit(cajero);
            }}
          >
            <FaPen />
          </Button>
        </td>
        <td>
          <Button
            className="cajeroBtn"
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
      <ModalViewInfo
        onClose={handleCloseInfo}
        show={showInfo}
        cajeroData={cajero}
      />
      <ModalViewLink
        onClose={handleCloseLink}
        show={showLink}
        cajeroData={cajero}
      />
    </>
  );
}

export default CajeroAdmin;
