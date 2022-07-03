import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Input, Select, FormControl } from '@chakra-ui/react';
import { breakpoints, Button, Typography } from '@playdapp/ui';
import dynamic from 'next/dynamic';

import useOpenControl from 'hooks/useOpenControl';
import { getNoticeDetail, patchSubmit } from 'api/notice';

import MetaTag from '@/components/MetaTag';
import DetailLayout from '@/components/Layout/DetailLayout';
import UploadModal from '@/components/Modal/UploadModal';
import Loading from '@/components/Loading';

import { FlexMixin } from 'styles/mixin';

type ValidateProps = {
  titles?: string;
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

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const noticeId = Number(id);
  const inputElement = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isValidate, setIsValidate] = useState(false);
  const [isError, setIsError] = useState(false);

  const [titles, setTitles] = useState('');
  const [contents, setContents] = useState('');
  const [selected, setSelected] = useState('');
  const [validate, setValidate] = useState({
    title: '',
    selected: '',
    contents: '',
  });
  const [isUploadOpen, setUploadOpen] = useOpenControl();

  const isHtmlStrFail = contents === '' || initContent === contents;

  const handleUploadOpenModal = (isUploadOpen: boolean) => () => {
    setUploadOpen(isUploadOpen);
    if (titles === '' || isHtmlStrFail) {
      setIsValidate(true);
      return;
    }
    setIsValidate(false);
  };

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitles(e.target.value);
  };

  const cancelWrite = () => {
    router.push(`/detail/${id}?${selected}`);
  };

  const handleValidate = ({
    titles,
    selected,
    isHtmlStrFail,
  }: ValidateProps): boolean => {
    if (!titles || !selected || selected === 'all' || isHtmlStrFail) {
      setValidate({
        title: titles ? '' : 'Please enter title in input box.',
        selected: selected !== 'all' && selected ? '' : 'Please select type',
        contents: !isHtmlStrFail ? '' : 'Please enter title in input box.',
      });
      setIsValidate(true);
      setIsError(true);
      return false;
    }

    return true;
  };

  const handleSubmitEdit = async () => {
    const validateCheck = handleValidate({
      titles,
      selected,
      isHtmlStrFail,
    });

    if (!validateCheck) return;

    try {
      const params = {
        id: noticeId,
        title: titles as string,
        content: contents as string,
        type: selected as string | undefined,
        expireTime: expireTime,
      };
      const response = await patchSubmit(params);

      if (response && response.status === 200) {
        handleUploadOpenModal(false);
        setIsValidate(false);
        router.push(`/detail/${id}?${selected}`);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(true);
      setIsError(true);
    }
  };

  useEffect(() => {
    try {
      getNoticeDetail({
        id: noticeId,
      }).then((response) => {
        if (response && response.status === 200) {
          const req = response.data.data.info;
          setTitles(req.title);
          setContents(req.content);
          setSelected(req.type);
          return req;
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(true);
      setIsError(true);
    }
  }, [noticeId]);

  return (
    <>
      <MetaTag title="Notice | Edit Page" />

      <DetailLayout>
        <WriteTitle>
          <Typography type="h5" color="black">
            Edit Notice
          </Typography>
        </WriteTitle>

        <InsertArea>
          <Typography type="b4" color="gray900">
            Title :
          </Typography>

          <InsertItem type="title">
            <ContentTitleInput
              value={titles}
              onChange={handleTitle}
              isInvalid={!!isValidate && !titles}
              ref={inputElement}
              size="lg"
              width="100%"
              autoFocus
            />

            <div>
              {isValidate && (
                <Typography
                  type="b4"
                  color={!validate.title && !titles ? 'red' : 'primary900'}
                >
                  {!validate.title && !titles
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
            <ContentTypeSelect onChange={handleSelectOption} value={selected}>
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
                  color={isHtmlStrFail ? 'red' : 'primary900'}
                  type="b4"
                >
                  {isHtmlStrFail
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
              onClick={handleUploadOpenModal(true)}
            >
              <Typography type="b3" color="atlantic">
                Edit
              </Typography>
            </ClickButton>
          </ButtonArea>
        </InsertArea>
      </DetailLayout>

      {isError && isLoading && <Loading />}

      {isUploadOpen && (
        <UploadModal
          isUploadOpen={isUploadOpen}
          handleUploadOpenModal={handleUploadOpenModal}
          handleSubmitEdit={handleSubmitEdit}
          isValidate={isValidate}
        />
      )}
    </>
  );
};

const TUI = dynamic(() => import('../../components/TUI'), {
  ssr: false,
});

export default EditPage;
