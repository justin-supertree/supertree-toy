import type { NextPage } from 'next';

import { useState } from 'react';
import styled from '@emotion/styled';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: auto;
  text-align: center;
`;

const InsertArea = styled.div`
  width: 50%;
  padding: 5rem 0;
  margin: auto;
  margin-bottom: 5rem;
  border-radius: 24px;
  border: 1px solid;
`;

const InsertItem = styled(FlexMixin)`
  margin-right: 15px;
  text-align: left;
`;

const InsertButton = styled.button`
  height: 3rem;
  font-weight: 600;
  font-size: 25px;
  border-radius: 14px;
`;

const IndexPage: NextPage = () => {
  const [title, setTitle] = useState('');
  const [nftcode, setNftcode] = useState('');

  const handleNftCode = (nftcode: string) => () => {
    setNftcode(nftcode);
  };

  const handleInput = (title: string) => () => {
    setTitle(title);
  };

  return (
    <>
      <Container>
        <Header />

        <MainLayout>
          <InsertArea>
            <InsertItem>
              <h3>NFT Code :</h3>
              <input onChange={handleNftCode(nftcode)} />
            </InsertItem>

            <InsertItem>
              <h3>title :</h3>
              <input onChange={handleInput(title)} />
            </InsertItem>

            <InsertItem>
              <h3>Demo :</h3>
              <input onChange={handleNftCode(nftcode)} />
            </InsertItem>

            <InsertItem>
              <h3>example :</h3>
              <input onChange={handleInput(title)} />
            </InsertItem>

            <InsertButton type="submit">Add Info</InsertButton>
          </InsertArea>

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
