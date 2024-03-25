import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import styled from "styled-components";

export const SocialMediaCol = () => {
  return (
    <SocialMedia className="col-12 col-md-4 px-2 px-sm-0">
      <SocialMediaWrapper>
        <p>¡Seguinos!</p>
        <a
          href="https://instagram.com/casino.solana?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=100083974485666&mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineFacebook />
        </a>
      </SocialMediaWrapper>
    </SocialMedia>
  );
};

const SocialMedia = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const SocialMediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    gap: 30px;
  }
  p {
    font-size: 1.2rem;
    width: 100%;
    font-weight: 500;
    margin: 0;
    color: #fff !important;
    transition: all 0.5s ease;
    &:hover {
      color: #d4a747 !important;
    }
  }
  a {
    svg {
      font-size: 2.8rem;
      margin: auto;
      transition: all 0.5s ease;
      color: #fff;
      &:hover {
        color: #d4a747;
      }
      @media screen and (min-width: 768px) {
        font-size: 3.5rem;
      }
    }
  }
`;
