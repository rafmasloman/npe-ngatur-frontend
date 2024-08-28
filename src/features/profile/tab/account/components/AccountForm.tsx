import { Group, SimpleGrid, Stack } from '@mantine/core';
import BaseTextInput from '../../../../../components/Input/BaseTextInput';
import BaseButton from '../../../../../components/Button/BaseButton';
import { useForm, zodResolver } from '@mantine/form';
import BasePasswordInput from '../../../../../components/Input/BasePasswordInput';
import { UserProfileAccountSchema } from '../helpers/account.schema';

interface IAccountFormProps {
  initialValues?: IUserAuthDetailValue;
  onSubmit: (values: any) => void;
}

export interface IUserAuthDetailValue {
  email?: string;
  password?: string;
}

const AccountForm = ({ initialValues, onSubmit }: IAccountFormProps) => {
  const form = useForm({
    validate: zodResolver(UserProfileAccountSchema),
    initialValues: {
      email: initialValues?.email || '',
      password: initialValues?.password || '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 20, sm: 30, md: 40 }}
      >
        <Stack gap={5}>
          <BaseTextInput label="Email" {...form.getInputProps('email')} />
        </Stack>

        <Stack gap={5}>
          <BasePasswordInput
            label="Password"
            {...form.getInputProps('password')}
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

export default AccountForm;
