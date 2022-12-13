import React, { useContext, useEffect, useState } from "react";
import "./adminCajeros.css";
import { adminContext } from "../../storage/AdminContext";
import CajeroAdmin from "../../components/CajeroAdmin/CajeroAdmin";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import AdminBar from "../../components/AdminBar/AdminBar";
import { Metronome } from "@uiball/loaders";

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
        <div className="col-12 p1 adminCajeroContainer">
          <div className="col-12 col-sm-10 col-lg-8 col-xl-7 m-auto d-flex flex-column mt-2 text-center">
            <AdminBar busquedad={searchResult !== [] || false} />
            {console.log(searchedName)}
            {isSearchingCajero ? (
              <>
                {searchedName && (
                  <p className="m-0 py-2 text-white">
                    Se muestran resultados de la busquedad de: "
                    <strong>{searchedName}</strong>"
                  </p>
                )}
              </>
            ) : (
              <p className="m-0 py-3 text-white allCajerosText">
                Estas visualizando todos los cajeros verificados
              </p>
            )}
            <Table
              striped
              bordered
              hover
              responsive
              variant="dark"
              className="align-middle"
            >
              <thead className="animate__animated animate__fadeIn">
                <tr className="align-middle">
                  <th className="p-0">Red</th>
                  <th className="p-0">Nombre</th>
                  <th className="d-md-none p-0">Info</th>
                  <th className="d-none d-md-table-cell p-0">Genero</th>
                  <th className="d-none d-md-table-cell p-0">Numero</th>
                  <th className="d-none d-md-table-cell p-0">Enlace</th>
                  <th>Editar</th>
                  <th className="p-0">Eliminar</th>
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
                <Metronome size={40} speed={1.6} color="#fff" />
              </div>
            )}
          </div>
        </div>
      ) : (
        navigate("/admin")
      )}
    </>
  );
}

export default AdminCajeros;
