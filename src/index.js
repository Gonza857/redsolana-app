import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  AdminContextProvider,
  SolicitudesContextProvider,
} from "./storage/AdminContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AdminContextProvider>
      <SolicitudesContextProvider>
        <App />
      </SolicitudesContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
