import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';
import { Input, Select, Textarea } from '@chakra-ui/react';

import WriteLayout from '@/components/Layout/WriteLayout';

type Props = {
  noticeId?: number;
  title?: string;
  type?: string;
  content?: string;
  dateCreate?: string;
};

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const WriteTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const InsertArea = styled.div`
  width: 100%;
  text-align: left;

  /* ${breakpoints.down('md')} {
  } */
`;

const InsertItem = styled(FlexMixin)<{ type: string }>`
  padding-bottom: 15px;
  text-align: left;
  white-space: nowrap;
  border-bottom: ${({ type }) => type === 'type' && '1px solid #E3E4E7'};
`;

const ContentTitleInput = styled(Input)`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const ContentTypeSelect = styled(Select)`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const ContentInputBox = styled(Textarea)`
  width: 100%;
  min-height: 392px;
  margin-top: 1rem;
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

const WriteContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

  const router = useRouter();

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
          console.log(res);
          alert('Post response success!!');
          router.push('/');
        }
      });
  };

  const cancelWrite = () => {
    alert('cancel write contents!!');
    router.push('/');
  };

  return (
    <WriteLayout>
      <WriteTitle>
        <Typography type="h5" color="black">
          Write Notice / Edit Notice
        </Typography>

        <Link href={`/`}>
          <Button>Goback</Button>
        </Link>
      </WriteTitle>

      <InsertArea>
        <Typography type="b4" color="gray900">
          Title :
        </Typography>
        <InsertItem type="title">
          <ContentTitleInput
            value={title}
            onChange={handleTitle}
            placeholder="Notice Title"
          />
        </InsertItem>

        <Typography type="b4" color="gray900">
          Type :
        </Typography>

        <InsertItem type="type">
          <ContentTypeSelect placeholder="Select option">
            <option value="Service">Option 1</option>
            <option value="Tip">Option 2</option>
            <option value="Event">Option 3</option>
          </ContentTypeSelect>
        </InsertItem>

        <ContentInputBox
          type="text"
          value={content}
          onChange={handleContent}
          placeholder="Please Write your contents in here"
        />

        <ButtonArea>
          <ClickButton
            size="md"
            color="primary"
            variant="outline"
            onClick={cancelWrite}
          >
            <Typography type="b3" color="primary700">
              Cancel
            </Typography>
          </ClickButton>

          <ClickButton
            size="md"
            color="primary"
            variant="solid"
            onClick={uploadNewData}
          >
            <Typography type="b3">Write</Typography>
          </ClickButton>
        </ButtonArea>
      </InsertArea>
    </WriteLayout>
  );
};

export default WriteContent;
