import { breakpoints, palette, Button, Typography, Modal } from '@playdapp/ui';

type Props = {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => () => void;
};

const DeleteModal = ({ isOpen, handleOpen }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      handleOpen={handleOpen(false)}
      shouldCloseOnOverlayClick
    >
      DeleteModal
    </Modal>
  );
};

export default DeleteModal;
