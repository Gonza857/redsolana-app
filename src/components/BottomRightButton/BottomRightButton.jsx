import React from "react";
import { useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";

export const BottomRightButton = ({ admin = false }) => {
  const navigate = useNavigate();
  const { setIsOpenMenu, isOpenMenu } = useContext(adminContext);
  if (admin) {
    if (isOpenMenu) {
      return <></>;
    }
    return (
      <>
        <HomeContainer
          onClick={() => {
            navigate("/admin");
            setIsOpenMenu(false);
          }}
        >
          <AiFillHome />
        </HomeContainer>
      </>
    );
  } else {
    if (isOpenMenu) {
      return <></>;
    }
    return (
      <WhatsappContainer>
        <a
          href="https://wa.link/f0rcku"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/images/whatsappLogo.png" alt="" />
        </a>
      </WhatsappContainer>
    );
  }
};

const HomeContainer = styled.div`
  box-sizing: border-box;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 20px;
  padding: 5px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #d4af37;
  svg {
    font-size: 2rem;
    color: #000;
  }
  @media screen and (min-width: 768px) {
    margin: 50px;
    padding: 10px;
  }
`;

const WhatsappContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 20px;
  border-radius: 50%;
  overflow: hidden;
  padding: 5px;
  background-color: #25d366;
  @media screen and (min-width: 768px) {
    margin: 50px;
    padding: 10px;
  }
  a {
    img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
  }
`;
