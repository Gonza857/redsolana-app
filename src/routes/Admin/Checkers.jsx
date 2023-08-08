import React from "react";
import { AdminCajeros, ErrorPage } from "../../Layout";
import { AddCheckerView } from "../../Layout/AddCheckerView/AddCheckerView";
import { Route, Routes } from "react-router-dom";

export const Checkers = () => {
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
