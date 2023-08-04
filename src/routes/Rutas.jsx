import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage, AdminCajeros, Cronograma, Login, Inicio } from "../Layout/";
import { Draw } from "../Layout/Draw/Draw";
import { AdminSorteos } from "../Layout/AdminSorteos/AdminSorteos";
import { AddParticipantView } from "../Layout/AddParticipantView/AddParticipantView";
import {
  AdminCasinosView,
  Casinos,
} from "../Layout/Admin/Casinos/AdminCasinosView/AdminCasinosView";
import {
  AddCasino,
  AddCasinoView,
} from "../Layout/Admin/Casinos/AddCasinoView/AddCasinoView";
import { NewView } from "../Layout/NewView/NewView";
import {
  AddChecker,
  AddCheckerView,
} from "../Layout/AddCheckerView/AddCheckerView";
import { DrawNumbersTable } from "../components/DrawNumbersTable/DrawNumbersTable";
import { DrawParticipantsTable } from "../components/DrawParticipantsTable/DrawParticipantsTable";
import { CreateDraw } from "../Layout/CreateDraw/CreateDraw";
import { DrawPreview } from "../Layout/DrawPreview/DrawPreview";
import { AdminDrawView } from "../Layout/AdminDrawView/AdminDrawView";
import { EditDrawView } from "../Layout/EditDrawView/EditDrawView";
import { Cajeros } from "../Layout/Cajeros/Cajeros";
import { CajerosView } from "../Layout/CajerosView/CajerosView";
import { AdminView } from "../Layout/AdminView/AdminView";
import { EditCasinoView } from "../Layout/Admin/Casinos/EditCasinoView/EditCasinoView";

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      {/* RUTAS USUARIO */}
      <Route
        path="/cajeros"
        element={<CajerosView />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/cronograma"
        element={<Cronograma />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path="/sorteo" element={<Draw />} errorElement={<ErrorPage />} />
      <Route
        path="/login"
        element={<Login />}
        errorElement={<ErrorPage />}
      ></Route>

      {/*FUNCIONAMIENTO COMPROBADO*/}

      {/* CAJEROS */}

      {/* CASINOS */}

      {/* AGREGAR */}
      <Route
        path="/admin/casinos/agregar"
        element={<AddCasinoView />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* VER CASINOS */}
      <Route
        path="/admin/casinos"
        element={<AdminCasinosView />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* EDITAR */}
      <Route
        path="/admin/casinos/editar"
        element={<EditCasinoView />}
        errorElement={<ErrorPage />}
      ></Route>

      {/* SORTEO */}

      {/* VISTA ADMIN, TABLA NUMEROS */}
      <Route
        path="/admin/sorteo/numeros"
        element={<DrawNumbersTable />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* VISTA ADMIN, INFO SORTEO */}
      <Route
        path="/admin/sorteo/informacion"
        element={<AdminDrawView />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* VISTA ADMIN, EDITAR SORTEO */}
      <Route
        path="/admin/sorteo/editar"
        element={<EditDrawView />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* VISTA ADMIN, TABLA PARTICIPANTES */}
      <Route
        path="/admin/sorteo/participantes"
        element={<DrawParticipantsTable />}
        errorElement={<ErrorPage />}
      ></Route>

      <Route
        path="/admin/sorteo/crear"
        element={<CreateDraw />}
        errorElement={<ErrorPage />}
      ></Route>

      <Route
        path="/admin/sorteo/preview"
        element={<DrawPreview />}
        errorElement={<ErrorPage />}
      ></Route>

      <Route
        path="/admin/sorteos/agregar"
        element={<AddParticipantView />}
        errorElement={<ErrorPage />}
      ></Route>

      {/* FIN SORTEO */}

      {/* CAJEROS */}

      <Route
        path="/admin/cajeros"
        element={<AdminCajeros />}
        errorElement={<ErrorPage />}
      ></Route>

      <Route
        path="/admin/cajeros/agregar"
        element={<AddCheckerView />}
        errorElement={<ErrorPage />}
      ></Route>

      {/* FIN CAJEROS */}

      {/*FIN FUNCIONAMIENTO COMPROBADO*/}

      <Route
        path="/admin/sorteos"
        element={<AdminSorteos />}
        errorElement={<ErrorPage />}
      ></Route>

      <Route
        path="/admin"
        element={<AdminView />}
        errorElement={<ErrorPage />}
      ></Route>

      {/* <Route
        path="/admin/casinos"
        element={<CasinosView />}
        errorElement={<ErrorPage />}
      ></Route> */}

      {/* <Route
        path="/admin/ver-casinos"
        element={<CasinosView />}
        errorElement={<ErrorPage />}
      ></Route> */}

      {/* <Route
        path="/admin/sorteos/tabla-numeros"
        element={<AdminTablaSorteos />}
        errorElement={<ErrorPage />}
      ></Route> */}

      <Route path="/*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default Rutas;
