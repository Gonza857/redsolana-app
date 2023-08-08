import React from "react";
import { Route, Routes } from "react-router-dom";
import { DrawNumbersTable } from "../../components/DrawNumbersTable/DrawNumbersTable";
import { ErrorPage } from "../../Layout";
import { AdminDrawView } from "../../Layout/AdminDrawView/AdminDrawView";
import { EditDrawView } from "../../Layout/EditDrawView/EditDrawView";
import { DrawParticipantsTable } from "../../components/DrawParticipantsTable/DrawParticipantsTable";
import { CreateDraw } from "../../Layout/CreateDraw/CreateDraw";
import { DrawPreview } from "../../Layout/DrawPreview/DrawPreview";
import { AddParticipantView } from "../../Layout/AddParticipantView/AddParticipantView";

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
        element={<AdminDrawView />}
        errorElement={<ErrorPage />}
      />
      {/* VISTA ADMIN, EDITAR SORTEO */}
      <Route
        path="/editar"
        element={<EditDrawView />}
        errorElement={<ErrorPage />}
      />
      {/* VISTA ADMIN, TABLA PARTICIPANTES */}
      <Route
        path="/participantes"
        element={<DrawParticipantsTable />}
        errorElement={<ErrorPage />}
      />

      <Route
        path="/crear"
        element={<CreateDraw />}
        errorElement={<ErrorPage />}
      />

      <Route
        path="/preview"
        element={<DrawPreview />}
        errorElement={<ErrorPage />}
      />

      <Route
        path="/agregar"
        element={<AddParticipantView />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
