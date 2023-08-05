import React, { useContext } from "react";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";
import { MainButton } from "../MainButton/MainButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export const AdminCasinoCard = ({ card }) => {
  const { handleDeleteCasino, setCasinoToEdit } = useContext(adminContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(card);
  }, []);
  return (
    <StyledCard className="d-flex flex-column align-items-center p-2">
      <ImageContainer className="p-2">
        <img src={card?.casinoImage.url} alt={card?.casinoName} />
      </ImageContainer>
      <CardInfo className="d-flex justify-content-center align-items-center">
        <p className="m-0 py-1">{card?.casinoName}</p>
      </CardInfo>
      <CardControl className="gap-2">
        <MainButton
          primary={true}
          fn={() => {
            setCasinoToEdit(card);
            navigate(`/admin/casinos/editar/${card?.id}`);
          }}
        >
          <AiFillEdit />
        </MainButton>
        <MainButton
          className="btn btn-danger"
          fn={() => handleDeleteCasino(card)}
        >
          <FaTrashAlt />
        </MainButton>
      </CardControl>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 1rem;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  box-shadow: 0px 0px 43px 4px rgba(255, 255, 255, 0.3);
  border: 1px solid gold;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  background-position: center center;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardInfo = styled.div`
  color: #fff;
  height: 10%;
`;

const CardControl = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
`;
