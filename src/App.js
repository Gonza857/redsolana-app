import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar, Footer } from "./Layout/";
import "bootstrap/dist/css/bootstrap.min.css";
import Rutas from "./routes/Rutas";
import { useEffect } from "react";
import ReactGA from "react-ga";
import { logearEvento } from "./firebase/firebase";
import WhatsappBtn from "./components/WhatsappBtn/WhatsappBtn";

function App() {
  useEffect(() => {
    logearEvento();
    ReactGA.initialize("G-1R1R028564");
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Rutas />
      <Footer />
      <WhatsappBtn />
    </BrowserRouter>
  );
}

export default App;
