import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography } from '@playdapp/ui';
import { Input, Select, FormControl } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Markup } from 'interweave';
import dynamic from 'next/dynamic';
import { useMedia } from 'react-use';

import { deleteNotice, getNoticeDetail, patchSubmit } from 'api/notice';

import useOpenControl from 'hooks/useOpenControl';

import MetaTag from '@/components/MetaTag';
import DeleteModal from '@/components/Modal/DeleteModal';
import UploadModal from '@/components/Modal/UploadModal';
import DetailLayout from '@/components/Layout/DetailLayout';
import Loading from '@/components/Loading';
import Link from 'next/link';

type Prop = {
  noticeId?: number;
  title?: string;
  type?: string | string[];
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

  ${breakpoints.down('lg')} {
    font-size: 14px;
  }
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

  ${breakpoints.down('lg')} {
    display: block;
    margin-top: 8px;
  }
`;

const SelectButtonBlock = styled(FlexMixin)`
  justify-content: flex-end;
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

const CreateDateText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: ${palette.dgray300};
`;

const DetailContent = ({ noticeId }: Props) => {
  const id = Number(noticeId);
  const router = useRouter();
  const isTablet = useMedia('(max-width: 1023px)', true);

  const [isOpen, setIsOpen] = useOpenControl();
  const [isUploadOpen, setUploadOpen] = useOpenControl();

  const [data, setData] = useState<Prop>({
    title: '',
    type: '',
    content: '',
    dateCreate: 0,
  });

  const [titles, setTitles] = useState('');
  const [contents, setContents] = useState('');
  const [selected, setSelected] = useState(data.type);
  const [isValidate, setIsValidate] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const viewlist = () => {
    router.push('/');
  };

  const handleOpenModal = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };

  const handleUploadOpenModal = (isUploadOpen: boolean) => () => {
    if (data.title === '') {
      console.log('??????');
      setIsValidate(true);
      return;
    }
    setUploadOpen(isUploadOpen);
  };

  const handleSubmitEdit = async () => {
    try {
      await patchSubmit({
        id: id,
        title: titles,
        content: contents,
        type: selected as string | undefined,
        expireTime: '2050-10-04 23:50:11',
      }).then((response) => {
        if (response && response.status === 200) {
          handleUploadOpenModal(false);
          setIsValidate(false);
          setIsLoading(false);
          router.push('/');
        }
      });
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNotice({
        id: id,
      }).then((response) => {
        if (response && response.status === 200) {
          // toast.success("z")
          router.push('/');
        }
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
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
          setIsLoading(false);
          return req;
        }
      });
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }, [id]);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  useEffect(() => {
    return () => {
      setIsLoading(true);
      setIsError(false);
    };
  }, []);

  return (
    <>
      <MetaTag title="Notice | Detial Page" />

      {!isLoading && (
        <DetailLayout>
          <ContentHeadArea>
            {data && data !== undefined && (
              <>
                <TitleBlock>
                  <Typography type={isTablet ? 'h6' : 'h5'} color="black">
                    {data.title}
                  </Typography>

                  <BeforeEditTitle>
                    <CreateDateText>
                      {data.dateCreate !== undefined &&
                        format(
                          new Date(data.dateCreate),
                          'MMM-dd-yyyy h:mm:ss a',
                        )}
                    </CreateDateText>

                    <SelectButtonBlock>
                      <Link href={`/edit/${id}`}>
                        <EditButton
                          size={isTablet ? 'xs' : 'sm'}
                          color="primary"
                          variant="outline"
                          // onClick={handleEdit(true)}
                        >
                          <Typography
                            type={isTablet ? 'b5' : 'b3'}
                            color="primary700"
                          >
                            Edit
                          </Typography>
                        </EditButton>
                      </Link>

                      <EditButton
                        size={isTablet ? 'xs' : 'sm'}
                        color="primary"
                        variant="solid"
                        onClick={handleOpenModal(true)}
                      >
                        <Typography
                          type={isTablet ? 'b5' : 'b3'}
                          color="atlantic"
                        >
                          Delete
                        </Typography>
                      </EditButton>
                    </SelectButtonBlock>
                  </BeforeEditTitle>
                </TitleBlock>
              </>
            )}
          </ContentHeadArea>

          <InsertArea>
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
          </InsertArea>
        </DetailLayout>
      )}

      {isLoading && <Loading />}

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
          isValidate={isValidate}
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
