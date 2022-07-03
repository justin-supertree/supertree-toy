import NextImage from 'next/image';
import styled from '@emotion/styled';
import { Button, Typography, Modal } from '@playdapp/ui';

import Error from '../../../public/assets/icons/error.png';

const ClickButton = styled(Button)`
  width: 100%;
  max-width: 240px;
  margin: 0 4px;
  color: #ffff;
`;

const ImageArea = styled.div`
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

type Props = {
  id: number;
  isOpen: boolean;
  handleOpenModal: (isOpen: boolean) => () => void;
  handleDelete: () => void;
};

const DeleteModal = ({ isOpen, handleOpenModal, handleDelete }: Props) => (
  <Modal
    isOpen={isOpen}
    handleOpen={handleOpenModal(false)}
    shouldCloseOnOverlayClick
  >
    <ModalTextBlock>
      <ImageArea>
        <NextImage
          src={Error}
          width={120}
          height={120}
          layout="fixed"
          alt="PlayDapp"
        />
      </ImageArea>

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
        onClick={handleDelete}
      >
        <Typography type="b3" color="atlantic">
          Delete
        </Typography>
      </ClickButton>
    </ModalButtonBlock>
  </Modal>
);

export default DeleteModal;
