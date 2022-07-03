import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { breakpoints, Button, Typography } from '@playdapp/ui';
import { Input, Select, FormControl } from '@chakra-ui/react';
import { Markup } from 'interweave';

import { postNoticeInfo } from 'api/notice';

import MetaTag from '@/components/MetaTag';
import DetailLayout from '@/components/Layout/DetailLayout';
import { FlexMixin } from 'styles/mixin';
import Loading from '@/components/Loading';

type ValidateProps = {
  title: string;
  selected?: string | string[];
  isHtmlStrFail: boolean;
};

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

const selectList = ['service', 'tip', 'event'];
const expireTime = '2050-10-04 23:50:11';
const initContent = '<p><br class="ProseMirror-trailingBreak"></p>';

const WriteContent = () => {
  const router = useRouter();
  const { type } = router.query;

  const [selected, setSelected] = useState(type);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidate, setIsValidate] = useState(false);
  const [isError, setIsError] = useState(false);

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [validate, setValidate] = useState({
    title: '',
    selected: '',
    contents: '',
  });

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const cancelWrite = () => {
    router.push('/');
  };

  const handleValidate = ({
    title,
    selected,
    isHtmlStrFail,
  }: ValidateProps): boolean => {
    if (!title || !selected || selected === 'all' || isHtmlStrFail) {
      setValidate({
        title: title ? '' : 'Please enter title in input box.',
        selected: selected !== 'all' && selected ? '' : 'Please select type',
        contents: !isHtmlStrFail ? '' : 'Please enter title in input box.',
      });
      setIsValidate(true);
      setIsError(true);
      return false;
    }

    return true;
  };

  const uploadNewData = async () => {
    const isHtmlStrFail = !contents || initContent === contents;

    const validateCheck = handleValidate({
      title,
      selected,
      isHtmlStrFail,
    });

    if (!validateCheck) return;
    try {
      const params = {
        title,
        content: contents as string,
        type: selected as string,
        expireTime,
      };
      const res = await postNoticeInfo(params);

      if (res?.status === 200) {
        router.push('/');
      }
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(true);
      setIsError(false);
    };
  }, []);

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

          <InsertItem type="title" isInvalid={!!validate.title}>
            <ContentTitleInput
              value={title}
              onChange={handleTitle}
              placeholder="Notice Title"
            />

            <div>
              {isValidate && (
                <Typography
                  type="b4"
                  color={validate.title ? 'red' : 'primary900'}
                >
                  {validate.title
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
              {isValidate && (
                <Typography
                  color={validate.selected ? 'red' : 'primary900'}
                  type="b4"
                >
                  {validate.selected
                    ? 'Please select type.'
                    : `${selected} type is required.`}
                </Typography>
              )}
            </div>
          </InsertItem>

          <EditorBox>
            <TUI
              htmlStr={contents}
              setHtmlStr={setContents}
              autofocus={false}
            />

            <div>
              {isValidate && (
                <Typography
                  color={contents === initContent ? 'red' : 'primary900'}
                  type="b4"
                >
                  {contents === initContent
                    ? 'Please write your content.'
                    : `Content text is required.`}
                </Typography>
              )}
            </div>
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

      {isError && isLoading && <Loading />}
    </>
  );
};

const TUI = dynamic(() => import('../../components/TUI'), {
  ssr: false,
});

export default WriteContent;
