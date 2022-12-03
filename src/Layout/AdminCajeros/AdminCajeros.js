import React, { useContext } from "react";
import "./adminCajeros.css";
import { adminContext } from "../../storage/AdminContext";
import CajeroAdmin from "../../components/CajeroAdmin/CajeroAdmin";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import AdminBar from "../../components/AdminBar/AdminBar";

function AdminCajeros() {
  const { cajeros, isAdmin, isSearchingCajero, searchResult, searchedName } =
    useContext(adminContext);
  const navigate = useNavigate();
  return (
    <>
      {isAdmin ? (
        <div className="col-lg-8 m-auto d-flex flex-column mt-5 greenB text-center">
          <AdminBar busquedad={searchResult !== [] || false} />
          {console.log(searchedName)}
          {isSearchingCajero ? (
            <>
              {searchedName && (
                <p>
                  Se muestran resultados de la busquedad de:{" "}
                  <strong>{searchedName}</strong>
                </p>
              )}
            </>
          ) : (
            <p className="m-0 py-2">
              Estas visualizando todos los cajeros verificados
            </p>
          )}
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
              {isSearchingCajero ? (
                <>
                  {searchResult.map((cajero) => {
                    return <CajeroAdmin cajero={cajero} />;
                  })}
                </>
              ) : (
                <>
                  {cajeros.map((cajero) => {
                    return <CajeroAdmin cajero={cajero} />;
                  })}
                </>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        navigate("/admin")
      )}
    </>
  );
}

export default AdminCajeros;
