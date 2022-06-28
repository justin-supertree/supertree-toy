import React from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '@playdapp/ui';

import { MainContainer } from 'styles/pages/home';
import Header from './Header';
import Footer from './Footer';

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 61rem;
  padding: 32px 0 5rem 0;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin: auto;

  ${breakpoints.down('md')} {
    padding: 20px 0 46px 0;
  }
`;

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <MainContainer>
        <Container>{children} </Container>
      </MainContainer>
      <Footer />
    </>
  );
};

export default MainLayout;
