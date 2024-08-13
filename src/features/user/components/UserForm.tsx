'use client';

import {
  ActionIcon,
  Checkbox,
  Grid,
  Group,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import BaseButton from '../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import { useParams } from 'next/navigation';
import BaseTextInput from '../../../components/Input/BaseTextInput';
import BaseSelectInput from '../../../components/Input/BaseSelectInput';
import useCreateUser from '../../../services/user/hooks/useCreateUser';
import BasePasswordInput from '../../../components/Input/BasePasswordInput';
import useUpdateUser from '../../../services/user/hooks/useUpdateUser';
import { useEffect, useState } from 'react';
import { GoKey } from 'react-icons/go';
import { UserSchema } from '../helper/user.schema';

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
  newPassword?: string;
}

interface IUserFormPropsType {
  initialValues?: IDetailUserParams;
  isLoading?: boolean;
  onSubmit: (values: IUserFormValuesParams) => void;
}

const UserForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: IUserFormPropsType) => {
  const [checkNewPassword, setCheckNewPassword] = useState(false);

  const form = useForm({
    validate: zodResolver(UserSchema),
    initialValues: {
      username: initialValues?.username || '',
      email: initialValues?.email || '',
      password: initialValues?.password || '',
      firstname: initialValues?.firstname || '',
      lastname: initialValues?.lastname || '',
      role: initialValues?.role || '',
      newPassword: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
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

        {!initialValues ? (
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <BasePasswordInput
              label="Password"
              withAsterisk
              placeholder="Masukkan Password"
              {...form.getInputProps('password')}
            />
          </Grid.Col>
        ) : (
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <BasePasswordInput
              disabled={!checkNewPassword}
              // withAsterisk
              label={
                <Group className="w-full">
                  <Checkbox
                    label={
                      checkNewPassword
                        ? 'Password Baru'
                        : 'Centang jika ingin ganti password'
                    }
                    classNames={{ label: `text-xs` }}
                    size="xs"
                    checked={checkNewPassword}
                    onChange={(e) =>
                      setCheckNewPassword(e.currentTarget.checked)
                    }
                  />
                </Group>
              }
              placeholder="Masukkan Password Baru"
              // withAsterisk
              {...form.getInputProps('new_password')}
            />

            {/* <Group className="h-full" align="end">
              <ActionIcon
                size={'input-sm'}
                variant="light"
                color="indigo"
                radius={'md'}
                classNames={{ root: `w-fit` }}
              >
                <Group className="p-4">
                  <Text>Ganti Password</Text>
                  <GoKey />
                </Group>
              </ActionIcon>
            </Group> */}
          </Grid.Col>
        )}

        <Grid.Col span={12} mt={30}>
          <Group align="left">
            <BaseButton
              type="submit"
              loading={isLoading}
              variant="primary"
              leftSection={<IconPlus />}
            >
              {!initialValues ? 'Tambah User' : 'Simpan Perubahan'}
            </BaseButton>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default UserForm;
