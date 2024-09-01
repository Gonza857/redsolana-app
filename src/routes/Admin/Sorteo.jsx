import React from "react";
import { Route, Routes } from "react-router-dom";
import { DrawNumbersTable } from "../../Layout/Admin/Draw/DrawNumbersTable";
import { ErrorPage } from "../../Layout";
import { DrawParticipantsTable } from "../../Layout/Admin/Draw/DrawParticipantsTable";
import { CreateDraw } from "../../Layout/Admin/Draw/CreateDraw";
import {
  AddDrawParticipant,
  Draw as DrawView,
  DrawPreview,
  EditDraw,
} from "../../Layout/Admin/Draw/index";

export const Draw = () => {
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
        element={<DrawView />}
        errorElement={<ErrorPage />}
      />
      {/* VISTA ADMIN, EDITAR SORTEO */}
      <Route
        path="/editar"
        element={<EditDraw />}
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
        element={<CreateDraw />}
        errorElement={<ErrorPage />}
      />
      {/* PREVIEW DE COMO SE SUBIRÁ */}
      <Route
        path="/preview"
        element={<DrawPreview />}
        errorElement={<ErrorPage />}
      />
      {/* AGREGAR PARTICIPANTE */}
      <Route
        path="/agregar"
        element={<AddDrawParticipant />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
