import React from "react";
import { Checkers as CheckersView, ErrorPage } from "../../Layout";
import { Route, Routes } from "react-router-dom";
import { AddChecker } from "../../Layout/Admin/Checkers/AddChecker";

export const Checkers = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckersView />} errorElement={<ErrorPage />} />
      <Route
        path="/agregar"
        element={<AddChecker />}
        errorElement={<ErrorPage />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
