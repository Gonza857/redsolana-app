import React from "react";
import { Casinos } from "./Casinos";
import { Checkers } from "./Checkers";
import { AdminView } from "../../Layout/AdminView/AdminView";
import { ErrorPage } from "../../Layout";
import { Route, Routes } from "react-router-dom";
import { Draw } from "./Draw";
import { PaySchedule } from "./PaySchedule";
import { ViewSolicitudes } from "../../Layout/Admin/Solicitudes/ViewSolicitudes";
import { Solicitudes } from "./Solicitudes";

export const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminView />} errorElement={<ErrorPage />} />
      <Route path={"/casinos/*"} element={<Casinos />} />
      <Route path={"/cajeros/*"} element={<Checkers />} />
      <Route path={"/sorteo/*"} element={<Draw />} />
      <Route path={"/cronograma/*"} element={<PaySchedule />} />
      <Route path={"/solicitudes/*"} element={<Solicitudes />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
