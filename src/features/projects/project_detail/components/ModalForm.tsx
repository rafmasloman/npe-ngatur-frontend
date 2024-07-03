import { Box, Button, Group, Modal, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import BaseButton from '../../../../components/Button/BaseButton';

interface IModalFormProps {
  title: string;
  btnText: string;
  children: React.ReactNode;
  disable?: boolean;
}

const ModalForm = ({ title, children, btnText, disable }: IModalFormProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleConfirmation = () => {
    open();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        radius={'lg'}
        padding={25}
        size={'md'}
        // overlayProps={{
        //   color:
        //     theme.colorScheme === 'dark'
        //       ? theme.colors.dark[9]
        //       : theme.colors.gray[2],
        //   opacity: 0.55,
        //   blur: 3,
        // }}
        classNames={{
          body: `font-poppins`,
          title: `w-full text-center text-lg font-semibold`,
        }}
      >
        {children}
      </Modal>

      <Group>
        <BaseButton
          onClick={handleConfirmation}
          leftSection={<IconPlus />}
          variant={'primary'}
          disabled={disable}
        >
          {btnText}
        </BaseButton>
      </Group>
    </>
  );
};

export default ModalForm;
