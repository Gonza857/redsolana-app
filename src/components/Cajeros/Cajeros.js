import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import ModalCajeros from "../ModalCajeros/ModalCajeros";
import "./cajeros.css";

function Cajeros() {
  let cantidad = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <main className="cajeros-box col-10 m-auto justify-content-evenly">
      {cantidad.map((cajero) => {
        return (
          <div className="cajero">
            <h3 className="cajero-name">Fernando</h3>
            <div className="cajero-img">
              <img src="https://cdn-icons-png.flaticon.com/512/0/93.png" />
            </div>
            <div className="d-flex align-items-center cajero-number">
              <FaWhatsapp />
              <p className="m-0 p-0">1112345678</p>
            </div>
          </div>
        );
      })}
      <ModalCajeros/>
    </main>
  );
}

export default Cajeros;
