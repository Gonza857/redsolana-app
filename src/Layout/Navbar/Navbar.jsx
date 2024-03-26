import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminContext } from "../../storage/AdminContext";
import { ToastContainer } from "react-toastify";
import styled, { keyframes } from "styled-components";

const navbarLinks = [
  { to: "/", slug: "Home" },
  { to: "/cajeros", slug: "Cajeros" },
  { to: "/jugar", slug: "Jugar" },
];

export const Navbar = () => {
  const {
    isAdmin,
    setIsAdmin,
    isOpenMenu,
    setIsOpenMenu,
    sorteoActivo,
    logout,
    scrollToSection,
  } = useContext(adminContext);

  window.addEventListener("resize", function () {
    if (this.window.innerWidth > 968) setIsOpenMenu(false);
  });

  const navigate = useNavigate();

  return (
    <>
      <NavbarContainer>
        <ToastContainer />
        <Wrapper className="flex-lg-row justify-content-lg-between">
          <LogoContainer className="col-12 col-md-11 col-lg-auto py-1">
            <Link to="/" className="d-flex align-items-center brand-text">
              <BrandLogo
                onClick={() => {
                  setIsOpenMenu(true);
                }}
                src="./assets/images/logo2.png"
                alt="brand-logo"
              />
              <BrandText className="ms-2 ms-xl-4"> Red Solana</BrandText>
            </Link>
            <HamburguerContainer
              className={`icon nav-icon-5 ${isOpenMenu && "open"}`}
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </HamburguerContainer>
          </LogoContainer>

          {/* MENU DESKTOP */}
          <div className="d-none d-lg-flex align-items-center gap-xl-2">
            <ul className="d-flex flex-wrap gap-0 p-0 m-0 h-100">
              {navbarLinks.map((link) => (
                <MenuItem key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => {
                      console.log("tocaste un botón");
                      if (window.scrollY !== 0) {
                        // Si ya estás en la parte superior, desplázate automáticamente hacia arriba
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    {link.slug}
                  </Link>
                </MenuItem>
              ))}
            </ul>
            {isAdmin && (
              <AdminMenu className="d-flex flex-wrap gap-0 p-0 m-0 h-100">
                <MenuItem>
                  <Link
                    to="/admin"
                    onClick={() => {
                      setIsOpenMenu(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    Admin
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                      setIsOpenMenu(false);
                    }}
                  >
                    Cerrar Sesión
                  </Link>
                </MenuItem>
              </AdminMenu>
            )}
          </div>
        </Wrapper>

        {/* MENU MOBILE */}
        <MobileNav
          className={`d-lg-none ${isOpenMenu ? "showMenu" : "closeMenu"}`}
        >
          <div>
            <ul className="d-flex flex-column align-items-center p-0 m-0">
              {navbarLinks.map((link) => (
                <MenuItem key={link.to}>
                  <Link onClick={() => setIsOpenMenu(false)} to={link.to}>
                    {link.slug}
                  </Link>
                </MenuItem>
              ))}
            </ul>
            {isAdmin && (
              <AdminMenu className="m-auto h-100">
                <MenuItem>
                  <Link
                    to="/admin"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setIsOpenMenu(false);
                    }}
                  >
                    Admin
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                      setIsOpenMenu(false);
                    }}
                  >
                    Cerrar Sesión
                  </Link>
                </MenuItem>
              </AdminMenu>
            )}
          </div>
        </MobileNav>
      </NavbarContainer>
      <StyledTextCarrousel
        className="text-white col-12"
        style={{
          display: !sorteoActivo ? "none" : "block",
          filter: isOpenMenu ? "brightness(50%)" : "unset",
        }}
      >
        <div className="gap-5">
          <p className="gap-1 ms-4">
            ¡Sorteo activo! Participa haciendo click
            <Link to="/sorteo">aquí.</Link>
          </p>
          <p className="gap-1 ms-4">
            ¡Sorteo activo! Participa haciendo click
            <Link to="/sorteo">aquí.</Link>
          </p>
          <p className="gap-1 ms-4">
            ¡Sorteo activo! Participa haciendo click
            <Link to="/sorteo">aquí.</Link>
          </p>
          <p className="gap-1 ms-4">
            ¡Sorteo activo! Participa haciendo click
            <Link to="/sorteo">aquí.</Link>
          </p>
        </div>
      </StyledTextCarrousel>
    </>
  );
};

const NavbarContainer = styled.nav`
  width: 100%;
  height: 60px;
  background-color: #3745d4;
  border-bottom: 1px solid #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  @media screen and (min-width: 968px) {
    width: 90%;
  }
`;

const CarrouselTextAnimation = keyframes`
  from {
      transform: translateX(100%);
    }
  to{
      transform: translateX(-100%);
    }
`;

const StyledTextCarrousel = styled.div`
  transition: all 0.6s;
  z-index: 150;
  background-color: #d4af37;
  position: fixed;
  top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    white-space: nowrap;
    animation: ${CarrouselTextAnimation} 40s linear infinite;
    transition: all 0.5s;
    height: 30px;
    color: #000;
    display: flex;
    p {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      height: 100%;
      font-size: 1rem;
      font-weight: 500;
      a {
        margin: 0;
        padding: 0;
      }
    }
  }
`;

const MobileNav = styled.nav`
  width: 80%;
  height: 100vh;
  background-color: #1b1a1e;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  @media screen and (min-width: 500px) {
    width: 50%;
  }
  @media screen and (min-width: 768px) {
    width: 40%;
  }
  div {
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;

const BrandLogo = styled.img`
  width: 40px;
  height: 40px;
  background-color: #d4af37;
  background-image: linear-gradient(to bottom, #8c81ec, #66cdff);
  padding: 10px;
  border-radius: 50%;
  transition: transform 1s;
  &:hover {
    transform: rotate(360deg) scale(1.15);
  }
`;

// Texto de logo
const BrandText = styled.p`
  padding: 0;
  margin: 0;
  color: #d4b237;
  transition: color 0.3s;
  font-size: 2rem;
  font-family: "Bebas Neue", sans-serif;
  &:hover {
    color: #fff;
  }
`;

const AdminMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  li {
    a {
      color: #d4b237;
    }
    &:first-child {
      margin-top: 0;
      margin-bottom: 10px;
    }
    &:last-child {
      margin: 0;
    }
  }
  @media screen and (min-width: 991px) {
    flex-direction: row;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    color: #fff;
    border-bottom: none;
    li {
      &:first-child {
        margin: 0;
      }
    }
  }
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: #3d4be7;
  }
  a {
    background: unset;
    width: fit-content !important;
    height: fit-content;
    text-align: center;
    padding: 10px 15px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    transition: all 0.5s ease;
    color: #fff;
    font-family: "Bebas Neue", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-size: 1.3rem;
    &:hover {
      color: #d4b237;
    }
    @media screen and (max-width: 960px) {
      width: 100px;
    }
    @media screen and (min-width: 1100px) {
      width: 100px;
      font-size: 1.25rem;
    }
  }
`;

const HamburguerContainer = styled.div`
  display: none;
  width: 35px;
  height: 30px;
  position: relative;
  cursor: pointer;
  z-index: 1000;

  span {
    background-color: #fff;
    position: absolute;
    border-radius: 2px;
    transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
    width: 100%;
    height: 4px;
    transition-duration: 0.2s;
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

  @media screen and (max-width: 991px) {
    display: inline-block;
  }
`;
