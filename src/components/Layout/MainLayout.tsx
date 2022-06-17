import React from 'react';

import styled from '@emotion/styled';

import { MainContainer } from 'styles/pages/home';

const Container = styled.div`
  width: 100%;
  padding: 32px 0 5rem 0;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <MainContainer>
      <Container>{children} </Container>
    </MainContainer>
  );
};

export default MainLayout;
