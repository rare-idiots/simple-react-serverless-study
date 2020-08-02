import React from 'react';

// Style
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2020 Rare Idiots</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.FooterBackGroundColor};
  color: ${(props) => props.theme.FooterColor};
  min-height: 35px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const FooterText = styled.p`
  font-size: 20px;
  line-height: 44px;
  letter-spacing: -1.3px;
  font-weight: 400;
`;
