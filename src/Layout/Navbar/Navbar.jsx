import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { adminContext } from "../../storage/AdminContext";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { closeSession } from "./logout.js";

const navbarLinks = [
  { to: "/", slug: "Home" },
  { to: "/cajeros", slug: "Cajeros" },
  { to: "/cronograma", slug: "Cronograma" },
];

function Navbar() {
  const { isAdmin, setIsAdmin, isOpenMenu, setIsOpenMenu } =
    useContext(adminContext);

  const logout = () => {
    closeSession();
    setIsAdmin(false);
  };

  window.addEventListener("resize", function () {
    if (this.window.innerWidth > 968) setIsOpenMenu(false);
  });

  return (
    <NavbarContainer className="fixed-top">
      <ToastContainer />
      <Wrapper className="flex-lg-row justify-content-lg-between">
        <LogoContainer>
          <Link to="/" className="d-flex align-items-center brand-text">
            <BrandLogo
              onClick={() => {
                setIsOpenMenu(true);
              }}
              src="./assets/images/logo2.png"
              alt="brand-logo"
            />
            <BrandText className="ms-4">
              Red Solana
              {isOpenMenu ? " O" : " C"}
            </BrandText>
          </Link>
          <HamburguerContainer
            className={`icon nav-icon-5 ${isOpenMenu ? "open" : " "}`}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburguerContainer>
        </LogoContainer>

        <div className="d-none d-lg-flex align-items-center">
          <ul className="d-flex flex-wrap gap-2 p-0 m-0">
            {navbarLinks.map((link) => (
              <>
                <MenuItem>
                  <Link to={link.to}>{link.slug}</Link>
                </MenuItem>
              </>
            ))}
          </ul>
          {isAdmin && (
            <AdminMenu>
              <MenuItem>
                <Link to="/admin" onClick={() => setIsOpenMenu(false)}>
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

      {/* HOLA */}
      <MobileNav
        className={`d-lg-none ${isOpenMenu ? "showMenu" : "closeMenu"}`}
      >
        <div>
          <ul className="d-flex flex-column align-items-center p-0 m-0">
            {navbarLinks.map((link) => (
              <>
                <MenuItem>
                  <Link onClick={() => setIsOpenMenu(false)} to={link.to}>
                    {link.slug}
                  </Link>
                </MenuItem>
              </>
            ))}
          </ul>
          {isAdmin && (
            <AdminMenu>
              <MenuItem>
                <Link to="/admin" onClick={() => setIsOpenMenu(false)}>
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
      {/* HOLA */}
    </NavbarContainer>
  );
}

export default Navbar;

const MobileNav = styled.nav`
  width: 80%;
  height: 100vh;
  background-color: #000;
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M81.28 88H68.413l19.298 19.298L81.28 88zm2.107 0h13.226L90 107.838 83.387 88zm15.334 0h12.866l-19.298 19.298L98.72 88zm-32.927-2.207L73.586 78h32.827l.5.5 7.294 7.293L115.414 87l-24.707 24.707-.707.707L64.586 87l1.207-1.207zm2.62.207L74 80.414 79.586 86H68.414zm16 0L90 80.414 95.586 86H84.414zm16 0L106 80.414 111.586 86h-11.172zm-8-6h11.173L98 85.586 92.414 80zM82 85.586L87.586 80H76.414L82 85.586zM17.414 0L.707 16.707 0 17.414V0h17.414zM4.28 0L0 12.838V0h4.28zm10.306 0L2.288 12.298 6.388 0h8.198zM180 17.414L162.586 0H180v17.414zM165.414 0l12.298 12.298L173.612 0h-8.198zM180 12.838L175.72 0H180v12.838zM0 163h16.413l.5.5 7.294 7.293L25.414 172l-8 8H0v-17zm0 10h6.613l-2.334 7H0v-7zm14.586 7l7-7H8.72l-2.333 7h8.2zM0 165.414L5.586 171H0v-5.586zM10.414 171L16 165.414 21.586 171H10.414zm-8-6h11.172L8 170.586 2.414 165zM180 163h-16.413l-7.794 7.793-1.207 1.207 8 8H180v-17zm-14.586 17l-7-7h12.865l2.333 7h-8.2zM180 173h-6.613l2.334 7H180v-7zm-21.586-2l5.586-5.586 5.586 5.586h-11.172zM180 165.414L174.414 171H180v-5.586zm-8 5.172l5.586-5.586h-11.172l5.586 5.586zM152.933 25.653l1.414 1.414-33.94 33.942-1.416-1.416 33.943-33.94zm1.414 127.28l-1.414 1.414-33.942-33.94 1.416-1.416 33.94 33.943zm-127.28 1.414l-1.414-1.414 33.94-33.942 1.416 1.416-33.943 33.94zm-1.414-127.28l1.414-1.414 33.942 33.94-1.416 1.416-33.94-33.943zM0 85c2.21 0 4 1.79 4 4s-1.79 4-4 4v-8zm180 0c-2.21 0-4 1.79-4 4s1.79 4 4 4v-8zM94 0c0 2.21-1.79 4-4 4s-4-1.79-4-4h8zm0 180c0-2.21-1.79-4-4-4s-4 1.79-4 4h8z' fill='%23d4a747' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E");
  @media screen and (min-width: 768px) {
    width: 40%;
  }
  div {
    width: 100%;
  }
`;

const NavbarContainer = styled.nav`
  width: 100%;
  height: 70px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-bottom: 1px solid #fff;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  @media screen and (min-width: 968px) {
    width: 80%;
  }
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  h1 {
    color: #fff;
  }
`;

const BrandLogo = styled.img`
  width: 50px;
  height: 50px;
  background-color: #d4af37;
  background-image: linear-gradient(to bottom, #8c81ec, #66cdff);
  padding: 10px;
  border-radius: 50%;
  transition: transform 1s;
  &:hover {
    transform: rotate(360deg) scale(1.15);
  }
`;

const BrandText = styled.h2`
  padding: 0;
  margin: 0;
  text-decoration: none !important;
  list-style: none;
  color: #d4af37;
  transition: color 0.3s;
  &:hover {
    color: #fff;
  }
`;

const AdminMenu = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px solid #d4af37;
  border-radius: 20px;
  li {
    font-weight: 600;
    &:first-child {
      margin-top: 0;
      margin-bottom: 10px;
    }
    &:last-child {
      margin: 0;
    }
  }
  @media screen and (min-width: 960px) {
    flex-direction: row;
    li {
      &:first-child {
        margin: 0;
      }
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

  @media screen and (max-width: 960px) {
    display: inline-block;
  }
`;

const MenuItem = styled.li`
  display: flex;
  transition: all 0.3s ease;
  color: #d4a747;
  @media screen and (min-width: 760px) {
    margin-right: 10px;
  }
  a {
    background: unset;
    width: fit-content !important;
    height: fit-content;
    text-align: center;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    transition: all 0.5s ease;
    color: #d4a747;
    &:hover {
      color: #fff;
    }
    @media screen and (max-width: 960px) {
      width: 100px;
    }
  }
`;
