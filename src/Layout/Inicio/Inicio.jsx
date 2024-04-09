import React, { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import { VistaCajeros } from "../User/VistaCajeros/VistaCajeros";
import { Cronograma } from "../User/Cronograma/Cronograma";
import { Divisor } from "../../components/AUser/Inicio/Divisor";
import { Header } from "../../components/AUser/Inicio/Header";
import { Casinos } from "../../components/AUser/Inicio/Casinos";

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
      <VistaCajeros limit={true} />
      <Divisor>Cronograma de pago</Divisor>
      <Cronograma />
    </main>
  );
};
