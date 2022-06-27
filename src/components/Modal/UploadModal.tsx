import styled from '@emotion/styled';
import { breakpoints, palette, Button, Typography, Modal } from '@playdapp/ui';

type Props = {
  isUploadOpen: boolean;
  handleUploadOpenModal: (isUploadOpen: boolean) => () => void;
  handleSubmitEdit: () => void;
};

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

const ClickButton = styled(Button)`
  width: 100%;
  max-width: 240px;
  margin: 0 4px;
  color: #ffff;
`;

const UploadModal = ({
  isUploadOpen,
  handleUploadOpenModal,
  handleSubmitEdit,
}: Props) => (
  <Modal
    isOpen={isUploadOpen}
    handleOpen={handleUploadOpenModal(false)}
    shouldCloseOnOverlayClick
  >
    <ModalTextBlock>
      <TextArea>
        <Typography type="h4" color="atlantic">
          Are you sure you want to Edit the post?
        </Typography>
      </TextArea>

      <TextArea>
        <Typography type="b3" color="gray900">
          You can Change again, if you wont!
        </Typography>
      </TextArea>
    </ModalTextBlock>

    <ModalButtonBlock>
      <ClickButton
        size="sm"
        color="primary"
        variant="outline"
        onClick={handleSubmitEdit}
      >
        <Typography type="b3" color="primary700">
          Edit
        </Typography>
      </ClickButton>

      <ClickButton
        size="sm"
        color="primary"
        variant="solid"
        onClick={handleUploadOpenModal(false)}
      >
        <Typography type="b3" color="atlantic">
          Cancle
        </Typography>
      </ClickButton>
    </ModalButtonBlock>
  </Modal>
);

export default UploadModal;
