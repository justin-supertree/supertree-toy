import React from 'react';
import styled from '@emotion/styled';
import { breakpoints } from '@playdapp/ui';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import { DetailContainer } from 'styles/pages/home';

const Container = styled.div`
  width: 100%;
  max-width: 838px;
  margin-top: 8rem;
  padding: 32px 3rem 5rem 3rem;
  margin: auto;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  ${breakpoints.down('md')} {
    min-height: 46rem;
    padding: 20px 1rem;
  }
`;

type Props = {
  children: React.ReactNode;
};

const DetailLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <DetailContainer>
        <Container>{children}</Container>
      </DetailContainer>
      <Footer />
    </>
  );
};

export default DetailLayout;
