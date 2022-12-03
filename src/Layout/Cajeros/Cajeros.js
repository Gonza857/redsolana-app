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
    <main className="cajeros-box col-10 m-auto justify-content-evenly">
      {cajeros.map((cajero) => {
        return (
          <div
            className="cajero"
            key={cajero.id}
            data-aos="zoom-in"
            data-aos-duration="2000"
          >
            <h3 className="cajero-name">{cajero.nombre}</h3>
            <div className="cajero-img">
              {cajero.genero === "M" ? (
                <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" />
              ) : (
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/woman-female-icon.png" />
              )}
            </div>
            <div className="d-flex align-items-center cajero-number">
              <FaWhatsapp />
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
