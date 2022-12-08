import React from "react";
import "./inicio.css";
import { Animated } from "react-animated-css";

function Inicio() {
  return (
    <main className="inicioMod p-0 m-0">
      <div className="col-12 p-1 col-md-11 col-lg-10 col-xl-9 col-xxl-8 m-auto d-flex flex-row flex-wrap justify-content-center gap-5 redesBox">
        <Animated
          animationIn="fadeInLeft"
          animationOut="fedeOutRight"
          isVisible={true}
        >
          <div className="red inicio-casino">
            <div className="inicio-imagen-box1 inicio-imagen-boxes">
              <img
                className="inicio-imagenes inicio-imagen1"
                src="./assets/images/megaFaraon.png"
                alt="foto"
              />
            </div>
            <div className="inicio-text">
              <p className="m-0">
                Haz click{" "}
                <a href="https://megafaraon.com" target="_blank">
                  aqui
                </a>{" "}
                para ir a Mega Faraon
              </p>
            </div>
          </div>
        </Animated>
        <Animated animationIn="fadeInRight" isVisible={true}>
          <div className="red inicio-casino">
            <div className="inicio-imagen-box4 inicio-imagen-boxes">
              <img
                className="inicio-imagenes inicio-imagen4"
                src="./assets/images/magiplay-logo.svg"
                alt="foto"
              />
            </div>
            <div className="inicio-text">
              <p className="m-0">
                Haz click{" "}
                <a href="https://magiplay.net/" target="_blank">
                  aqui
                </a>{" "}
                para ir a MagiPlay
              </p>
            </div>
          </div>
        </Animated>
        <Animated animationIn="fadeInLeft" isVisible={true}>
          <div className="red inicio-casino">
            <div className="inicio-imagen-box2 inicio-imagen-boxes">
              <img
                className="inicio-imagenes inicio-imagen2"
                src="./assets/images/konabet-logo.svg"
                alt="foto"
              />
            </div>
            <div className="inicio-text">
              <p className="m-0">
                Haz click{" "}
                <a href="https://konabet.com/" target="_blank">
                  aqui
                </a>{" "}
                para ir a Konabet
              </p>
            </div>
          </div>
        </Animated>
        <Animated animationIn="fadeInRight" isVisible={true}>
          <div className="red inicio-casino">
            <div className="inicio-imagen-box3 inicio-imagen-boxes">
              <img
                className="inicio-imagenes inicio-imagen3"
                src="./assets/images/aJugar-logo.png"
                alt="foto"
              />
            </div>
            <div className="inicio-text">
              <p className="m-0">
                Haz click{" "}
                <a href="https://ajugar.net/" target="_blank">
                  aqui
                </a>{" "}
                para ir a ajugar.net
              </p>
            </div>
          </div>
        </Animated>
      </div>
    </main>
  );
}

export default Inicio;
