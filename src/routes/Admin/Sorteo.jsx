import React from "react";
import { Route, Routes } from "react-router-dom";
import { DrawNumbersTable } from "../../components/DrawNumbersTable/DrawNumbersTable";
import { ErrorPage } from "../../Layout";
import { DrawParticipantsTable } from "../../components/DrawParticipantsTable/DrawParticipantsTable";
import {
  CreateDraw,
  VistaCrearSorteo,
} from "../../Layout/Admin/Sorteos/VistaCrearSorteo";
import {
  VistaAgregarParticipante,
  VistaEditarSorteo,
  VistaPreviaSorteo,
  VistaSorteo,
} from "../../Layout/Admin/Sorteos/index";

export const Sorteo = () => {
  return (
    <Routes>
      {/* VISTA ADMIN, TABLA NUMEROS */}
      <Route
        path="/numeros"
        element={<DrawNumbersTable />}
        errorElement={<ErrorPage />}
      />
      {/* VISTA ADMIN, INFO SORTEO */}
      <Route
        path="/informacion"
        element={<VistaSorteo />}
        errorElement={<ErrorPage />}
      />
      {/* VISTA ADMIN, EDITAR SORTEO */}
      <Route
        path="/editar"
        element={<VistaEditarSorteo />}
        errorElement={<ErrorPage />}
      />
      {/* VISTA ADMIN, TABLA PARTICIPANTES */}
      <Route
        path="/participantes"
        element={<DrawParticipantsTable />}
        errorElement={<ErrorPage />}
      />
      {/* CREAR SORTEO */}
      <Route
        path="/crear"
        element={<VistaCrearSorteo />}
        errorElement={<ErrorPage />}
      />
      {/* PREVIEW DE COMO SE SUBIRÁ */}
      <Route
        path="/preview"
        element={<VistaPreviaSorteo />}
        errorElement={<ErrorPage />}
      />
      {/* AGREGAR PARTICIPANTE */}
      <Route
        path="/agregar"
        element={<VistaAgregarParticipante />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
