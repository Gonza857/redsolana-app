import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminCajeros from "./Layout/AdminCajeros/AdminCajeros";
import Cajeros from "./Layout/Cajeros/Cajeros";
import Inicio from "./Layout/Inicio/Inicio";
import Login from "./components/Login/Login";
import Navbar from "./Layout/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import PaymentInfo from "./Layout/PaymentInfo/PaymentInfo";
import Footer from "./Layout/Footer/Footer";
import ErrorPage from "./Layout/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Inicio />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route
          path="/cajeros"
          element={<Cajeros />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route
          path="/admin"
          element={<Login />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route path="/adminCajeros" element={<AdminCajeros />}></Route>
        <Route
          path="/cronograma"
          element={<PaymentInfo />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
