import React from "react";
import { Link } from "react-router-dom";
import { MainButton } from "../../UI/MainButton";
import { AiOutlineUserAdd } from "react-icons/ai";

export const NewCashierBTN = () => {
  return (
    <Link to={"/admin/cajeros/agregar"}>
      <MainButton>
        Nuevo cajero
        <AiOutlineUserAdd />
      </MainButton>
    </Link>
  );
};
