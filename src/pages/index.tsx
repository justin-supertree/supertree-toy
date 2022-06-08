import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';

const Container = styled.div`
  width: auto;
  text-align: center;
`;

const tableList = [];

const IndexPage: NextPage = () => {
  return (
    <>
      <Container>
        <Header />

        <MainLayout>
          <Table title="main-table" headers={['one', 'two', 'three', 'four']}>
            <Table.Item />
          </Table>
        </MainLayout>

        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
