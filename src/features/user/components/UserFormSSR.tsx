'use client';

import { Grid, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import BaseButton from '../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import { useParams } from 'next/navigation';
import BaseTextInput from '../../../components/Input/BaseTextInput';
import BaseSelectInput from '../../../components/Input/BaseSelectInput';
import useCreateUser from '../../../services/user/hooks/useCreateUser';
import BasePasswordInput from '../../../components/Input/BasePasswordInput';
import useUpdateUser from '../../../services/user/hooks/useUpdateUser';
import { useEffect } from 'react';

interface IDetailUserParams {
  email?: string;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}

export interface IUserFormValuesParams {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: string;
}

interface IUserFormPropsType {
  initialValues?: IDetailUserParams;
  isLoading?: boolean;
  onSubmit?: (values: IUserFormValuesParams) => void;
}

const UserFormSSR = ({ initialValues, onSubmit }: IUserFormPropsType) => {
  const params = useParams<{ user_id: string }>();

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const form = useForm({
    initialValues: {
      username: initialValues?.username || '',
      email: initialValues?.email || '',
      password: initialValues?.password || '',
      firstname: initialValues?.firstname || '',
      lastname: initialValues?.lastname || '',
      role: initialValues?.role || '',
    },
  });

  const handleSubmitForm = form.onSubmit((values: IUserFormValuesParams) => {
    const createPayload = {
      username: values.username,
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      role: values.role,
    };

    const updatePayload = {
      username: values.username,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      role: values.role,
    };

    if (!initialValues) {
      createUser.mutate(createPayload);
    } else if (!!initialValues) {
      updateUser.mutate({ userId: params.user_id, payload: updatePayload });
    }
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <Grid gutter={'xl'}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Username"
            label="Username"
            {...form.getInputProps('username')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Email User"
            label="Email"
            {...form.getInputProps('email')}
          />
        </Grid.Col>

        {!initialValues ? (
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <BasePasswordInput {...form.getInputProps('password')} />
          </Grid.Col>
        ) : null}

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Nama Depan"
            label="Nama Depan"
            {...form.getInputProps('firstname')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Nama Belakang"
            label="Nama Belakang"
            {...form.getInputProps('lastname')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseSelectInput
            label="Roles"
            placeholder="Pilih Role"
            data={[
              { label: 'Staff', value: 'STAFF' },
              { label: 'Project Manager', value: 'PROJECT_MANAGER' },
            ]}
            {...form.getInputProps('role')}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group align="left">
            <BaseButton
              type="submit"
              //   loading={isPending}
              variant="primary"
              leftSection={<IconPlus />}
            >
              {!params.user_id ? 'Tambah User' : 'Simpan Perubahan'}
            </BaseButton>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default UserFormSSR;
