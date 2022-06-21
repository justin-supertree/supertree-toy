import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'types/next-page';
import axios from 'axios';
import Link from 'next/link';
import { useInfiniteQuery, useQuery } from 'react-query';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';
import { format } from 'date-fns';

import { getNotice } from 'api/notice';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';
import MetaTag from '@/components/MetaTag';

type Props = {
  noticeId: number;
  title: string;
  type: string;
  content: string;
  dateCreate: string;
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

const WriteButton = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
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

const Tab = styled(FlexMixin)<{ isSelect: boolean }>`
  justify-content: center;
  width: 178px;
  height: 48px;
  margin: 4px;
  border-radius: 12px;
  background-color: ${({ isSelect }) => (isSelect ? '#36383F' : '')};
  color: ${({ isSelect }) => (isSelect ? 'white' : '')};
  cursor: pointer;

  &:hover {
    background-color: #d0d1d7;
  }
`;

const LoadMore = styled(Button)`
  width: 121px;
  margin-top: 20px;
`;

const IndexPage: NextPageWithLayout = () => {
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

  const [datas, setDatas] = useState<Props[]>([]);
  const [tab, setTab] = useState({
    key: 'All',
    value: 'all',
  });

  const [loadMore, setLoadMore] = useState(false);

  const handleTab = (key: string, value: string) => () => {
    if (key === tab.key) {
      setTab({ key: 'all', value: 'All' });
      return;
    }
    setTab({ key, value });
  };

  const fetchDataList = async ({ pageParam = 1 }) => {
    console.log('Data is Fetching!');
    const inject = [];
    const { data } = await getNotice({
      type: 'all',
      page: 0,
    });
    inject.push(data);

    return {
      ...datas[0],
      from: pageParam * 10,
      nextPage: pageParam + 1,
    };
  };

  // const {
  //   isLoading,
  //   data: requestData,
  //   fetchNextPage,
  //   refetch,
  //   hasNextPage,
  //   error,
  // } = useInfiniteQuery(['notice', noticeId, loadMore], fetchDataList, {
  //   getNextPageParam: (table) => {
  //     console.log('table', table);
  //     if (
  //       Math.floor((table.total as number) / 10) >= table.nextPage &&
  //       (table.total as number) > 10
  //     ) {
  //       return table.nextPage;
  //     }
  //   },
  //   refetchOnWindowFocus: false,
  //   cacheTime: 0,
  // });

  useEffect(() => {
    // fetchDataList();
    axios.get(`${apihost}/notice?type=${tab.value}&page=1`).then((res) => {
      try {
        if (res && res.status === 200) {
          console.log('Get data', res);
          const data = res.data.data.list;
          return setDatas(data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const handleLoadMore = (isLoadMore: boolean) => () => {
    console.log('Click! handleLoadMore', isLoadMore);
    setLoadMore(isLoadMore);
    // fetchNextPage;
  };

  return (
    <>
      <MetaTag title="Notice | PlayDapp Notice" />
      <Container>
        <Header />

        <MainLayout>
          <NoticeTitle>Notice</NoticeTitle>
          <TabBox>
            <Tab
              onClick={handleTab('All', 'all')}
              isSelect={tab.value === 'all'}
            >
              All
            </Tab>
            <Tab
              onClick={handleTab('Service', 'service')}
              isSelect={tab.value === 'service'}
            >
              Service
            </Tab>
            <Tab
              onClick={handleTab('Event', 'event')}
              isSelect={tab.value === 'event'}
            >
              Event
            </Tab>
            <Tab
              onClick={handleTab('Tip', 'tip')}
              isSelect={tab.value === 'tip'}
            >
              Tip
            </Tab>
          </TabBox>
          <WriteButton>
            <Link href={`/write`}>
              <Button>Write</Button>
            </Link>
          </WriteButton>

          <Table title="main-table" headers={['No', 'Title', 'Date']}>
            {datas?.map((info, index) => {
              console.log(info);
              return (
                <Table.Item
                  key={index}
                  noticeId={info.noticeId}
                  title={info.title}
                  type={info.type}
                  dateCreate={info.dateCreate}
                  tab={tab.value}
                />
              );
            })}
          </Table>

          {datas && datas.length >= 10 && (
            <LoadMore
              size="md"
              color="primary"
              variant="outline"
              onClick={handleLoadMore(true)}
            >
              <Typography type="b3" color="primary700">
                LoadMore
              </Typography>
            </LoadMore>
          )}
        </MainLayout>

        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
