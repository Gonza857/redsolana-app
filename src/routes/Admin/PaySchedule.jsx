import React from "react";
import { Route, Routes } from "react-router-dom";
import { Wrapper } from "../../Layout/EditPaySchedule/Wrapper";
import { EditView } from "../../Layout/EditPaySchedule/EditView";

export const PaySchedule = () => {
  return (
    <Routes>
      <Route path="/editar" element={<Wrapper />} />
      <Route path="/configurar" element={<EditView />} />
    </Routes>
  );
};
