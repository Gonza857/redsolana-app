import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../../Layout";
import { History as HistoryView } from "../../Layout/Admin/Solicitudes/History";
import { Requests as RequestsView } from "../../Layout/Admin/Solicitudes/Requests";
import { EditPlatforms } from "../../Layout/Admin/Solicitudes/EditPlatforms";

export const Requests = () => {
  return (
    <Routes>
      <Route path="/" element={<RequestsView />} errorElement={<ErrorPage />} />
      {/* HISTORIAL SOLICITUDES */}
      <Route
        path="/historial"
        element={<HistoryView />}
        errorElement={<ErrorPage />}
      />
      {/*  EDITAR PLATAFORMAS */}
      <Route
        path="/plataformas"
        element={<EditPlatforms />}
        errorElement={<ErrorPage />}
      />
    </Routes>
  );
};
