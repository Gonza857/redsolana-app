import React from "react";
import styled from "styled-components";

export const DevInfoRow = () => {
  return (
    <DevInfo className="col-12 py-lg-2">
      <p>
        Diseñado y desarrollado por{" "}
        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/gonzaloramos-webdev//",
              "_blank"
            )
          }
          className="m-0 p-0"
        >
          Gonzalo Ramos
        </button>
      </p>
    </DevInfo>
  );
};

const DevInfo = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.8px solid #c7c7c7;
  background-color: #94844b;
  p {
    color: #000;
    margin: 0;
    @media screen and (min-width: 320px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 720px) {
      font-size: 1rem;
    }
  }
  button {
    background: transparent;
    border: 0;
    color: #000;
    font-weight: bold;
    &:hover {
      text-decoration: underline !important;
    }
    @media screen and (min-width: 320px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 720px) {
      font-size: 1rem;
    }
  }
`;
