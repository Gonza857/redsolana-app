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
const bgImage =
  "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

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
          backgroundImage: !isOpenMenu ? `url("${bgImage}")` : "unset",
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
`;
