import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminCajeros from "../Layout/AdminCajeros/AdminCajeros";
import Cajeros from "../Layout/Cajeros/Cajeros";
import Inicio from "../Layout/Inicio/Inicio";
import Login from "../Layout/Login/Login";
import Cronograma from "../Layout/Cronograma/Cronograma";
import ErrorPage from "../Layout/ErrorPage/ErrorPage";


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
