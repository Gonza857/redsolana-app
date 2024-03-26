import React from "react";
import { Route, Routes } from "react-router-dom";
import { Cronograma, ErrorPage, Inicio, Login } from "../../Layout";
import { CajerosView } from "../../Layout/CajerosView/CajerosView";
import { Draw } from "../../Layout/Draw/Draw";
import { RequestUser } from "../../Layout/RequestUser/RequestUser";

export const Users = () => {
  return (
    <Routes>
      {/* USER ROUTES */}
      {/* RUTA DE INICIO */}
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      {/* RUTA DE CAJEROS */}
      <Route
        path="/cajeros"
        element={<CajerosView />}
        errorElement={<ErrorPage />}
      ></Route>
      {/* RUTA DE SOLICITUD DE USUARIO */}
      <Route
        path="/jugar"
        element={<RequestUser />}
        errorElement={<ErrorPage />}
      ></Route>

      {/* RUTA DE SORTEO (REVISAR) */}
      {/* <Route path="/sorteo" element={<Draw />} errorElement={<ErrorPage />} /> */}

      {/* RUTA DE LOGIN ADMIN */}
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      {/* RUTA DE ERROR */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
