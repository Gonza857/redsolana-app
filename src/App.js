import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, ErrorPage } from "./Layout/";
import "bootstrap/dist/css/bootstrap.min.css";
import Rutas from "./routes/Routes";
import WhatsappBtn, {
  BottomRightButton,
} from "./components/BottomRightButton/BottomRightButton";
import { useContext } from "react";
import { adminContext } from "./storage/AdminContext";
import styled from "styled-components";

export default function App() {
  const { isAdmin, sorteoActivo, isOpenMenu } = useContext(adminContext);
  return (
    <>
      <Navbar />
      <StyledMain
        style={{
          marginTop: sorteoActivo ? "90px" : "60px",
          minHeight: sorteoActivo ? "calc(100vh - 90px)" : "calc(100vh - 60px)",
          filter: isOpenMenu ? "brightness(50%)" : "unset",
        }}
      >
        <Rutas />
      </StyledMain>
      <Footer />
      <BottomRightButton admin={isAdmin} />
    </>
  );
}

const StyledMain = styled.main`
  overflow: hidden;
  display: flex;
  background-color: #000;
  transition: all 1s;
  background-color: #1b1a1e;
`;
