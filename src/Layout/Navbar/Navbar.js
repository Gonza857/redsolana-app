import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { adminContext } from "../../storage/AdminContext";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const { isAdmin, setIsAdmin } = useContext(adminContext);
  function logOut() {
    toast.success("Cerraste sesión correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  return (
    <nav className="navbar justify-content-evenly align-content-center navbarMod">
      <div className="">
        <ToastContainer />
        <Link to="/" className="p-0 m-0 d-flex align-items-center brand-text">
          <img
            src="./assets/images/logo2.png"
            className="navbar-brand-logo"
            alt="brand-logo"
          />
          <h2 className="p-0 m-0 ms-4">Casino Solana</h2>
        </Link>
      </div>
      <div className="col-5 d-flex flex-row justify-content-around align-items-center">
        <Link to="/" className="navbar-link m-0 p-0 active">
          Home
        </Link>
        <Link to="/cajeros" className="navbar-link m-0 p-0">
          Cajeros
        </Link>
        <Link to="/tyc" className="navbar-link m-0 p-0 active">
          Terminos y condiciones
        </Link>
        <Link to="/admin" className="navbar-link m-0 p-0 active">
          Admin
        </Link>
        {isAdmin ? (
          <Button
            onClick={() => {
              localStorage.removeItem("active");
              setIsAdmin(false);
              logOut();
            }}
            variant="danger"
          >
            Cerrar sesión
          </Button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
