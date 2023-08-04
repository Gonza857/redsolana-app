import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaPen, FaEye } from "react-icons/fa";
import { adminContext } from "../../storage/AdminContext";
import ModalEditCajeros from "../ModalEditCajeros/ModalEditCajeros";
import "animate.css";
import ModalViewInfo from "../ModalViewInfo/ModalViewInfo";
import "./cajeroAdmin.css";
import { BsCircleFill } from "react-icons/bs";

function CajeroAdmin({ cajero }) {
  const { handleDelete, cajeros } = useContext(adminContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    if (cajero.nombre.length > 15) {
      let cambio = cajero.nombre.substring(12, -1);
      let nameUpdate = cambio.concat("...");
      cajero.nombre = nameUpdate;
    }
  }, [cajeros, cajero]);

  return (
    <>
      <tr className="animate__animated animate__fadeIn">
        <td>{cajero.pos + 1}</td>
        <td>{cajero.red}</td>
        <td>{cajero.nombre}</td>
        <td className="d-none d-md-table-cell">{cajero.numero}</td>
        <td className="d-none d-md-table-cell">
          {cajero.genero === "M" ? "M" : "F"}
        </td>
        <td>
          {cajero.estado === "desconectado" ? (
            <BsCircleFill style={{ color: "red" }} />
          ) : (
            <BsCircleFill style={{ color: "green" }} />
          )}
        </td>
        <td className="">
          <Button
            className="cajeroBtn"
            onClick={() => {
              handleShowInfo(cajero);
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
        cajeroIndex={cajero.pos + 1}
      />
      <ModalViewInfo
        onClose={handleCloseInfo}
        show={showInfo}
        cajeroData={cajero}
        cajeroIndex={cajero.pos + 1}
      />
    </>
  );
}

export default CajeroAdmin;
