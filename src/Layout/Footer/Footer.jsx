import React from "react";
import styled from "styled-components";
import {
  BrandCol,
  BrandCopy,
  DevInfoRow,
  SectionsCol,
  SocialMediaCol,
} from "../../components/AUser/Footer/index.js";

export const Footer = () => {
  return (
    <FooterContainer className="col-12 pt-lg-4">
      <FooterWrapper className="col-10 gap-4 gap-md-0 py-lg-2">
        {/* Column 1 */}
        <BrandCol />
        {/* Column 2 */}
        <SectionsCol />
        {/* Column 3 */}
        <SocialMediaCol />
        <BrandCopy />
      </FooterWrapper>
      {/* Dev Info Row */}
      <DevInfoRow />
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: absolute;
  right: 0;
  border-top: 1px solid #fff;
  height: fit-content;
  background-color: #3745d4;
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
  @media screen and (min-width: 320px) {
    width: 80%;
    margin: auto;
  }
  @media screen and (min-width: 968px) {
    align-items: start;
    width: 80%;
    margin: auto;
  }
`;
