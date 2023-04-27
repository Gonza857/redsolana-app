import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ErrorPage,
  Cajeros,
  AdminCajeros,
  Cronograma,
  Login,
  Inicio,
} from "../Layout/";

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      <Route
        path="/cajeros"
        element={<Cajeros />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin"
        element={<Login />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path="/adminCajeros" element={<AdminCajeros />}></Route>
      <Route
        path="/cronograma"
        element={<Cronograma />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path="/*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default Rutas;
