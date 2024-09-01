import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage, Inicio, Login } from "../../Layout";
import { VistaCajeros } from "../../Layout/User/VistaCajeros";

import { Draw } from "../../Layout/User/Draw";
import { News } from "../../Layout/User/News";
import { RequestUser } from "../../Layout/User/RequestUser";

export const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} errorElement={<ErrorPage />}></Route>
      <Route
        path="/cajeros"
        element={<VistaCajeros />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/jugar"
        element={<RequestUser />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/novedades"
        element={<News />}
        errorElement={<ErrorPage />}
      />
      <Route path="/sorteo" element={<Draw />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
