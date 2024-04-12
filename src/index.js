import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  AdminContextProvider,
  CronoAndNewsContextProvider,
  SolicitudesContextProvider,
} from "./storage/AdminContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AdminContextProvider>
      <SolicitudesContextProvider>
        <CronoAndNewsContextProvider>
          <App />
        </CronoAndNewsContextProvider>
      </SolicitudesContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
