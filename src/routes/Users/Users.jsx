import React from "react";
import { Route, Routes } from "react-router-dom";
import { Cronograma, ErrorPage, Inicio, Login } from "../../Layout";
import { CajerosView } from "../../Layout/CajerosView/CajerosView";
import { Draw } from "../../Layout/Draw/Draw";

export const Users = () => {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      <Route
        path="/cajeros"
        element={<CajerosView />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/cronograma"
        element={<Cronograma />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route path="/sorteo" element={<Draw />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
