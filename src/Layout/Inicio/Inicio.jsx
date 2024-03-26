import React, { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import { CajerosView } from "../CajerosView/CajerosView";
import { Cronograma } from "../Cronograma/Cronograma";
import { Divisor } from "./components/Divisor";
import { Header } from "./components/Header";
import { Casinos } from "./components/Casinos";

export const Inicio = () => {
  const { isOpenMenu } = useContext(adminContext);

  return (
    <main
      className={`col-12 m-0 d-flex flex-column gap-4 gap-lg-5 ${
        isOpenMenu ? "blockEvents" : "activeEvents"
      }`}
      style={{
        opacity: `${isOpenMenu ? "0.3" : "1"}`,
      }}
    >
      <Header />
      <Divisor>Casinos</Divisor>
      <Casinos />
      <Divisor>Cajeros</Divisor>
      <CajerosView limit={true} />
      <Divisor>Cronograma de pago</Divisor>
      <Cronograma />
    </main>
  );
};
