import React, { useContext } from "react";
import { adminContext } from "../../../storage/AdminContext";
import { Ring } from "@uiball/loaders";
import { VistaAdmin } from "../VistaAdmin";
import { Login } from "../Login/Login";

export const VerificarAdmin = () => {
  const { isAdmin, isVerifingAdmin } = useContext(adminContext);

  if (isVerifingAdmin) {
    return (
      <div className="col-12">
        <Ring size={40} lineWeight={5} speed={2} color="#FFF" />
      </div>
    );
  } else {
    if (isAdmin) {
      return <VistaAdmin />;
    } else {
      return <Login />;
    }
  }
};
