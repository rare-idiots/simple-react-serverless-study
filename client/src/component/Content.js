import React from 'react';

// Style
import styled from 'styled-components';

const Content = () => {
  return <ContentContainer>Content</ContentContainer>;
};

export default Content;

const ContentContainer = styled.div`
  flex: 1 1 auto;
  background-color: ${(props) => props.theme.ContentBackGroundColor};
`;
