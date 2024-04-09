import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../Layout";
import { ViewHistorial } from "../../Layout/Admin/Solicitudes/VerHistorial";
import { ViewSolicitudes } from "../../Layout/Admin/Solicitudes/VerSolicitudes";

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
        path="/editar-plataformas"
        element={<>Hola!</>}
        errorElement={<ErrorPage />}
      />
    </Routes>
  );
};
