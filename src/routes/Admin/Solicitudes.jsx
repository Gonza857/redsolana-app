import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../Layout";
import { ViewHistorial } from "../../Layout/Admin/Solicitudes/VerHistorial";
import { ViewSolicitudes } from "../../Layout/Admin/Solicitudes/VerSolicitudes";
import { VistaEditarPlataformas } from "../../Layout/Admin/Solicitudes/VistaEditarPlataformas";

export const Solicitudes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ViewSolicitudes />}
        errorElement={<ErrorPage />}
      />
      {/* HISTORIAL SOLICITUDES */}
      <Route
        path="/historial"
        element={<ViewHistorial />}
        errorElement={<ErrorPage />}
      />
      {/*  EDITAR PLATAFORMAS */}
      <Route
        path="/plataformas"
        element={<VistaEditarPlataformas />}
        errorElement={<ErrorPage />}
      />
    </Routes>
  );
};
