import styled from '@emotion/styled';
import { Button, Typography, Modal } from '@playdapp/ui';

type Props = {
  isUploadOpen: boolean;
  isValidate: boolean;
  handleUploadOpenModal: (isUploadOpen: boolean) => () => void;
  handleSubmit: () => void;
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
  isValidate,
  handleUploadOpenModal,
  handleSubmit,
}: Props) => {
  return (
    <Modal
      isOpen={isUploadOpen}
      handleOpen={handleUploadOpenModal(false)}
      shouldCloseOnOverlayClick
    >
      <ModalTextBlock>
        {!isValidate ? (
          <>
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
          </>
        ) : (
          <TextArea>
            <Typography type="h4" color="atlantic">
              You&apos;ve got wrong edit information.
            </Typography>

            <TextArea>
              <Typography type="b3" color="gray900">
                Please check again!
              </Typography>
            </TextArea>
          </TextArea>
        )}
      </ModalTextBlock>

      <ModalButtonBlock>
        <ClickButton
          size="sm"
          color="primary"
          variant="outline"
          onClick={handleUploadOpenModal(false)}
        >
          <Typography type="b3" color="primary700">
            Cancle
          </Typography>
        </ClickButton>

        {!isValidate && (
          <ClickButton
            size="sm"
            color="primary"
            variant="solid"
            onClick={handleSubmit}
          >
            <Typography type="b3" color="atlantic">
              OK!
            </Typography>
          </ClickButton>
        )}
      </ModalButtonBlock>
    </Modal>
  );
};

export default UploadModal;
