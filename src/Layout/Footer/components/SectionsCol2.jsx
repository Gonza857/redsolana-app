import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const navbarLinks = [
  { to: "/", slug: "Home" },
  { to: "/casinos", slug: "Casinos" },
  { to: "/cajeros", slug: "Cajeros" },
  { to: "/cronograma", slug: "Cronograma" },
  { to: "/jugar", slug: "Jugar" },
];

const scrollToZero = () => window.scrollTo(0, 0);

export const SectionsCol = () => {
  return (
    <PageSections className="col-12 col-md-4 px-2 px-sm-0">
      <PageSectionsWrapper className="gap-2">
        <p>Secciones</p>
        {navbarLinks.map(({ slug, to }) => (
          <Link to={to} onClick={scrollToZero} key={to}>
            {slug}
          </Link>
        ))}
      </PageSectionsWrapper>
    </PageSections>
  );
};

const PageSections = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

const PageSectionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: #fff !important;
    transition: all 0.5s ease;
    font-weight: 500;
    font-size: 1.2rem;
    margin: 0;
    &:hover {
      color: #d4a747 !important;
    }
  }
  a {
    color: #fff !important;
    transition: all 0.5s ease;
    &:hover {
      color: #d4a747 !important;
    }
  }
`;
