import React, { useEffect } from "react";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import styled from "styled-components";
import { Ring } from "@uiball/loaders";
import { NewView } from "../NewView/NewView";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";

export const AdminView = () => {
  const { isAdmin, isVerifingAdmin } = useContext(adminContext);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("Renderizado");
    console.log(isVerifingAdmin);
  }, []);

  if (isVerifingAdmin) {
    return (
      <div className="col-12">
        <Ring size={40} lineWeight={5} speed={2} color="#FFF" />
      </div>
    );
  } else {
    if (isAdmin) {
      return <NewView />;
    } else {
      return <Login />;
    }
  }
};
