import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminCajeros from "./Layout/AdminCajeros/AdminCajeros";
import Cajeros from "./Layout/Cajeros/Cajeros";
import Inicio from "./Layout/Inicio/Inicio";
import Login from "./components/Login/Login";
import Navbar from "./Layout/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import TycView from "./Layout/TycView/TycView";
import Footer from "./Layout/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/cajeros" element={<Cajeros />}></Route>
        <Route path="/admin" element={<Login />}></Route>
        <Route path="/adminCajeros" element={<AdminCajeros />}></Route>
        <Route path="/tyc" element={<TycView />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
