import React, { useEffect, useState, useContext } from "react";
import "./adminCajeros.css";
import ModalSetCajeros from "../../components/ModalSetCajeros/ModalSetCajeros";
import { adminContext } from "../../storage/AdminContext";
import CajeroAdmin from "../../components/CajeroAdmin/CajeroAdmin";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function AdminCajeros() {
  const { cajeros, traerCajeros, cantidadCajeros } = useContext(adminContext);
  const [showAdd, setShowAdd] = useState(false);

  // td columna
  // tr fila
  // th encabezado (negrita)

  useEffect(() => {
    traerCajeros();
  }, []);

  useEffect(() => {
    console.log("eliminé y quedo asi", cajeros);
  }, [cajeros]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  function handleAddCajero() {
    handleShowAdd();
  }

  return (
    <div>
      <div className="col-lg-8 m-auto d-flex flex-column mt-5">
        <div className="d-flex col-12 justify-content-evenly">
          <ModalSetCajeros show={showAdd} onClose={handleCloseAdd} />
          <Button onClick={() => handleAddCajero()} variant="success">
            Agregar nuevo cajero
          </Button>
          <Button>Buscar cajeros de una red</Button>
          <Button>Buscar un cajero</Button>
          <Button
            onClick={() => {
              cantidadCajeros();
            }}
          >
            Cantidad
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Red</th>
              <th>Nombre</th>
              <th>Genero</th>
              <th>Numero</th>
              <th>Enlace</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cajeros.map((cajero) => {
              return <CajeroAdmin cajero={cajero} />;
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminCajeros;
