import React from "react";
import { AdminCajeros, ErrorPage } from "../../Layout";
import { AddCheckerView } from "../../Layout/Admin/Cajeros/AgregarCajero";
import { Route, Routes } from "react-router-dom";

export const Cajeros = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminCajeros />} errorElement={<ErrorPage />} />
      <Route
        path="/agregar"
        element={<AddCheckerView />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
