import React from "react";
import { Route, Routes } from "react-router-dom";
import { Timeline as TimelineView } from "../../Layout/Admin/Timeline/Timeline";

export const Timeline = () => {
  return (
    <Routes>
      <Route path="/editar" element={<TimelineView />} />
    </Routes>
  );
};
