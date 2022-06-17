import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styled from '@emotion/styled';
import { breakpoints, palette, Button } from '@playdapp/ui';
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

const ContentTypeSelect = styled(Select)`
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

const WriteContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';

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

  return (
    <WriteLayout>
      <Link href={`/`}>
        <Button>Goback</Button>
      </Link>

      <InsertArea>
        <InsertItem>
          <OptionTitle>Title :</OptionTitle>
          <ContentTitleInput value={title} onChange={handleTitle} />
        </InsertItem>

        <InsertItem>
          <OptionTitle>Type :</OptionTitle>
          <ContentTypeSelect placeholder="Select option">
            <option value="Service">Option 1</option>
            <option value="Tip">Option 2</option>
            <option value="Event">Option 3</option>
          </ContentTypeSelect>
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

        <UpdateButton color="primary" onClick={uploadNewData}>
          Button
        </UpdateButton>
      </InsertArea>
    </WriteLayout>
  );
};

export default WriteContent;
