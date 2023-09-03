import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../Layout";
import { Users } from "./Users/Users";
import { Admin } from "./Admin/Admin";
import { AdminView } from "../Layout/AdminView/AdminView";

function Rutas() {
  return (
    <Routes>
      {/* ADMIN ROUTES */}
      <Route path="/admin/*" element={<Admin />} errorElement={<ErrorPage />} />
      {/* USERS ROUTES */}
      <Route path="/*" element={<Users />} errorElement={<ErrorPage />} />
    </Routes>
  );
}

export default Rutas;
