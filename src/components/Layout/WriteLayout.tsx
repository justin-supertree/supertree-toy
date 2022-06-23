import React from 'react';

import styled from '@emotion/styled';
import {
  breakpoints,
  spacing,
  palette,
  Button,
  Typography,
} from '@playdapp/ui';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import { WriteContainer } from 'styles/pages/home';

const Container = styled.div`
  width: 100%;
  max-width: 838px;
  height: 100%;
  min-height: 61rem;
  margin-top: 8rem;
  padding: 112px 3rem 5rem 3rem;
  margin: auto;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  ${breakpoints.down('md')} {
    padding: 20px 1rem;
  }
`;

type Props = {
  children: React.ReactNode;
};

const WriteLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <WriteContainer>
        <Container>{children}</Container>
      </WriteContainer>
      <Footer />
    </>
  );
};

export default WriteLayout;
