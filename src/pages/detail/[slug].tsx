import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';
import { Input, Select, FormControl } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Markup } from 'interweave';
import dynamic from 'next/dynamic';

import { deleteNotice, getNoticeDetail, patchSubmit } from 'api/notice';

import useOpenControl from 'hooks/useOpenControl';

import MetaTag from '@/components/MetaTag';
import DeleteModal from '@/components/Modal/DeleteModal';
import UploadModal from '@/components/Modal/UploadModal';
import DetailLayout from '@/components/Layout/DetailLayout';

type Prop = {
  noticeId?: number;
  title?: string;
  type?: string;
  content?: string;
  dateCreate?: Date | number;
};

type Props = {
  noticeId?: number;
};

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContentHeadArea = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.gray400};
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
`;

const ContentDescBox = styled.div`
  width: 100%;
  min-height: 432px;
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

  ${breakpoints.down('lg')} {
    max-width: 160px;
  }

  ${breakpoints.down('md')} {
    max-width: 100%;
    margin-bottom: 8px;
  }
`;

const TitleBlock = styled.div`
  text-align: left;
  height: 100%;
  max-width: 100%;
`;

const BeforeEditTitle = styled(FlexMixin)`
  justify-content: space-between;
  align-items: center;

  ${breakpoints.down('md')} {
    display: block;
    margin-top: 8px;
  }
`;

const EditButton = styled(Button)`
  align-items: flex-end;
  margin: 0 4px;
`;

const ContentTypeSelect = styled(Select)`
  width: 100%;
  min-height: 3rem;
  margin: 0;
`;

const InsertItem = styled(FormControl)<{ type: string }>`
  min-width: 5rem;
  margin: 5px 0;
  text-align: left;
  white-space: nowrap;
`;

const ContentTitleInput = styled(Input)`
  width: 100%;
  min-height: 3rem;
  padding: 12px 24px;
`;

const InsertBottomArea = styled(FlexMixin)`
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;

  ${breakpoints.down('md')} {
    display: block;
  }
`;

const UploadButtonBlock = styled(FlexMixin)`
  justify-content: center;
  margin-top: 40px;

  ${breakpoints.down('md')} {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const EditorBox = styled.div`
  margin: 16px 0;
`;

const DetailContent = ({ noticeId }: Props) => {
  const id = Number(noticeId);
  const router = useRouter();

  const [isOpen, setIsOpen] = useOpenControl();
  const [isUploadOpen, setUploadOpen] = useOpenControl();

  const [data, setData] = useState<Prop>({
    title: '',
    type: '',
    content: '',
    dateCreate: 0,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(0);
  const [contents, setContents] = useState('');
  const [selected, setSelected] = useState('');
  const inputElement = useRef<HTMLInputElement>(null);

  const selectList = ['service', 'tip', 'event'];

  const viewlist = () => {
    router.push('/');
  };

  const handleOpenModal = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };

  const handleUploadOpenModal = (isUploadOpen: boolean) => () => {
    setUploadOpen(isUploadOpen);
  };

  const handleEdit = (isEdit: boolean) => () => {
    setIsEdit(isEdit);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ title: e.currentTarget.value });
  };

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleSubmitEdit = async () => {
    try {
      await patchSubmit({
        id: id,
        title: data.title as string | undefined,
        content: contents,
        type: selected,
        expireTime: '2050-10-04 23:50:11',
      }).then((response) => {
        if (response && response.status === 200) {
          handleUploadOpenModal(false);
          handleEdit(false);
          router.push('/');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotice({
        id: id,
      }).then((response) => {
        if (response && response.status === 200) {
          const result = response.status;
          setIsRemove(result);
          router.push('/');
          return isRemove;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      getNoticeDetail({
        id: id,
      }).then((response) => {
        if (response && response.status === 200) {
          const req = response.data.data.info;
          setData(req);
          return req;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <>
      <MetaTag title="Notice | Detial Page" />

      <DetailLayout>
        {isEdit && (
          <WriteTitle>
            <Typography type="h5" color="black">
              Edit Notice
            </Typography>
          </WriteTitle>
        )}

        <ContentHeadArea>
          {data && data !== undefined && (
            <>
              <TitleBlock>
                {!isEdit ? (
                  <>
                    <Typography type="h4" color="black">
                      {data.title}
                    </Typography>

                    <BeforeEditTitle>
                      <Typography type="b3" color="gray700">
                        {data.dateCreate !== undefined &&
                          format(
                            new Date(data.dateCreate),
                            'MMM-dd-yyyy h:mm:ss a',
                          )}
                      </Typography>

                      <FlexMixin>
                        <EditButton
                          size="sm"
                          color="primary"
                          variant="outline"
                          onClick={handleEdit(true)}
                        >
                          <Typography type="h6" color="primary700">
                            Edit
                          </Typography>
                        </EditButton>

<<<<<<< Updated upstream
                        <EditButton
                          size="sm"
                          color="primary"
                          variant="outline"
                          onClick={handleOpenModal(true)}
                        >
                          <Typography type="h6" color="primary700">
                            Delete
                          </Typography>
                        </EditButton>
                      </FlexMixin>
                    </BeforeEditTitle>
                  </>
                ) : (
                  <>
                    <Typography type="b4" color="gray900">
                      Title :
                    </Typography>
=======
                      <InsertItem type="title" isInvalid={data.title === ''}>
                        <ContentTitleInput
                          value={data.title}
                          onChange={handleTitle}
                          ref={inputElement}
                          size="lg"
                          width="100%"
                          autoFocus
                        />

                        <div>
                          <Typography
                            color={data.title === '' ? 'red' : 'primary900'}
                          >
                            {data.title === ''
                              ? 'Please enter title text in input box.'
                              : 'Title is required.'}
                          </Typography>
                        </div>
                      </InsertItem>
>>>>>>> Stashed changes

                    <InsertItem type="title" isInvalid={data.title === ''}>
                      <ContentTitleInput
                        value={data.title}
                        onChange={handleTitle}
                        ref={inputElement}
                        size="lg"
                        width="100%"
                        autoFocus
                      />

                      <div>
                        <Typography
                          color={data.title === '' ? 'red' : 'primary900'}
                        >
                          {data.title === ''
                            ? 'Please enter title text in input box.'
                            : 'Title is required.'}
                        </Typography>
                      </div>
                    </InsertItem>

                    <Typography type="b4" color="gray900">
                      Type :
                    </Typography>

                    <InsertItem type="type">
                      <ContentTypeSelect
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
                  </>
                )}
<<<<<<< Updated upstream
              </TitleBlock>

              {isEdit && (
                <InsertBottomArea>
                  <Typography type="p4" color="dgray300">
                    {data.dateCreate !== undefined &&
                      format(
                        new Date(data.dateCreate),
                        'MMM-dd-yyyy h:mm:ss a',
                      )}
                  </Typography>
                </InsertBottomArea>
              )}
            </>
          )}
        </ContentHeadArea>

        <InsertArea>
          {!isEdit ? (
            <>
              <ContentDescBox>
                {data.content !== '' ? <Markup content={data.content} /> : ''}
              </ContentDescBox>
              <ButtonArea>
                <ClickButton
                  size="md"
                  color="primary"
                  variant="solid"
                  onClick={viewlist}
                >
                  <Typography type="b3" color="atlantic">
                    View list
                  </Typography>
                </ClickButton>
              </ButtonArea>
            </>
          ) : (
            <>
              <EditorBox>
                <TUI
                  htmlStr={data.content as string}
                  setHtmlStr={setContents}
                  autofocus={false}
                />
              </EditorBox>

              <UploadButtonBlock>
                <ClickButton
                  size="md"
                  color="primary"
                  variant="outline"
                  onClick={handleEdit(false)}
                >
                  <Typography type="h6" color="primary700">
                    Cancel
                  </Typography>
                </ClickButton>

                <ClickButton
                  size="md"
                  color="primary"
                  variant="solid"
                  onClick={handleUploadOpenModal(true)}
                  disabled={(data.title === '' || data.content === '') && true}
                >
                  <Typography
                    type="h6"
                    color={
                      data.title === '' || data.content === ''
                        ? 'gray700'
                        : 'atlantic'
=======

                {isEdit && (
                  <InsertBottomArea>
                    <Typography type="p4" color="dgray300">
                      {data.dateCreate !== undefined &&
                        format(
                          new Date(data.dateCreate),
                          'MMM-dd-yyyy h:mm:ss a',
                        )}
                    </Typography>
                  </InsertBottomArea>
                )}
              </>
            )}
          </ContentHeadArea>

          <InsertArea>
            {!isEdit ? (
              <>
                <ContentDescBox>
                  {data.content !== '' ? <Markup content={data.content} /> : ''}
                </ContentDescBox>
                <ButtonArea>
                  <ClickButton
                    size="md"
                    color="primary"
                    variant="solid"
                    onClick={viewlist}
                  >
                    <Typography type="b3" color="atlantic">
                      View list
                    </Typography>
                  </ClickButton>
                </ButtonArea>
              </>
            ) : (
              <>
                <EditorBox>
                  <TUI
                    htmlStr={data.content as string}
                    setHtmlStr={setContents}
                    autofocus={false}
                  />
                </EditorBox>

                <UploadButtonBlock>
                  <ClickButton
                    size="md"
                    color="primary"
                    variant="outline"
                    onClick={handleEdit(false)}
                  >
                    <Typography type="h6" color="primary700">
                      Cancel
                    </Typography>
                  </ClickButton>

                  <ClickButton
                    size="md"
                    color="primary"
                    variant="solid"
                    onClick={handleUploadOpenModal(true)}
                    disabled={
                      (data.title === '' || data.content === '') && true
>>>>>>> Stashed changes
                    }
                  >
                    Edit
                  </Typography>
                </ClickButton>
              </UploadButtonBlock>
            </>
          )}
        </InsertArea>
      </DetailLayout>

      {isOpen && (
        <DeleteModal
          id={id}
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
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const noticeId = query.slug;

  return {
    props: { noticeId },
  };
};

const TUI = dynamic(() => import('../../components/TUI'), {
  ssr: false,
});
export default DetailContent;
