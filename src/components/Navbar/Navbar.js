import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar border justify-content-around navbarMod">
      <div className="border">
        <Link to="/" className="border p-0 m-0 brand-text">¡Bienvenid@s a la red Solana!</Link>
      </div>
      <div className="col-2 d-flex flex-row justify-content-around align-items-center border">
        <Link to="/" className="navbar-brand border m-0 p-0 active">
          Home
        </Link>
        <Link to="/cajeros" className="navbar-brand border m-0 p-0">
          Cajeros
        </Link>
        <Link to="/admin" className="navbar-brand border m-0 p-0">
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
