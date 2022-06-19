import { breakpoints, palette, Button, Typography, Modal } from '@playdapp/ui';
import styled from '@emotion/styled';

type Props = {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => () => void;
};

const ClickButton = styled(Button)`
  width: 100%;
  max-width: 240px;
  margin: 0 4px;
  color: #ffff;
`;

const DeleteModal = ({ isOpen, handleOpen }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      handleOpen={handleOpen(false)}
      shouldCloseOnOverlayClick
    >
      <Typography type="b3" color="atlantic">
        DeleteModal
      </Typography>

      <ClickButton size="sm" color="primary" variant="solid">
        <Typography type="b3" color="atlantic">
          View list
        </Typography>
      </ClickButton>
    </Modal>
  );
};

export default DeleteModal;
