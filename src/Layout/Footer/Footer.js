import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { BsInstagram } from "react-icons/bs";

function Footer() {

  return (
    <footer className="d-flex oranB flex-column">
      <div className="col-12 d-flex columnas">
        <div className="col-4 redB d-flex flex-column flex-wrap align-items-center justify-content-center gap-3">
          <div className="greenB">
            <Link
              to="/"
              className="p-0 m-0 d-flex align-items-center brand-text"
            >
              <img
                src="./assets/images/logo2.png"
                className="navbar-brand-logo"
                alt="brand-logo"
              />
              <h2 className="p-0 m-0 ms-4">Red Solana</h2>
            </Link>
          </div>
          <div className="oranB text-white">
            © Red Solana - 2022. Todos los derechos reservados.
          </div>
        </div>

        <div className="col-4 redB d-grid align-items-center justify-content-center">
          <div className="d-flex flex-column text-center gap-3 oranB">
            <h5>Secciones</h5>
            <a className="p-0 m-0" href="#mainCajeros">
              Home
            </a>
            <Link to="/cajeros" className="navbar-link m-0 p-0">
              Cajeros
            </Link>
            <Link to="/tyc" className="navbar-link m-0 p-0 active">
              Terminos y condiciones
            </Link>
            <Link to="/admin" className="navbar-link m-0 p-0 active">
              Admin
            </Link>
          </div>
        </div>

        <div className="col-4 redB d-grid align-items-center justify-content-center">
          <div className="d-flex flex-column text-center gap-3 oranB">
            <h5>Redes sociales</h5>
            <a className="border d-flex gap-3 align-items-center">
              <BsInstagram />
              Instagram
            </a>
            <a className="border d-flex gap-3 align-items-center">
              <BsInstagram />
              Instagram
            </a>
            <a className="border d-flex gap-3 align-items-center">
              <BsInstagram />
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="col-12 oranB text-white meritos bg-primary d-flex align-items-center justify-content-center">
        <p className="m-0 p-0">Creado y diseñado por Gonzalo Ramos.</p>
      </div>
    </footer>
  );
}

export default Footer;
