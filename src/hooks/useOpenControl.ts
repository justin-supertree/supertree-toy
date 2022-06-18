import { useCallback, useState } from 'react';

type ReturnValue = [boolean, (openstate: boolean) => void, () => void];

const useOpenControl = (): ReturnValue => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((openState: boolean) => {
    setIsOpen(openState);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, handleOpen, handleClose];
};

export default useOpenControl;
