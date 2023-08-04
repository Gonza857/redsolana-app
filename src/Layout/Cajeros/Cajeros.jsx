import React from "react";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import {
  AiFillInfoCircle,
  AiOutlineOrderedList,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import CajeroAdmin from "../../components/CajeroAdmin/CajeroAdmin";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { AddChecker } from "../AddCheckerView/AddCheckerView";
import { useEffect } from "react";

export const Cajeros = () => {
  const { isSearchingCajero, isLoading, searchResult, cajeros } =
    useContext(adminContext);
  const { page } = useParams();

  return (
    <div className="col-8 bor2 m-auto text-center text-white">
      <h3>Estas visualizando todos los cajeros</h3>
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
            <th className="d-none d-md-table-cell">Pos</th>
            <th className="d-md-none">
              <AiOutlineOrderedList
                style={{ color: "fff", fontSize: "20px" }}
              />
            </th>
            <th className="p-0">Red</th>
            <th className="p-0">Nombre</th>
            <th className="d-none d-md-table-cell p-0">Numero</th>
            <th className="d-none d-md-table-cell p-0">Genero</th>
            <th className="d-none d-md-table-cell">Estado</th>
            <th className="d-md-none">
              <HiStatusOnline style={{ color: "fff", fontSize: "20px" }} />
            </th>

            <th className="d-none d-md-table-cell">Info</th>
            <th className="d-md-none">
              <AiFillInfoCircle style={{ color: "fff", fontSize: "20px" }} />
            </th>
            <th className="d-none d-md-table-cell">Editar</th>
            <th className="d-md-none">
              <FaUserEdit style={{ color: "fff", fontSize: "20px" }} />
            </th>
            <th className="d-none d-md-table-cell">Eliminar</th>
            <th className="d-md-none">
              <AiOutlineUserDelete style={{ color: "fff", fontSize: "20px" }} />
            </th>
          </tr>
        </thead>
        <tbody>
          {isSearchingCajero ? (
            <>
              {searchResult.map((cajero) => {
                return <CajeroAdmin cajero={cajero} key={cajero.id} />;
              })}
            </>
          ) : (
            <>
              {cajeros.map((cajero) => {
                return <CajeroAdmin cajero={cajero} key={cajero.id} />;
              })}
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};
