import React from 'react';

// Style
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText>HyeJa Pdf Converter</HeaderText>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.HeaderBackGroundColor};
  color: ${(props) => props.theme.HeaderColor};
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.p`
  font-size: 33px;
  line-height: 44px;
  letter-spacing: -1.3px;
  font-weight: 400;
`;
