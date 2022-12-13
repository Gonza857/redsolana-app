import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./footer.css";
import { BsInstagram } from "react-icons/bs";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";

function Footer() {
  const { verificarUrl } = useContext(adminContext);

  const navigate = useNavigate();

  // const subir = () => {
  //   console.log(window.scrollY);
  //   if (window.screenY > 500) {
  //     console.log("pasaste los 300px");
  //   } else {
  //     console.log("todavia no pasaste los 300");
  //   }
  // };

  // useEffect(() => {
  //   const verUrl = verificarUrl();
  //   console.log(verUrl);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     subir();
  //   });
  // }, [window.screenY]);

  return (
    <FooterContainer className="d-flex flex-column">
      <FooterWrapper className="col-12 gap-2 gap-md-0">
        <PageSections className="col-12 col-md-6 px-2 px-sm-0">
          <PageSectionsWrapper className="gap-2">
            <h5>Secciones</h5>
            <a
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/");
              }}
            >
              Home
            </a>
            <a
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/cajeros");
              }}
            >
              Cajeros
            </a>
            <a
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/tyc");
              }}
            >
              Terminos y condiciones
            </a>
          </PageSectionsWrapper>
        </PageSections>
        <CopyrightColumn className="col-12 col-md-6 gap-3 px-2 px-sm-0">
          <Link to="/" className="p-0 m-0 d-flex align-items-center brand-text">
            <img
              src="./assets/images/logo2.png"
              className="navbar-brand-logo"
              alt="brand-logo"
            />
            <h2 className="p-0 m-0 ms-4">Red Solana</h2>
          </Link>
          <div className="text-white text-center">
            © Red Solana - 2022. Todos los derechos reservados.
          </div>
        </CopyrightColumn>
      </FooterWrapper>
      <div className="col-12 text-white meritos bg-primary d-flex align-items-center justify-content-center">
        <p className="m-0 p-0">Creado y diseñado por Gonzalo Ramos.</p>
      </div>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  border-top: 1px solid #fff;
  height: fit-content;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
`;

const CopyrightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-top: 0.5px solid #464646;
  @media screen and (min-width: 768px) {
    border: none;
  }
  margin: auto;
  padding: 20px 0;
`;

const PageSections = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;

const PageSectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  && {
    padding: 0;
    margin: 0;
    color: #fff;
  }
`;
