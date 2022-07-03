import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import type { NextPageWithLayout } from 'types/next-page';
import { useMedia } from 'react-use';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';

import { getNotice } from 'api/notice';

import MainLayout from '@/components/Layout/MainLayout';
import Table from '@/components/Table';
import MetaTag from '@/components/MetaTag';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';

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
    background-color: ${({ isSelect }) => (isSelect ? '#36383F' : '#d0d1d7')};
  }

  ${breakpoints.down('md')} {
    width: 91px;
    height: 32px;
    background-color: ${({ isSelect }) => isSelect && '#36383F'};
  }
`;

const WritePosition = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const WriteButton = styled(Button)`
  width: auto;
`;

const LoadMore = styled(Button)`
  margin-top: 20px;
`;

const tabList = [
  {
    key: 'all',
  },
  {
    key: 'service',
  },
  {
    key: 'event',
  },
  {
    key: 'tip',
  },
];

const IndexPage: NextPageWithLayout = () => {
  const isMobile = useMedia('(max-width: 752px)', true);

  const router = useRouter();
  const { type } = router.query;
  const [tab, setTab] = useState('');

  const handleTab = (select: string) => () => {
    if (type === select) {
      setTab(select);
      return;
    }
    setTab(select);
    router.push(`/?type=${select}`);
  };

  const fetchDataList = async ({ pageParam = 1 }) => {
    const { data } = await getNotice({
      type: tab,
      page: pageParam,
    });

    return {
      ...data,
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
  } = useInfiniteQuery(['projects', tab], fetchDataList, {
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
    setTab(type ? type.toString() : 'all');
  }, [type]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <MetaTag title="Notice | PlayDapp Notice" />

      <Container>
        <MainLayout>
          {!isLoading && (
            <>
              <NoticeTitle>
                <Typography type={isMobile ? 'h4' : 'h3'}>Notice</Typography>
              </NoticeTitle>

              <TabBox>
                {tabList.map((info, index) => (
                  <Tab
                    key={index}
                    onClick={handleTab(info.key)}
                    isSelect={info.key === tab}
                  >
                    {info.key}
                  </Tab>
                ))}
              </TabBox>

              <WritePosition>
                <Link href={{ pathname: `/write`, query: { type: tab } }}>
                  <WriteButton size={isMobile ? 'xs' : 'sm'}>
                    <Typography type={isMobile ? 'b3' : 'b3'} color="atlantic">
                      Write
                    </Typography>
                  </WriteButton>
                </Link>
              </WritePosition>

              {requestData?.pages[0].data.list?.length !== 0 && !error ? (
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
                          tab={tab}
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
                        Load more +
                      </Typography>
                    </LoadMore>
                  )}
                </>
              ) : (
                <Empty tab={tab} />
              )}
            </>
          )}

          {isLoading && <Loading />}
        </MainLayout>
      </Container>
    </>
  );
};

IndexPage.getInitialProps = async ({ query }) => {
  const { tab } = query;

  return { tab };
};

export default IndexPage;
