import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage, Inicio, Login } from "../../Layout";
import { VistaCajeros } from "../../Layout/VistaCajeros";
import { Sorteo } from "../../Layout/User/Sorteo/Sorteo";
import { RequestUser } from "../../Layout/RequestUser";
import { Novedades } from "../../Layout/Novedades";

export const Users = () => {
  return (
    <Routes>
      {/* USER ROUTES */}
      {/* RUTA DE INICIO */}
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      {/* RUTA DE CAJEROS */}
      <Route
        path="/cajeros"
        element={<VistaCajeros />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* RUTA DE SOLICITUD DE USUARIO */}
      <Route
        path="/jugar"
        element={<RequestUser />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* NOVEDADES*/}
      <Route
        path="/novedades"
        element={<Novedades />}
        errorElement={<ErrorPage />}
      />
      {/* RUTA DE SORTEO (REVISAR) */}
      <Route path="/sorteo" element={<Sorteo />} errorElement={<ErrorPage />} />

      {/* RUTA DE LOGIN ADMIN */}
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      {/* RUTA DE ERROR */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
