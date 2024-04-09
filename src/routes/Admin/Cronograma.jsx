import React from "react";
import { Route, Routes } from "react-router-dom";
import { VistaCronograma } from "../../Layout/Admin/Cronograma/VistaCronograma";
import { VistaEditarCronograma } from "../../Layout/Admin/Cronograma/VistaEditarCronograma";

export const Cronograma = () => {
  return (
    <Routes>
      <Route path="/editar" element={<VistaCronograma />} />
      <Route path="/configurar" element={<VistaEditarCronograma />} />
    </Routes>
  );
};
