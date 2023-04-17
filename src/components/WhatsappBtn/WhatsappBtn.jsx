import React from "react";
import styled from "styled-components";

function WhatsappBtn() {
  return (
    <WhatsappContainer>
      <a
        href="https://wa.link/f0rcku"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="../assets/images/whatsappLogo.png" alt="" />
      </a>
    </WhatsappContainer>
  );
}

export default WhatsappBtn;

const WhatsappContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 20px;
  border-radius: 50%;
  overflow: hidden;
  padding: 5px;
  background-color: #25d366;
  @media screen and (min-width: 768px) {
    margin: 50px;
    padding: 10px;
  }
  a {
    img {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }
  }
`;
