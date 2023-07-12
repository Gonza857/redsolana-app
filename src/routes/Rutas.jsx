import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ErrorPage,
  Cajeros,
  AdminCajeros,
  Cronograma,
  Login,
  Inicio,
} from "../Layout/";
import { Sorteo } from "../Layout/Sorteo/Sorteo";
import { AdminSorteos } from "../Layout/AdminSorteos/AdminSorteos";
import { AdminTablaSorteos } from "../Layout/AdminTablaSorteos/AdminTablaSorteos";
import { AddParticipantView } from "../Layout/AddParticipantView/AddParticipantView";
import { CasinosView } from "../Layout/CasinosView/CasinosView";
import { AddCasinoView } from "../Layout/AddCasinoView/AddCasinoView";

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      <Route
        path="/cajeros"
        element={<Cajeros />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin"
        element={<Login />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin/cajeros"
        element={<AdminCajeros />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin/sorteos"
        element={<AdminSorteos />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin/ver-casinos"
        element={<CasinosView />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin/sorteos/tabla-numeros"
        element={<AdminTablaSorteos />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin/sorteos/agregar"
        element={<AddParticipantView />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin/casinos/agregar"
        element={<AddCasinoView />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/cronograma"
        element={<Cronograma />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path="/sorteo" element={<Sorteo />} errorElement={<ErrorPage />} />
      <Route path="/*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default Rutas;
