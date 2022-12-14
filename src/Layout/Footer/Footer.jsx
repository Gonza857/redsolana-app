import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer className="d-flex flex-column">
      <FooterWrapper className="col-12 gap-2 gap-md-0">
        <PageSections className="col-12 col-md-6 px-2 px-sm-0">
          <PageSectionsWrapper className="gap-2">
            <h5>Secciones</h5>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Home
            </Link>
            <Link
              to="/cajeros"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Cajeros
            </Link>
            <Link
              to="/cronograma"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Cronograma de pagos
            </Link>
          </PageSectionsWrapper>
        </PageSections>
        <CopyrightColumn className="col-12 col-md-6 gap-3 px-2 px-sm-0">
          <Link to="/" className="p-0 m-0 d-flex align-items-center brand-text">
            <BrandLogo src="./assets/images/logo2.png" alt="brand-logo" />
            <BrandText className="ms-4">Red Solana</BrandText>
          </Link>
          <div className="text-white text-center">
            © Red Solana - 2022. Todos los derechos reservados.
          </div>
        </CopyrightColumn>
      </FooterWrapper>
      <DevInfo className="col-12">
        <p>
          Creado y diseñado por{" "}
          <button
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/gonzaloramos-webdev//",
                "_blank"
              )
            }
            className="m-0 p-0"
          >
            Gonzalo Ramos.
          </button>
        </p>
      </DevInfo>
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

const DevInfo = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.8px solid #c7c7c7;
  background-color: #123;
  p {
    color: #fff;
    font-size: 12px;
    margin: 0;
  }
  button {
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 12px;
  }
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
  h5 {
    color: #fff !important;
    transition: all 0.5s ease;
    &:hover {
      color: #d4a747 !important;
    }
  }
  a {
    color: #d4a747 !important;
    transition: all 0.5s ease;
    &:hover {
      color: #fff !important;
    }
  }
`;
