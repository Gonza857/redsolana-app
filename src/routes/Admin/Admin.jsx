import React, { useContext } from "react";
import { Casinos } from "./Casinos";
import { VerificarAdmin } from "../../Layout/Admin/VerificarAdmin/VerificarAdmin";
import { ErrorPage } from "../../Layout";
import { Route, Routes } from "react-router-dom";
import { Draw } from "./Sorteo";
import { Timeline } from "./Timeline";
import { News } from "../../Layout/Admin/Novedades/News";
import { Checkers } from "./Checkers";
import { Requests } from "./Requests";
import { adminContext } from "../../storage/AdminContext";
import { Loader } from "../../components/UI/Loader";
import styled from "styled-components";

export const Admin = () => {
  const { isLoading } = useContext(adminContext);
  return (
    <Routes>
      <Route
        path="/"
        element={<VerificarAdmin />}
        errorElement={<ErrorPage />}
      />
      <Route path={"/casinos/*"} element={<Casinos />} />
      <Route path={"/cajeros/*"} element={<Checkers />} />
      <Route path={"/sorteo/*"} element={<Draw />} />
      <Route path={"/cronograma/*"} element={<Timeline />} />
      <Route path={"/solicitudes/*"} element={<Requests />} />
      <Route path={"/novedades/*"} element={<News />} />

      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

