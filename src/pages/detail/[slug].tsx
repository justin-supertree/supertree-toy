import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography, Modal } from '@playdapp/ui';
import { format } from 'date-fns';

import useOpenControl from 'hooks/useOpenControl';

import WriteLayout from '@/components/Layout/WriteLayout';
import DeleteModal from '@/components/Modal/DeleteModal';
import MetaTag from '@/components/MetaTag';

const FlexMixin = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContentHeadArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${palette.gray400};
`;

const InsertArea = styled.div`
  width: 100%;
  text-align: left;

  /* ${breakpoints.down('md')} {
  } */
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

  &.title {
    max-width: 75%;
  }
`;

const EditButton = styled(Button)`
  align-items: flex-end;
  margin: 0 4px;
`;

const ImageArea = styled.div`
  width: 120px;
  height: 106.69px;
  border: 1px solid;
  margin: auto;
  margin-bottom: 32px;
`;

const ModalTextBlock = styled.div`
  display: block;
  text-align: center;
`;

const TextArea = styled.div`
  margin-bottom: 12px;
`;

const ModalButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  text-align: center;
`;

type Prop = {
  noticeId?: number;
  title?: string;
  type?: string;
  content?: string;
  dateCreate?: string;
};

type Props = {
  noticeId?: number;
};

const DetailContent = ({ noticeId }: Props) => {
  const apihost =
    'http://marketplace-test-1.ap-northeast-2.elasticbeanstalk.com';
  const id = Number(noticeId);
  console.log(id);
  const router = useRouter();
  const [data, setData] = useState<Prop>({});
  const [isEdit, setIsEdit] = useOpenControl();
  const [isOpen, setIsOpen] = useOpenControl();
  const [isRemove, setIsRemove] = useState(0);

  const handleOpenModal = (isOpen: boolean) => () => {
    setIsOpen(isOpen);
  };

  const viewlist = () => {
    alert('cancel write contents!!');
    router.push('/');
  };

  const handleDelete = (isDelete: boolean) => () => {
    if (isDelete) {
      axios.delete(`/notice/${id}`).then((response) => {
        try {
          console.log('hi im delete methods', id);
          if (response && response.status === 200) {
            const result = response.status;
            setIsRemove(result);
            router.push('/');
            return isRemove;
          }
        } catch (error) {
          console.log('error', error);
        }
      });
    }
  };

  useEffect(() => {
    axios.get(`${apihost}/notice/detail/${id}`).then((response) => {
      try {
        if (response && response.status === 200) {
          const req = response.data.data.list;
          req.map((data: { noticeId: number }) => {
            if (data.noticeId == id) {
              setData(data);
            }
          });

          return req;
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [id]);

  return (
    <>
      <MetaTag title="Notice Detial Page" />
      <WriteLayout>
        <ContentHeadArea>
          {data && data !== undefined && (
            <>
              <TitleBlock className="title">
                <Typography type="h5" color="black">
                  {data.title}
                </Typography>

                <div>
                  <Typography type="p4" color="dgray300">
                    {data.dateCreate}
                  </Typography>
                </div>
              </TitleBlock>

              <TitleBlock>
                <EditButton size="sm" color="primary" variant="outline">
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
              </TitleBlock>
            </>
          )}
        </ContentHeadArea>

        {isOpen && (
          <Modal
            isOpen={isOpen}
            handleOpen={handleOpenModal(false)}
            shouldCloseOnOverlayClick
          >
            <ModalTextBlock>
              <ImageArea />

              <TextArea>
                <Typography type="h4" color="atlantic">
                  Are you sure you want to delete the post?
                </Typography>
              </TextArea>

              <TextArea>
                <Typography type="b3" color="gray900">
                  Deleted posts will not be recovered.
                </Typography>
              </TextArea>
            </ModalTextBlock>

            <ModalButtonBlock>
              <ClickButton
                size="sm"
                color="primary"
                variant="outline"
                onClick={handleOpenModal(false)}
              >
                <Typography type="b3" color="primary700">
                  Cancel
                </Typography>
              </ClickButton>

              <ClickButton
                size="sm"
                color="primary"
                variant="solid"
                onClick={handleDelete(true)}
              >
                <Typography type="b3" color="atlantic">
                  Delete
                </Typography>
              </ClickButton>
            </ModalButtonBlock>
          </Modal>
        )}

        <InsertArea>
          <ContentDescBox>{data.content}</ContentDescBox>

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
        </InsertArea>
      </WriteLayout>
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
