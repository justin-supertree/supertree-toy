import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';
import { Input, Select, Textarea } from '@chakra-ui/react';

import { postNoticeInfo } from 'api/notice';

import MetaTag from '@/components/MetaTag';
import { FlexMixin } from 'styles/mixin';
import MainLayout from '@/components/Layout/MainLayout';
import DetailLayout from '@/components/Layout/DetailLayout';

const WriteTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const InsertArea = styled.div`
  width: 100%;
  text-align: left;
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

const EditorBox = styled.div`
  margin: 16px 0;
`;

const ButtonArea = styled(FlexMixin)`
  justify-content: center;
  margin-top: 40px;
  text-align: center;

  ${breakpoints.down('md')} {
    display: block;
  }
`;

const ClickButton = styled(Button)`
  width: 100%;
  max-width: 240px;
  margin: 0 4px;
  color: #ffff;

  ${breakpoints.down('md')} {
    max-width: 100%;
    margin: 4px 0;

    &.cancel {
      order: 0;
    }
    &.write {
      order: 1;
    }
  }
`;

const WriteContent = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [htmlStr, setHtmlStr] = useState('');
  const [selected, setSelected] = useState('');

  const selectList = ['service', 'tip', 'event'];

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const cancelWrite = () => {
    router.push('/');
  };

  const uploadNewData = async () => {
    if (selected === '') {
      return;
    }
    await postNoticeInfo({
      title: title,
      content: htmlStr,
      type: selected,
      expireTime: '2050-10-04 23:50:11',
    }).then((res) => {
      if (res && res.status === 200 && res.data.message === 'Success') {
        setTitle('');
        setHtmlStr('');
        router.push('/');
      }
    });
  };

  return (
    <>
      <MetaTag title="Notice | Write Page" />

      <DetailLayout>
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

          <EditorBox>
            <TUI htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
          </EditorBox>

          <ButtonArea>
            <ClickButton
              className="cancel"
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
              className="write"
              size="md"
              color="primary"
              variant="solid"
              disabled={
                selected === '' || title === '' || htmlStr === '' ? true : false
              }
              onClick={uploadNewData}
            >
              <Typography type="b3" color="atlantic">
                Write
              </Typography>
            </ClickButton>
          </ButtonArea>
        </InsertArea>
      </DetailLayout>
    </>
  );
};

const TUI = dynamic(() => import('../../components/TUI'), {
  ssr: false,
});

export default WriteContent;
