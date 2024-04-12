import React from "react";
import { Casinos } from "./Casinos";
import { Cajeros } from "./Cajeros";
import { VerificarAdmin } from "../../Layout/Admin/VerificarAdmin/VerificarAdmin";
import { ErrorPage } from "../../Layout";
import { Route, Routes } from "react-router-dom";
import { Sorteo } from "./Sorteo";
import { Cronograma } from "./Cronograma";
import { Solicitudes } from "./Solicitudes";
import { Novedades } from "../../Layout/Admin/Novedades/Novedades";

export const Admin = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<VerificarAdmin />}
        errorElement={<ErrorPage />}
      />
      <Route path={"/casinos/*"} element={<Casinos />} />
      <Route path={"/cajeros/*"} element={<Cajeros />} />
      <Route path={"/sorteo/*"} element={<Sorteo />} />
      <Route path={"/cronograma/*"} element={<Cronograma />} />
      <Route path={"/solicitudes/*"} element={<Solicitudes />} />
      <Route path={"/novedades/*"} element={<Novedades />} />

      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
