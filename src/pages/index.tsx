import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';
import { flexbox, Input, Select, Textarea } from '@chakra-ui/react';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';

type RequestProps =
  | {
      noticeId?: number;
      title?: string;
      type?: string;
      content?: string;
      dateCreate?: string;
    }
  | string;

type Event = RequestProps;

type Props = {
  data: Event[];
};

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  width: auto;
`;

const NoticeTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 40px;
`;

const TabBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 732px;
  margin: auto;
  margin-bottom: 40px;
  border-radius: 12px;
  background-color: #efeff1;
`;

const Tab = styled(FlexMixin)`
  justify-content: center;
  width: 178px;
  height: 48px;
  margin: 4px;
  border: 1px solid;
  border-radius: 12px;

  &:hover {
    background-color: #d0d1d7;
  }
`;

const LoadMore = styled(Button)`
  width: 121px;
  margin-top: 20px;
`;

const IndexPage: NextPage = () => {
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [datas, setDatas] = useState<Props[]>([]);

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
        expireTime: '2050-10-04 23:50:11',
      })
      .then((res) => {
        if (res && res.status === 200 && res.data.message === 'Success') {
          setTitle('');
          setContent('');
          alert('Post response success!!');
        }
      });
  };

  useEffect(() => {
    axios.get(`${apihost}/notice?type=service&page=1`).then((res) => {
      try {
        if (res && res.status === 200) {
          const data = res.data.data.list;
          return setDatas(data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <>
      <Container>
        <Header />

        <MainLayout>
          <NoticeTitle>Notice</NoticeTitle>
          <TabBox>
            <Tab>All</Tab>
            <Tab>Service</Tab>
            <Tab>Event</Tab>
            <Tab>Tip</Tab>
          </TabBox>

          <Button>
            <Link href={`/write`}>Write</Link>
          </Button>

          <Table title="main-table" headers={['No', 'Title', 'Date']}>
            {datas?.map((info, index) => {
              return (
                <Table.Item
                  key={index}
                  noticeId={info.noticeId}
                  title={info.title}
                  dateCreate={info.dateCreate}
                />
              );
            })}
          </Table>

          <LoadMore size="md" color="primary" variant="outline">
            <Typography type="b3" color="primary700">
              LoadMore
            </Typography>
          </LoadMore>
        </MainLayout>

        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
