import "./App.css";
import { Navbar, Footer } from "./Layout/";
import "bootstrap/dist/css/bootstrap.min.css";
import Rutas from "./routes/Routes";
import { BottomRightButton } from "./components/BottomRightButton/BottomRightButton";
import { useContext } from "react";
import { adminContext } from "./storage/AdminContext";
import styled from "styled-components";
import { Metronome } from "@uiball/loaders";
import { Loader } from "./components/UI/Loader";
import { AiFillCheckCircle } from "react-icons/ai";
import { Animated } from "react-animated-css";

/*
  -- USER
  INICIO - OK
  CAJEROS - OK
  JUGAR - OK
  NOVEDADES - OK

  -- ADMIN
  VISTA ADMIN - OK
    -- CAJEROS
      -- LISTADO - OK
      -- AGRAGAR - OK


*/

export default function App() {
  const {
    isAdmin,
    sorteoActivo,
    isOpenMenu,
    isLoading,
    isAdminAction,
    successState,
  } = useContext(adminContext);
  return (
    <>
      <Navbar />
      <MyToast
        isAdminAction={isAdminAction}
        type={`${successState ? "success" : "loading"}`}
        style={{
          marginTop: isLoading ? "90px" : "",
          minHeight: isLoading ? "calc(100vh - 90px)" : "calc(100vh - 60px)",
        }}
      />
      <StyledMain
        style={{
          filter: isOpenMenu || isAdminAction ? "brightness(25%)" : "unset",
        }}
      >
        <Rutas />
      </StyledMain>
      <Footer />
      <BottomRightButton admin={isAdmin} />
    </>
  );
}

const MyToast = ({ isAdminAction, type, ...args }) => {
  if (isAdminAction && type == "loading") {
    return (
      <StyledToast
        {...args}
        className="text-white d-flex justify-content-center align-items-center"
      >
        <div className="rounded toast-box d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      </StyledToast>
    );
  } else if (isAdminAction && type == "sucess") {
    return (
      <StyledToast
        {...args}
        className="text-white d-flex justify-content-center align-items-center"
      >
        <div className="rounded toast-box d-flex align-items-center justify-content-center">
          <Animated animationIn="fadeIn">
            <AiFillCheckCircle style={{ fontSize: "6rem", color: "#d4af37" }} />
          </Animated>
        </div>
      </StyledToast>
    );
  } else if (!isAdminAction) {
    return <></>;
  }
  return (
    <StyledToast
      {...args}
      className="text-white d-flex justify-content-center align-items-center"
    >
      <div className="rounded toast-box d-flex align-items-center justify-content-center">
        {type == "loading" ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <Animated animationIn="fadeIn">
              <AiFillCheckCircle
                style={{ fontSize: "6rem", color: "#d4af37" }}
              />
            </Animated>
          </>
        )}
      </div>
    </StyledToast>
  );
};

const StyledToast = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1500;
  div {
    background-color: #1b1a1e;
  }
`;

const StyledMain = styled.main`
  overflow: hidden;
  display: flex;
  transition: all 1s;
  background-color: #1b1a1e;
  min-height: 100vh;
  padding-top: 80px;
`;
