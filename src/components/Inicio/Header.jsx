import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainButton } from "../UI/MainButton";

export const Header = () => {
  return (
    <HeaderContainer className="col-12 m-auto" id="Home">
      <HeaderInfo className="d-flex flex-column flex-wrap gap-2 align-items-lg-center justify-content-lg-center col-lg-10">
        <img src="./assets/images/header-bg-styled.jpg" />
        <div className="gap-2">
          <p>¡Jugá y ganá!</p>
          <p>Grandes premios te esperan</p>
          <Link to={"/jugar"}>
            <MainButton big={true}>PEDÍ TU USUARIO</MainButton>
          </Link>
        </div>
      </HeaderInfo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  @media screen and (min-width: 1024px) {
    height: calc(100vh - 60px);
  }
`;

const HeaderInfo = styled.div`
  margin: auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  @media screen and (min-width: 720px) {
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media screen and (min-width: 720px) {
    }
  }
  div {
    height: fit-content;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    @media screen and (min-width: 720px) {
      margin-right: 80px;
      width: unset;
      height: unset;
    }
    p {
      margin: 0;
      padding: 0;
      font-family: "Bebas Neue", sans-serif;
      color: #fff;
      font-size: 1.5rem;
      @media screen and (min-width: 720px) {
        font-size: 2rem;
      }
      @media screen and (min-width: 992px) {
        font-size: 2.5rem;
      }
    }
  }
`;
