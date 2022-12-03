import React, { useContext } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./cajeros.css";
import { adminContext } from "../../storage/AdminContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Cajeros() {
  AOS.init();
  const { cajeros } = useContext(adminContext);
  return (
    <main
      className="cajeros-box col-10 m-auto justify-content-evenly"
      data-aos="fade-left"
    >
      {cajeros.map((cajero) => {
        return (
          <div
            className="cajero"
            key={cajero.id}
            data-aos="zoom-in"
            data-aos-duration="2000"
          >
            <p className="cajero-name redB">{cajero.nombre}</p>
            <div className="cajero-img">
              {cajero.genero === "M" ? (
                <img src="./assets/images/hombre.png" alt="foto" />
              ) : (
                <img src="./assets/images/mujer.png" alt="foto" />
              )}
            </div>
            <div className="d-flex align-items-center cajero-number redB cajero-number-box">
              <FaWhatsapp className="cajero-number-icon" />
              <Link to="google.com" className="m-0 p-0 cajero-number">
                {cajero.numero}
              </Link>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default Cajeros;
