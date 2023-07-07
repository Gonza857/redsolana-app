import React, { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";

export const NumerosTable = () => {
  const { sorteoArray } = useContext(adminContext);
  return (
    <div className="col-11 mx-auto d-flex justify-content-center flex-wrap py-4">
      {sorteoArray.map((value, i) => {
        return (
          <div className={`numberBox ${value ? "marcado" : "noMarcado"}`}>
            {++i}
          </div>
        );
      })}
    </div>
  );
};
