import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';

import WriteLayout from '@/components/Layout/WriteLayout';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContentHeadArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray400};
`;

const InsertArea = styled.div`
  width: 100%;
  text-align: left;

  /* ${breakpoints.down('md')} {
  } */
`;

const ContentDescBox = styled.div`
  width: 100%;
  min-height: 432px;
  margin-top: 1rem;
  border: 1px solid;
`;

const ButtonArea = styled(FlexMixin)`
  justify-content: center;
  margin-top: 40px;
  text-align: center;
`;

const ClickButton = styled(Button)`
  width: 100%;
  max-width: 240px;
  margin: 0 4px;
  color: #ffff;
`;

const TitleBlock = styled.div`
  text-align: left;
`;

const EditButton = styled(Button)`
  align-items: flex-end;
  margin: 0 4px;
`;

type Props = {
  noticeId?: number;
  title?: string;
  type?: string;
  content?: string;
  dateCreate?: string;
};

const DetailContent = ({ noticeId }: any) => {
  console.log(
    'Props로 받아온 데이터: ',
    Number(noticeId),
    typeof Number(noticeId),
  );
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';
  // const id = noticeId.slice(1, 3);
  const id = Number(noticeId);
  // console.log('가공한후 ', id);
  // const inject = parseInt(id);
  // console.log('inject', inject);
  const router = useRouter();

  const viewlist = () => {
    alert('cancel write contents!!');
    router.push('/');
  };

  useEffect(() => {
    axios.get(`${apihost}/notice/detail/${id}`).then((response) => {
      console.log('response', response);
      try {
        if (response && response.status === 200) {
          // const data = res.data.data.list;
          console.log(response);
          return response;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [id]);

  return (
    <WriteLayout>
      <ContentHeadArea>
        <Typography type="h5" color="black">
          {noticeId}
        </Typography>
        <TitleBlock>
          <Typography type="h5" color="black">
            Notice Title
          </Typography>

          <div>
            <Typography type="p4" color="dgray300">
              May-04-2022 ~ Jun-06-2022
            </Typography>
          </div>
        </TitleBlock>

        <TitleBlock>
          <EditButton size="sm" color="primary" variant="outline">
            <Typography type="h6" color="primary700">
              Edit
            </Typography>
          </EditButton>

          <EditButton size="sm" color="primary" variant="outline">
            <Typography type="h6" color="primary700">
              Delete
            </Typography>
          </EditButton>
        </TitleBlock>
      </ContentHeadArea>

      <InsertArea>
        <ContentDescBox />

        <ButtonArea>
          <ClickButton
            size="sm"
            color="primary"
            variant="solid"
            onClick={viewlist}
          >
            <Typography type="b3">View list</Typography>
          </ClickButton>
        </ButtonArea>
      </InsertArea>
    </WriteLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const noticeId = query.slug;

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(['getDetail'], async () => {
  //   try {
  //     const response = await fetch(`${apihost}/notice/detail/:${noticeId}`);
  //     const data = await response.json();

  //     if (response.status !== 200) {
  //       throw new Error('invalid data');
  //     }
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  return {
    props: { noticeId },
  };
};

export default DetailContent;
