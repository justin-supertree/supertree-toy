import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from 'types/next-page';
import Link from 'next/link';
import NextImage from 'next/image';
import { useInfiniteQuery } from 'react-query';
import styled from '@emotion/styled';
import {
  breakpoints,
  spacing,
  palette,
  Button,
  Typography,
} from '@playdapp/ui';
import { useMedia } from 'react-use';

import { getNotice } from 'api/notice';

import Header from '@/components/Layout/Header';
import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import Footer from '@/components/Layout/Footer';
import MetaTag from '@/components/MetaTag';
import Error from '../../public/assets/icons/error.png';

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

  ${breakpoints.down('md')} {
    font-size: 24px;
    margin-bottom: 1rem;
  }
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

  ${breakpoints.down('md')} {
    margin-bottom: 1rem;
  }
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

  ${breakpoints.down('md')} {
    width: 91px;
    height: 32px;
    background-color: ${({ isSelect }) => (isSelect ? '#36383F' : '')};
  }
`;

const LoadMore = styled(Button)`
  width: 121px;
  margin-top: 20px;
`;

const EmptyItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;

  gap: ${spacing.xl};

  button {
    color: ${palette.white};
    font-weight: 600;
    border-radius: 1.5rem;
  }
`;

const IndexPage: NextPageWithLayout = () => {
  const isMobile = useMedia('(max-width: 752px)', true);

  const [tab, setTab] = useState({
    key: 'all',
    value: 'All',
  });

  const handleTab = (key: string, value: string) => () => {
    if (key === tab.key) {
      setTab({ key: 'all', value: 'All' });
      return;
    }
    setTab({ key, value });
  };

  const fetchDataList = async ({ pageParam = 1 }) => {
    const inject = [];
    const { data } = await getNotice({
      type: tab.key,
      page: pageParam,
    });
    inject.push(data);

    return {
      ...inject[0],
      from: pageParam * 10,
      nextPage: pageParam + 1,
    };
  };

  const {
    isLoading,
    data: requestData,
    fetchNextPage,
    refetch,
    hasNextPage,
    error,
  } = useInfiniteQuery(['projects', tab.key], fetchDataList, {
    getNextPageParam: (table) => {
      if (
        Math.floor(
          (table.data.list.total as number) ||
            (table.data.total as number) / 10,
        ) >= table.nextPage &&
        ((table.data.list.total as number) || (table.data.total as number)) > 10
      ) {
        return table.nextPage;
      }
    },
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <MetaTag title="Notice | PlayDapp Notice" />
      <Container>
        <Header />

        <MainLayout>
          <>
            <NoticeTitle>Notice</NoticeTitle>
            <TabBox>
              <Tab
                onClick={handleTab('all', 'All')}
                isSelect={tab.key === 'all'}
              >
                All
              </Tab>
              <Tab
                onClick={handleTab('service', 'Service')}
                isSelect={tab.key === 'service'}
              >
                Service
              </Tab>
              <Tab
                onClick={handleTab('event', 'Event')}
                isSelect={tab.key === 'event'}
              >
                Event
              </Tab>
              <Tab
                onClick={handleTab('tip', 'Tip')}
                isSelect={tab.key === 'tip'}
              >
                Tip
              </Tab>
            </TabBox>

            <WriteButton>
              <Link href={`/write`}>
                <Button size={isMobile ? 'sm' : 'sm'}>
                  <Typography type={isMobile ? 'b2' : 'h5'} color="atlantic">
                    Write
                  </Typography>
                </Button>
              </Link>
            </WriteButton>

            {requestData?.pages[0].data.list?.length !== 0 && (
              <>
                <Table title="main-table" headers={['No', 'Title', 'Date']}>
                  {requestData?.pages.map((noticeData) => {
                    return noticeData.data?.list?.map((info: Props) => (
                      <Table.Item
                        key={info.noticeId}
                        noticeId={info.noticeId}
                        title={info.title}
                        type={info.type}
                        dateCreate={info.dateCreate}
                        tab={tab.key}
                      />
                    ));
                  })}
                </Table>

                {hasNextPage && (
                  <LoadMore
                    size="md"
                    color="primary"
                    variant="outline"
                    onClick={handleLoadMore}
                  >
                    <Typography type="b3" color="primary700">
                      LoadMore
                    </Typography>
                  </LoadMore>
                )}
              </>
            )}

            {!isLoading && error && (
              <EmptyItemBlock>
                <NextImage
                  src={Error}
                  width={120}
                  height={120}
                  layout="fixed"
                  alt="notice Alert"
                />

                <Typography type="h4" color="atlantic">
                  No Data in Notice.
                </Typography>
              </EmptyItemBlock>
            )}
          </>
        </MainLayout>

        <Footer />
      </Container>
    </>
  );
};

export default IndexPage;
