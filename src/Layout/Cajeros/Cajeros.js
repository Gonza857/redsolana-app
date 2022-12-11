import React, { useContext, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./cajeros.css";
import { adminContext } from "../../storage/AdminContext";
import "animate.css";
import { Metronome } from "@uiball/loaders";

function Cajeros() {
  const [isLoading, setIsLoading] = useState(false);
  const { cajeros, setNumberSection, numberSection } = useContext(adminContext);

  useEffect(()=>{
    setNumberSection(1)
  },[])

  useEffect(() => {
    if (cajeros.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cajeros]);

  return (
    <main
      className={`col-12 ${
        isLoading
          ? `cajeroMainLoading {
      `
          : `cajerosMain`
      }`}
    >
      <h4 className="cajerosTitle text-center text-white">
        Cajeros verificados
      </h4>
      <div
        className="cajeros-box col-12 col-sm-11 col-md-10 m-auto justify-content-evenly"
        id="section-two-wrapper"
      >
        {isLoading ? (
          <div className="m-auto">
            <Metronome size={40} speed={1.6} color="#fff" />
          </div>
        ) : (
          <>
            {cajeros.map((cajero) => {
              return (
                <div
                  className="animate__animated cajero animate__fadeIn"
                  key={cajero.id}
                >
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
                  <div className="cajero-number-box">
                    <FaWhatsapp className="cajero-number-icon" />
                    <a
                      href={`https://${cajero.enlace}`}
                      target="_blank"
                      className="cajero-number"
                    >
                      {cajero.numero}
                    </a>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}

export default Cajeros;
