import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Input, Select, FormControl } from '@chakra-ui/react';
import { breakpoints, Button, Typography } from '@playdapp/ui';

import useOpenControl from 'hooks/useOpenControl';
import { deleteNotice, getNoticeDetail, patchSubmit } from 'api/notice';

import MetaTag from '@/components/MetaTag';
import DetailLayout from '@/components/Layout/DetailLayout';
import DeleteModal from '@/components/Modal/DeleteModal';
import UploadModal from '@/components/Modal/UploadModal';
import TUI from '@/components/TUI';

import { FlexMixin } from 'styles/mixin';
import { GetServerSideProps } from 'next';

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

const initContent = '<p><br class="ProseMirror-trailingBreak"></p>';
const expireTime = '2050-10-04 23:50:11';
const selectList = ['service', 'tip', 'event'];

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

  const [isOpen, setIsOpen] = useOpenControl();
  const [isUploadOpen, setUploadOpen] = useOpenControl();

  const handleOpenModal = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };

  const handleUploadOpenModal = (isUploadOpen: boolean) => () => {
    setUploadOpen(isUploadOpen);
    if (titles === '' || contents === initContent) {
      setIsValidate(true);
      return;
    }
    setIsValidate(false);
  };

  const [validate, setValidate] = useState({
    title: '',
    selected: '',
    htmlStr: '',
  });

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
        htmlStr: !isHtmlStrFail ? '' : 'Please enter title in input box.',
      });
      setIsValidate(true);
      return false;
    }

    return true;
  };

  const handleDelete = async () => {
    try {
      await deleteNotice({
        id: noticeId,
      }).then((response) => {
        if (response && response.status === 200) {
          // toast.success("z")
          router.push(`/`);
        }
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleSubmitEdit = async () => {
    const isHtmlStrFail = !contents || initContent === contents;

    const validateCheck = handleValidate({
      titles,
      selected,
      isHtmlStrFail,
    });

    if (!validateCheck) return;

    try {
      await patchSubmit({
        id: noticeId,
        title: titles as string,
        content: contents as string,
        type: selected as string | undefined,
        expireTime: expireTime,
      }).then((response) => {
        if (response && response.status === 200) {
          handleUploadOpenModal(false);
          //   handleEdit(false);
          setIsValidate(false);
          setIsLoading(false);
          router.push(`/detail/${id}?${selected}`);
        }
      });
    } catch (e) {
      console.log(e);
      setIsLoading(true);
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
          setIsLoading(false);
          return req;
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(true);
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
              htmlStr={contents as string}
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
              onClick={handleUploadOpenModal(true)}
            >
              <Typography type="b3" color="atlantic">
                Edit
              </Typography>
            </ClickButton>
          </ButtonArea>
        </InsertArea>
      </DetailLayout>

      {isOpen && (
        <DeleteModal
          id={noticeId as number}
          isOpen={isOpen}
          handleOpenModal={handleOpenModal}
          handleDelete={handleDelete}
        />
      )}

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

export default EditPage;
