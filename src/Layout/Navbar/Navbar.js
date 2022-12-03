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
    <nav className="navbar border justify-content-around navbarMod">
      <ToastContainer />
      <div className="border">
        <Link to="/" className="border p-0 m-0 brand-text">
          ¡Bienvenid@s a la red Solana!
        </Link>
      </div>
      <div className="col-2 d-flex flex-row justify-content-around align-items-center border">
        <Link to="/" className="navbar-brand border m-0 p-0 active">
          Home
        </Link>
        <Link to="/cajeros" className="navbar-brand border m-0 p-0">
          Cajeros
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
