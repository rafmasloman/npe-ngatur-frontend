import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export const useConfirmationModal = () => {
  const [itemId, setItemId] = useState('');

  const [opened, { close, open }] = useDisclosure(false);

  const handleConfirm = (itemId: string) => {
    setItemId(itemId);

    open();
  };

  return { itemId, opened, close, open, handleConfirm };
};
