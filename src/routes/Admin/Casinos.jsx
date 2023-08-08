import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddCasinoView } from "../../Layout/Admin/Casinos/AddCasinoView/AddCasinoView";
import { ErrorPage } from "../../Layout";
import { AdminCasinosView } from "../../Layout/Admin/Casinos/AdminCasinosView/AdminCasinosView";
import { EditCasinoView } from "../../Layout/Admin/Casinos/EditCasinoView/EditCasinoView";

export const Casinos = () => {
  return (
    <Routes>
      {/* VIEW CASINOS */}
      <Route
        path="/"
        element={<AdminCasinosView />}
        errorElement={<ErrorPage />}
      />
      {/* ADD */}
      <Route
        path="/agregar"
        element={<AddCasinoView />}
        errorElement={<ErrorPage />}
      />

      {/* EDIT */}
      <Route
        path="/editar/:id"
        element={<EditCasinoView />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
