import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../Layout";
import { ViewHistorial } from "../../Layout/Admin/Solicitudes/ViewHistorial";
import { ViewSolicitudes } from "../../Layout/Admin/Solicitudes/ViewSolicitudes";

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
    </Routes>
  );
};
