import { Button, Group, Modal, ModalProps, Stack, Text } from '@mantine/core';
import { ICAlert } from '../../../assets/icons/alert_delete.icon';
import { IconX } from 'tabler-icons';
import { COLORS } from '../../../constant/colors';

interface IModalDeletePropsType extends ModalProps {
  handleCloseBtn: () => void;
  handleDeleteConfirmation: () => void;
  title: string;
  description?: string;
}

const ModalDelete = ({
  handleCloseBtn,
  handleDeleteConfirmation,
  title,
  description,
  ...props
}: IModalDeletePropsType) => {
  return (
    <Modal
      withCloseButton={false}
      overlayProps={{
        // color:
        //   theme.colorScheme === 'dark'
        //     ? theme.colors.dark[9]
        //     : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      ff={'poppins'}
      radius={'lg'}
      classNames={{
        body: `p-5`,
      }}
      className="p-5"
      {...props}
    >
      <Group justify="space-between">
        <Stack gap={0}>
          <Group>
            <ICAlert width={30} height={30} />
            <Text className="text-xl font-semibold">Hapus Data {title}?</Text>
          </Group>
          <Text className="text-sm text-gray-400 mt-2.5">
            {!description
              ? 'Data yang telah dihapus tidak dapat dikembalikan'
              : description}
          </Text>
        </Stack>

        <IconX
          className="text-neutral-400 hover:text-black cursor-pointer "
          onClick={handleCloseBtn}
        />
      </Group>

      <Group mt={20}>
        <Button
          variant=""
          onClick={handleDeleteConfirmation}
          w={'48%'}
          // loading={isLoading}
          radius={'md'}
          c={'white'}
          bg={COLORS.danger}
          // disabled={disableNoButton}
        >
          Hapus
        </Button>
        <Button
          // loading={isLoading}
          onClick={handleCloseBtn}
          variant="outline"
          w={'48%'}
          radius={'md'}
          c={'red'}
          color="red"
        >
          Batal
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalDelete;
