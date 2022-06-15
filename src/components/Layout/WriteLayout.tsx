import React from 'react';

import styled from '@emotion/styled';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const WriteContainer = styled.div`
  width: auto;
`;

const Container = styled.div`
  max-width: 1410px;
  width: 100%;
  min-height: 50rem;
  height: 100%;
  margin-top: 8rem;
  padding: 112px 0 5rem 0;
  margin: auto;
  z-index: 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

type Props = {
  children: React.ReactNode;
};

const WriteLayout = ({ children }: Props) => {
  return (
    <WriteContainer>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </WriteContainer>
  );
};

export default WriteLayout;
