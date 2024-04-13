import React from "react";
import { Route, Routes } from "react-router-dom";
import { VistaCronograma } from "../../Layout/Admin/Cronograma/VistaCronograma";

export const Cronograma = () => {
  return (
    <Routes>
      <Route path="/editar" element={<VistaCronograma />} />
    </Routes>
  );
};
