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

import { DetailContainer } from 'styles/pages/home';

const Container = styled.div`
  width: 100%;
  max-width: 838px;
  min-height: 61rem;
  height: 100%;
  margin-top: 8rem;
  padding: 112px 0 5rem 0;
  margin: auto;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  ${breakpoints.down('md')} {
    min-height: 59rem;
    padding: 0 1rem;
  }
`;

type Props = {
  children: React.ReactNode;
};

const DetailLayout = ({ children }: Props) => {
  return (
    <DetailContainer>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </DetailContainer>
  );
};

export default DetailLayout;
