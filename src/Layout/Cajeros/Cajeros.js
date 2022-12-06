import React, { useContext } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./cajeros.css";
import { adminContext } from "../../storage/AdminContext";
import "aos/dist/aos.css";

function Cajeros() {
  const { cajeros } = useContext(adminContext);
  return (
    <main className="col-12 cajerosMain">
      <h4
        className="cajerosTitle redB text-center text-white
      p-0 py-2 m-0"
      >
        Cajeros autorizados
      </h4>
      <div className="cajeros-box col-10 m-auto justify-content-evenly">
        {cajeros.map((cajero) => {
          return (
            <div className="cajero" key={cajero.id}>
              <div className="cajero-name">
                <p className="">{cajero.nombre}</p>
              </div>
              <div className="cajero-img">
                {cajero.genero === "M" ? (
                  <img src="./assets/images/hombre.png" alt="foto" />
                ) : (
                  <img src="./assets/images/mujer.png" alt="foto" />
                )}
              </div>
              <div className="d-flex align-items-center cajero-number  cajero-number-box">
                <FaWhatsapp className="cajero-number-icon" />
                <a href={cajero.enlace} className="m-0 p-0 cajero-number">
                  {cajero.numero}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default Cajeros;
