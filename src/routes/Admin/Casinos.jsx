import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddCasino } from "../../Layout/Admin/Casinos/AddCasino";
import { Casinos as CasinosView } from "../../Layout/Admin/Casinos/Casinos";
import { EditCasino } from "../../Layout/Admin/Casinos/EditCasino";
import { ErrorPage } from "../../Layout";

export const Casinos = () => {
  return (
    <Routes>
      {/* VIEW CASINOS */}
      <Route path="/" element={<CasinosView />} errorElement={<ErrorPage />} />
      {/* ADD */}
      <Route
        path="/agregar"
        element={<AddCasino />}
        errorElement={<ErrorPage />}
      />

      {/* EDIT */}
      <Route
        path="/editar/:id"
        element={<EditCasino />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
