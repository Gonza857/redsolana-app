import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminCajeros from "./components/AdminCajeros/AdminCajeros";
import Cajeros from "./components/Cajeros/Cajeros";
import Inicio from "./components/Inicio/Inicio";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/cajeros" element={<Cajeros />}></Route>
          <Route path="/admin" element={<Login />}></Route>
          <Route path="/adminCajeros" element={<AdminCajeros />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
