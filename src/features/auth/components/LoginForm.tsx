'use client';

import { Stack, Button, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import BaseTextInput from '../../../components/Input/BaseTextInput';
import { MdOutlineEmail } from 'react-icons/md';
import { HiOutlineKey } from 'react-icons/hi2';
import { COLORS } from '../../../constant/colors';
import BasePasswordInput from '../../../components/Input/BasePasswordInput';
import { LoginSchema } from '../helpers/loginform.helper';

interface ILoginFormPropsType {
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: ILoginFormPropsType) => {
  const form = useForm({
    validate: zodResolver(LoginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Stack h={'100%'} gap={'40px'}>
        <Text fz={'1.25rem'} fw={700} ta="center">
          Login
        </Text>
        <Stack w={'100%'}>
          <BaseTextInput
            label="Email"
            placeholder="Masukkan Email"
            {...form.getInputProps('email')}
            leftSection={<MdOutlineEmail className="text-lg" />}
          />
          <BasePasswordInput
            label="Password"
            placeholder="Masukkan Password"
            leftSection={<HiOutlineKey className="text-lg" />}
            {...form.getInputProps('password')}
          />
        </Stack>

        <Button
          radius={'md'}
          w={'100%'}
          type="submit"
          bg={COLORS.primary}
          fullWidth
          loading={isLoading}
          className="text-base h-[45px]"
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
