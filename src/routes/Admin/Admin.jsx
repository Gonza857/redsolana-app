import React from "react";
import { Casinos } from "./Casinos";
import { Checkers } from "./Checkers";
import { AdminView } from "../../Layout/AdminView/AdminView";
import { ErrorPage } from "../../Layout";
import { Route, Routes } from "react-router-dom";
import { Draw } from "./Draw";

export const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminView />} errorElement={<ErrorPage />} />
      <Route path={"/casinos/*"} element={<Casinos />} />
      <Route path={"/cajeros/*"} element={<Checkers />} />
      <Route path={"/sorteo/*"} element={<Draw />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
