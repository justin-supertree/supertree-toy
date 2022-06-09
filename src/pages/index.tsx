import type { NextPage } from 'next';

import { useState } from 'react';
import styled from '@emotion/styled';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';
import User from '@/components/User';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  width: auto;
`;

const InsertArea = styled.div`
  width: 50%;
  padding: 5rem 2rem;
  margin: auto;
  margin-bottom: 5rem;
  border-radius: 24px;
  border: 1px solid;
`;

const InsertItem = styled(FlexMixin)`
  margin-bottom: 15px;
  text-align: left;
  white-space: nowrap;
`;

const InsertButton = styled.button`
  height: 3rem;
  font-weight: 600;
  font-size: 25px;
  border-radius: 14px;
`;

const OptionTitle = styled.span`
  font-size: 25px;
  font-weight: 700;
  margin-right: 15px;
`;

const ContentTitleInput = styled.input`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const ContentInputBox = styled.input`
  width: 100%;
  min-height: 20rem;
  margin-top: 1rem;
`;

const IndexPage: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log('title', title);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log('content', content);
  };

  return (
    <>
      <Container>
        <Header />

        <MainLayout>
          <InsertArea>
            <InsertItem>
              <OptionTitle>Title :</OptionTitle>
              <ContentTitleInput onChange={handleTitle} />
            </InsertItem>

            <InsertItem>
              <OptionTitle>Type :</OptionTitle>
              <ContentTitleInput />
            </InsertItem>

            <div>
              <OptionTitle>Content :</OptionTitle>
              <br />
              <ContentInputBox type="text" onChange={handleContent} />
            </div>
          </InsertArea>

          <Table
            title="main-table"
            headers={['Title', 'Type', 'Content', 'Expired Date']}
          >
            <Table.Item />
          </Table>
        </MainLayout>

        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
