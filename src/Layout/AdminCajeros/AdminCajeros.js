import React, { useContext, useEffect, useState } from "react";
import "./adminCajeros.css";
import { adminContext } from "../../storage/AdminContext";
import CajeroAdmin from "../../components/CajeroAdmin/CajeroAdmin";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import AdminBar from "../../components/AdminBar/AdminBar";
import { Ring } from "@uiball/loaders";

function AdminCajeros() {
  const [isLoading, setIsLoading] = useState(false);

  const { cajeros, isAdmin, isSearchingCajero, searchResult, searchedName } =
    useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cajeros.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cajeros]);

  return (
    <>
      {isAdmin ? (
        <div className="col-12 col-lg-8 m-auto d-flex flex-column mt-5 greenB text-center">
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
          <Table striped bordered hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Red</th>
                <th className="">Nombre</th>
                <th className="d-none">Genero</th>
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
                  {!isLoading &&
                    cajeros.map((cajero) => {
                      return <CajeroAdmin cajero={cajero} />;
                    })}
                </>
              )}
            </tbody>
          </Table>
          {isLoading && (
            <div className="m-auto">
              <Ring size={35} color="#231F20" />
            </div>
          )}
        </div>
      ) : (
        navigate("/admin")
      )}
    </>
  );
}

export default AdminCajeros;
