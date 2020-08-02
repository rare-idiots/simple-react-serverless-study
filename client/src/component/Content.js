import React from 'react';

// Style
import styled from 'styled-components';

// Component
import Converter from './Converter';

const Content = () => {
  return (
    <ContentContainer>
      <Converter />
    </ContentContainer>
  );
};

export default Content;

const ContentContainer = styled.div`
  flex: 1 1 auto;
  background-color: ${(props) => props.theme.ContentBackGroundColor};
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
