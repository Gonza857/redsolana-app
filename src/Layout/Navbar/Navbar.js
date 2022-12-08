import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { adminContext } from "../../storage/AdminContext";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

function Navbar() {
  const { isAdmin, setIsAdmin } = useContext(adminContext);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  function logOut() {
    toast.success("Cerraste sesión correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  window.addEventListener("resize", function () {
    if (this.window.innerWidth > 960) setIsOpenMenu(false);
  });

  function openMenu() {
    setIsOpenMenu(!isOpenMenu);
    if (!isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  return (
    <>
      {/* <nav className="navbar justify-content-evenly align-content-center navbarMod">
        <div className="">
          <Link to="/" className="p-0 m-0 d-flex align-items-center brand-text">
            <img
              src="./assets/images/logo2.png"
              className="navbar-brand-logo"
              alt="brand-logo"
            />
            <h2 className="p-0 m-0 ms-4">Red Solana</h2>
          </Link>
        </div>
        <div className="col-5 d-flex flex-row justify-content-around align-items-center">
          <Link to="/" className="navbar-link m-0 p-0 active">
            Home
          </Link>
          <Link to="/cajeros" className="navbar-link m-0 p-0">
            Cajeros
          </Link>
          <Link to="/tyc" className="navbar-link m-0 p-0 active">
            Terminos y condiciones
          </Link>

          {isAdmin ? (
              <>
                        <Link to="/admin" className="navbar-link m-0 p-0 active">
            Admin
          </Link>
                       <Button
              onClick={() => {
                localStorage.removeItem("active");
                setIsAdmin(false);
                logOut();
              }}
              variant="danger"
            >
              Cerrar sesión
            </Button>
              </>
          ) : (
            <></>
          )}
        </div>
      </nav> */}
      <NavbarContainer>
        <ToastContainer />
        <Wrapper>
          <LogoContainer>
            <Link
              to="/"
              className="p-0 m-0 d-flex align-items-center brand-text"
            >
              <img
                src="./assets/images/logo2.png"
                className="navbar-brand-logo"
                alt="brand-logo"
              />
              <h2 className="p-0 m-0 ms-4">Red Solana</h2>
            </Link>
          </LogoContainer>
          <Menu className={`${isOpenMenu ? "left0" : " "}`}>
            <MenuItem>
              <Link to="/" className="m-0 menuItemLink">
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/cajeros" className="m-0 menuItemLink">
                Cajeros
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/tyc" className="m-0 menuItemLink">
                Terminos y condiciones
              </Link>
            </MenuItem>
          </Menu>
          {isAdmin ? (
            <AdminMenu>
              <MenuItem>
                <Link to="/admin" className="m-0 menuItemLink">
                  Admin
                </Link>
              </MenuItem>
              <MenuItem>
                <LogoutBtn
                  className="m-0 menuItemLink"
                  onClick={() => {
                    localStorage.removeItem("active");
                    setIsAdmin(false);
                    logOut();
                  }}
                >
                  Cerrar sesión
                </LogoutBtn>
              </MenuItem>
            </AdminMenu>
          ) : (
            <></>
          )}
          <HamburguerContainer
            className={`icon nav-icon-5 ${isOpenMenu ? "open" : " "}`}
            onClick={() => openMenu()}
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburguerContainer>
        </Wrapper>
      </NavbarContainer>
    </>
  );
}

export default Navbar;

const NavbarContainer = styled.nav`
  width: 100%;
  height: 70px;
  background-color: #123;
  .left0 {
    left: 0 !important;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  h1 {
    color: #fff;
  }
`;

const Menu = styled.ul`
  height: fit-content;
  overflow: hidden;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 960px) {
    background-color: #213123;
    position: absolute;
    top: 70px;
    left: -100%;
    z-index: 1000;
    width: 100%;
    height: 90vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s ease;
  }
`;

const AdminMenu = styled(Menu)`
  border: 0.5px solid #d4af37;
  li {
    &:nth-child(2) {
      margin: 0;
    }
  }
`;

const HamburguerContainer = styled.div`
  display: none;
  width: 35px;
  height: 30px;
  position: relative;
  cursor: pointer;

  span {
    background-color: #fff;
    position: absolute;
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    width: 100%;
    height: 4px;
    transition-duration: 500ms;
  }

  span {
    &:nth-child(1) {
      top: 0px;
      left: 0px;
    }
    &:nth-child(2) {
      top: 13px;
      left: 0px;
      opacity: 1;
    }
    &:nth-child(3) {
      bottom: 0px;
      left: 0px;
    }
  }

  &:not(.open):hover span:nth-child(1) {
    transform: rotate(-3deg) scaleY(1.1);
  }
  &:not(.open):hover span:nth-child(2) {
    transform: rotate(3deg) scaleY(1.1);
  }
  &:not(.open):hover span:nth-child(3) {
    transform: rotate(-4deg) scaleY(1.1);
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg);
    top: 13px;
  }
  &.open span:nth-child(2) {
    opacity: 0;
  }
  &.open span:nth-child(3) {
    transform: rotate(-45deg);
    top: 13px;
  }

  @media screen and (max-width: 960px) {
    display: inline-block;
  }
`;

const MenuItem = styled.li`
  margin-right: 10px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  @media screen and (max-width: 960px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .menuItemLink {
    background: unset;
    height: fit-content;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #d4a747;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      color: #fff;
    }
    @media screen and (max-width: 960px) {
      width: 100px;
    }
  }
`;

const LogoutBtn = styled.button`
  margin: 0;
  background-color: unset;
  border: none;
  &:hover {
    color: #fff;
  }
`;
