import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 15rem;
  background-color: lightgreen;
`;

const Header = () => {
  return <Container>Here is Header Area</Container>;
};

export default Header;
