import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <>
      <div className="m-auto greenB">
        <form className="col-3 redB d-flex flex-column m-auto login-form justify-content-evenly my-5">
          <h2 className="p-0 m-0 text-center">Iniciar sesion</h2>
          <input className="form-inputs" type="text" placeholder="Usuario" />
          <input
            className="form-inputs"
            type="password"
            placeholder="Contraseña"
          />
          <Link to="/adminCajeros">
            <button type="submit" className="form-btn">
              Iniciar Sesión
            </button>
          </Link>
        </form>
      </div>
      <div className="m-auto greenB">
        <form className="col-3 redB d-flex flex-column m-auto login-form justify-content-evenly my-5">
          <h2 className="p-0 m-0 text-center">Registrarse</h2>
          <input className="form-inputs" type="text" placeholder="Usuario" />
          <input
            className="form-inputs"
            type="password"
            placeholder="Contraseña"
          />
          <Link to="/adminCajeros">
            <button type="submit" className="form-btn">
              Registrarse
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
