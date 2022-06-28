import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';
import { Input, Select, Textarea } from '@chakra-ui/react';
import { format } from 'date-fns';

import { deleteNotice, getNoticeDetail, patchSubmit } from 'api/notice';

import useOpenControl from 'hooks/useOpenControl';

import MetaTag from '@/components/MetaTag';
import DeleteModal from '@/components/Modal/DeleteModal';
import UploadModal from '@/components/Modal/UploadModal';
import MainLayout from '@/components/Layout/MainLayout';
import DetailLayout from '@/components/Layout/DetailLayout';

type Prop = {
  noticeId?: number;
  title?: string;
  type?: string;
  content: string;
  dateCreate?: string;
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
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray400};
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
`;

const TitleBlock = styled.div`
  text-align: left;
  height: 100%;
  max-width: 100%;
`;

const BeforeEditTitle = styled(FlexMixin)`
  justify-content: space-between;

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

const InsertItem = styled(FlexMixin)<{ type: string }>`
  min-width: 5rem;
  text-align: left;
  white-space: nowrap;
`;

const ContentTitleInput = styled(Input)`
  min-height: 3rem;
  margin: 0;
`;

const ContentInputBox = styled(Textarea)`
  width: 100%;
  min-height: 392px;
  margin-top: 1rem;
`;

const InsertBottomArea = styled(FlexMixin)`
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;

  ${breakpoints.down('md')} {
    display: block;
  }
`;

const UploadEditBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const DetailContent = ({ noticeId }: Props) => {
  const id = Number(noticeId);
  const router = useRouter();

  const [isOpen, setIsOpen] = useOpenControl();
  const [isUploadOpen, setUploadOpen] = useOpenControl();

  const [data, setData] = useState<Prop>(Object);
  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selected, setSelected] = useState('');

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

    if (isEdit === false) {
      setTitle('');
      setContent('');
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmitEdit = async () => {
    try {
      await patchSubmit({
        id: id,
        title: title,
        content: content,
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

  return (
    <>
      <MetaTag title="Notice | Detial Page" />

      <DetailLayout>
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

                      <UploadEditBlock>
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
                      </UploadEditBlock>
                    </BeforeEditTitle>
                  </>
                ) : (
                  <>
                    <Typography type="b4" color="gray900">
                      Title :
                    </Typography>

                    <InsertItem type="title">
                      <ContentTitleInput
                        value={title}
                        onChange={handleTitle}
                        size="lg"
                        width="100%"
                      />
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
              </TitleBlock>

              <TitleBlock>
                {isEdit && (
                  <>
                    <InsertBottomArea>
                      <Typography type="p4" color="dgray300">
                        {data.dateCreate !== undefined &&
                          format(
                            new Date(data.dateCreate),
                            'MMM-dd-yyyy h:mm:ss a',
                          )}
                      </Typography>

                      <UploadEditBlock>
                        <EditButton
                          size="sm"
                          color="primary"
                          variant="outline"
                          onClick={handleUploadOpenModal(true)}
                          disabled={(title === '' || content === '') && true}
                        >
                          <Typography
                            type="h6"
                            color={
                              title === '' || content === ''
                                ? 'gray700'
                                : 'primary700'
                            }
                          >
                            Upload
                          </Typography>
                        </EditButton>

                        <EditButton
                          size="sm"
                          color="primary"
                          variant="outline"
                          onClick={handleEdit(false)}
                        >
                          <Typography type="h6" color="primary700">
                            Cancel
                          </Typography>
                        </EditButton>
                      </UploadEditBlock>
                    </InsertBottomArea>
                  </>
                )}
              </TitleBlock>
            </>
          )}
        </ContentHeadArea>

        <InsertArea>
          {!isEdit ? (
            <>
              <ContentDescBox>
                <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
              </ContentDescBox>
              <ButtonArea>
                <ClickButton
                  size="sm"
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
            <ContentInputBox
              type="text"
              value={content}
              onChange={handleContent}
            />
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

export default DetailContent;
