import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar, Footer } from "./Layout/";
import "bootstrap/dist/css/bootstrap.min.css";
import Rutas from "./routes/Rutas";
import WhatsappBtn from "./components/WhatsappBtn/WhatsappBtn";
import { useContext } from "react";
import { adminContext } from "./storage/AdminContext";
import { AdminBar } from "./Layout/AdminBar/AdminBar";

function App() {
  const { isAdmin } = useContext(adminContext);
  return (
    <BrowserRouter>
      <Navbar />
      <main className="d-flex col-12 flex-wrap">
        {isAdmin && <AdminBar />}
        <Rutas />
      </main>
      <Footer />
      <WhatsappBtn />
    </BrowserRouter>
  );
}

export default App;
