import { Group, SimpleGrid, Stack } from '@mantine/core';
import BaseTextInput from '../../../../../components/Input/BaseTextInput';
import BaseDateInput from '../../../../../components/Input/BaseDateInput';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import BaseButton from '../../../../../components/Button/BaseButton';
import { BsCalendar2Date } from 'react-icons/bs';
import { useForm } from '@mantine/form';

interface IProfileFormProps {
  initialValues?: IProfileDetailValue;
  onSubmit: (values: any) => void;
}

export interface IProfileDetailValue {
  id?: string;
  userId?: string;
  firstname?: string;
  lastname?: string;
  birthDate?: string;
  phoneNumber?: string;
  profilePicture?: string;
  gender?: string;
  position?: string;
}

const ProfileForm = ({ initialValues, onSubmit }: IProfileFormProps) => {
  const form = useForm({
    initialValues: {
      firstname: initialValues?.firstname || '',
      lastname: initialValues?.lastname || '',
      birthDate: new Date(initialValues?.birthDate!) || '',
      phoneNumber: initialValues?.phoneNumber || '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 20, sm: 30, md: 40 }}
      >
        <Stack gap={5}>
          <BaseTextInput
            label="Nama Depan"
            {...form.getInputProps('firstname')}
          />
        </Stack>

        <Stack gap={5}>
          <BaseTextInput
            label="Nama Belakang"
            {...form.getInputProps('lastname')}
          />
        </Stack>

        <Stack gap={5}>
          <BaseDateInput
            rightSection={<BsCalendar2Date className="text-neutral-500" />}
            label="Tanggal Lahir"
            {...form.getInputProps('birthDate')}
          />
        </Stack>

        <Stack gap={5}>
          <BaseTextInput
            label="Nomor Telepon"
            type="number"
            rightSection={
              <HiOutlineDevicePhoneMobile className="text-neutral-500" />
            }
            {...form.getInputProps('phoneNumber')}
          />
        </Stack>

        <Group>
          <BaseButton variant="primary" type="submit">
            Simpan Perubahan
          </BaseButton>
        </Group>
      </SimpleGrid>
    </form>
  );
};

export default ProfileForm;
