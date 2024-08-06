import React, { useContext } from "react";
import { adminContext } from "../storage/AdminContext";
import { VistaCajeros } from "./VistaCajeros";
import { Cronograma } from "../components/Cronograma";
import { Divisor } from "../components/AUser/Inicio/Divisor";
import { Header } from "../components/Header";
import { Casinos } from "../components/Casinos";

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
      {/* HEADER OK */}
      <Header />
      <Divisor>Casinos</Divisor>
      <Casinos />
      <Divisor>Cajeros</Divisor>
      <VistaCajeros limit={true} />
      <Divisor>Cronograma de pago</Divisor>
      <Cronograma />
    </main>
  );
};
