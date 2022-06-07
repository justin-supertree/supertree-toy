import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/Layout/Header';
import MainLayout from '../components/Layout/MainLayout';
import Footer from '../components/Layout/Footer';

const Container = styled.div`
  width: auto;
  text-align: center;
`;

const IndexPage: NextPage = () => {
  return (
    <>
      <Container>
        <Header />
        <MainLayout>Here is Main body</MainLayout>

        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
