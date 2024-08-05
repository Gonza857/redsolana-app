import React from "react";
import { AdminCasinoCard } from "../../../components/AdminCasinoCard/AdminCasinoCard";
import { useContext } from "react";
import { adminContext } from "../../../storage/AdminContext";

export const AdminCasinosView = () => {
  const { solana } = useContext(adminContext);
  return (
    <div className="d-flex flex-column align-items-center col-12 py-4 py-lg-2">
      <h3 className="text-white py-3 text-center">
        Estas visualizando los casinos actuales
      </h3>
      <div className="col-10 d-flex flex-wrap justify-content-center align-content-start gap-4">
        {solana._casinos.map((card, i) => (
          <AdminCasinoCard card={card} key={i} />
        ))}
      </div>
    </div>
  );
};
