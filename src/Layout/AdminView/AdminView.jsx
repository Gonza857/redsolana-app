import React from "react";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import styled from "styled-components";
import { Ring } from "@uiball/loaders";
import { NewView } from "../NewView/NewView";
import { useNavigate } from "react-router-dom";

export const AdminView = () => {
  const { isAdmin, isVerifingAdmin } = useContext(adminContext);
  const navigate = useNavigate();
  if (isVerifingAdmin) {
    return (
      <StyledWrapper className="col-12">
        <Ring size={40} lineWeight={5} speed={2} color="#FFF" />
      </StyledWrapper>
    );
  } else {
    if (isAdmin) {
      return <NewView />;
    } else {
      navigate("/");
    }
  }
};

const StyledWrapper = styled.div`
  border: 5px solid blueviolet;
`;
