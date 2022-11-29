import React from "react";
import "./inicio.css"

function Inicio() {
  return (
    <main className="py-5">
      <div className="col-8 m-auto d-flex flex-row flex-wrap justify-content-center gap-2">
        <div className="col-5 red">
          <div className="imagen-box">
            <img
              className="imagen"
              src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
            />
          </div>
          <p className="m-0">
            Haz click <strong>aqui</strong> para entrar a la Red 1
          </p>
        </div>
        <div className="col-5 red">
          <div className="imagen-box">
            <img
              className="imagen"
              src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
            />
          </div>
          <p className="m-0">
            Haz click <strong>aqui</strong> para entrar a la Red 2
          </p>
        </div>
        <div className="col-5 red">
          <div className="imagen-box">
            <img
              className="imagen"
              src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
            />
          </div>
          <p className="m-0">
            Haz click <strong>aqui</strong> para entrar a la Red 3
          </p>
        </div>
        <div className="col-5 red">
          <div className="imagen-box">
            <img
              className="imagen"
              src="https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg"
            />
          </div>
          <p className="m-0">
            Haz click <strong>aqui</strong> para entrar a la Red 4
          </p>
        </div>
      </div>
    </main>
  );
}

export default Inicio;
