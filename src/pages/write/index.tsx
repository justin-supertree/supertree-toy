import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';
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
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selected, setSelected] = useState('');

  const selectList = ['service', 'tip', 'event'];

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const cancelWrite = () => {
    router.push('/');
  };

  const uploadNewData = () => {
    if (selected === '') {
      return;
    }
    axios
      .post(`${apihost}/notice`, {
        title: title,
        content: content,
        type: selected,
        expireTime: '2050-10-04 23:50:11',
      })
      .then((res) => {
        if (res && res.status === 200 && res.data.message === 'Success') {
          setTitle('');
          setContent('');
          alert('Post response success!!');
          router.push('/');
        }
      });
  };

  return (
    <WriteLayout>
      <WriteTitle>
        <Typography type="h5" color="black">
          Write Notice / Edit Notice
        </Typography>
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
          <ContentTypeSelect
            placeholder="타입을 선택해주세요."
            onChange={handleSelectOption}
            value={selected}
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
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
            disabled={
              selected === '' || title === '' || content === '' ? true : false
            }
            onClick={uploadNewData}
          >
            <Typography type="b3" color="atlantic">
              Write
            </Typography>
          </ClickButton>
        </ButtonArea>
      </InsertArea>
    </WriteLayout>
  );
};

export default WriteContent;
