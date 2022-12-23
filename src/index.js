import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AdminContextProvider } from "./storage/AdminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AdminContextProvider>
    <App />
  </AdminContextProvider>
);
