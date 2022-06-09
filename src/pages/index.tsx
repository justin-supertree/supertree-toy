import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { breakpoints, palette, Button } from '@playdapp/ui';
import { Input, Textarea } from '@chakra-ui/react';

import type { NextPage } from 'next';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  width: auto;
`;

const InsertArea = styled.div`
  max-width: 50rem;
  width: 100%;
  padding: 5rem 2rem 3rem 2rem;
  margin: auto;
  margin-bottom: 5rem;
  border-radius: 24px;
  border: 1px solid ${palette.gray900};

  /* ${breakpoints.down('md')} {
  } */
`;

const InsertItem = styled(FlexMixin)`
  margin-bottom: 15px;
  text-align: left;
  white-space: nowrap;
`;

const OptionTitle = styled.span`
  font-size: 25px;
  font-weight: 700;
  margin-right: 15px;
`;

const ContentTitleInput = styled(Input)`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const ContentInputBox = styled(Textarea)`
  width: 100%;
  min-height: 20rem;
  margin-top: 1rem;
`;

const UpdateButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
  color: #ffff;
`;

const IndexPage: NextPage = () => {
  const apihost =
    'https://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [datas, setDatas] = useState([]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const uploadNewData = () => {
    axios
      .post(`${apihost}/notice`, {
        title: title,
        content: content,
        type: 'service',
        expireTime: '1995-10-04 23:50:11',
      })
      .then((res) => {
        if (res && res.status === 200 && res.data.message === 'Success') {
          console.log('post response', res);
          setTitle('');
          setContent('');
          alert('Post response success!!');
        }
      });
  };

  useEffect(() => {
    axios.get(`${apihost}/notice?type=service&page=1`).then((res) => {
      const data = res.data.list;
      setDatas(data);
      return res.data.list;
    });
  }, []);

  return (
    <>
      <Container>
        <Header />

        <MainLayout>
          <InsertArea>
            <InsertItem>
              <OptionTitle>Title :</OptionTitle>
              <ContentTitleInput value={title} onChange={handleTitle} />
            </InsertItem>

            <InsertItem>
              <OptionTitle>Type :</OptionTitle>
              <ContentTitleInput value="service" />
            </InsertItem>

            <div>
              <OptionTitle>Content :</OptionTitle>
              <br />
              <ContentInputBox
                type="text"
                value={content}
                onChange={handleContent}
                placeholder="Please Write your contents in here"
              />
            </div>

            <UpdateButton color="marketplace" onClick={uploadNewData}>
              Button
            </UpdateButton>
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
