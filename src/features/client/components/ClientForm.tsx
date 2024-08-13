'use client';

import { Grid, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import BaseButton from '../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import BaseTextInput from '../../../components/Input/BaseTextInput';
import BaseSelectInput from '../../../components/Input/BaseSelectInput';
import { useEffect, useState } from 'react';

interface IDetailClientParams {
  name?: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  project?: {
    id?: string;
  };
}

export interface IClientValuesParams {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
}

interface IClientPropsType {
  initialValues?: IDetailClientParams;
  isLoading?: boolean;
  options?: any;
  onSubmit: (values: any) => void;
}

const ClientForm = ({
  initialValues,
  options,
  onSubmit,
  isLoading,
}: IClientPropsType) => {
  const form = useForm({
    initialValues: {
      name: initialValues?.name || '',
      phoneNumber: initialValues?.phoneNumber || '',
      address: initialValues?.address || '',
      email: initialValues?.email || '',
      // project: initialValues?.project?.id || '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Grid gutter={'xl'}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Nama"
            label="Nama Client"
            {...form.getInputProps('name')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Email"
            label="Email Client"
            {...form.getInputProps('email')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="0812....."
            label="No.Telp"
            type="number"
            {...form.getInputProps('phoneNumber')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Alamat"
            label="Alamat"
            {...form.getInputProps('address')}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group align="left">
            <BaseButton
              type="submit"
              loading={isLoading}
              variant="primary"
              leftSection={<IconPlus />}
            >
              {!initialValues ? 'Tambah Client' : 'Simpan Perubahan'}
            </BaseButton>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ClientForm;
