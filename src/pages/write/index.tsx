import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';
import { Input, Select, FormControl } from '@chakra-ui/react';

import { postNoticeInfo } from 'api/notice';

import MetaTag from '@/components/MetaTag';
import DetailLayout from '@/components/Layout/DetailLayout';
import { FlexMixin } from 'styles/mixin';

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

const InsertItem = styled(FormControl)<{ type: string }>`
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
  const { type } = router.query;

  const [title, setTitle] = useState('');
  const [htmlStr, setHtmlStr] = useState('');
  const [selected, setSelected] = useState(type);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidate, setIsValidate] = useState(false);
  const [isError, setIsError] = useState(false);

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
    if (selected === '' || title === '' || htmlStr === '') {
      setIsValidate(true);
      return;
    }
    try {
      await postNoticeInfo({
        title: title,
        content: htmlStr,
        type: selected as string,
        expireTime: '2050-10-04 23:50:11',
      }).then((res) => {
        if (res && res.status === 200 && res.data.message === 'Success') {
          setTitle('');
          setHtmlStr('');
          setIsLoading(false);
          router.push('/');
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  return (
    <>
      <MetaTag title="Notice | Write Page" />

      <DetailLayout>
        <WriteTitle>
          <Typography type="h5" color="black">
            Write Notice
          </Typography>
        </WriteTitle>

        <InsertArea>
          <Typography type="b4" color="gray900">
            Title :
          </Typography>

          <InsertItem type="title" isInvalid={title === ''}>
            <ContentTitleInput
              value={title}
              onChange={handleTitle}
              placeholder="Notice Title"
            />

            <div>
              {isValidate && (
                <Typography
                  type="b4"
                  color={title === '' ? 'red' : 'primary900'}
                >
                  {title === ''
                    ? 'Please enter title in input box.'
                    : 'Title Info get required.'}
                </Typography>
              )}
            </div>
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

            <div>
              <Typography
                color={
                  selected === '' || selected === 'all' ? 'red' : 'primary900'
                }
                type="b4"
              >
                {selected === '' || selected === 'all'
                  ? 'Please select type.'
                  : `${selected} type is required.`}
              </Typography>
            </div>
          </InsertItem>

          <EditorBox>
            <TUI htmlStr={htmlStr} setHtmlStr={setHtmlStr} autofocus={false} />
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
