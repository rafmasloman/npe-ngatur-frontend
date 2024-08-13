'use client';

import { Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import BaseButton from '../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import BaseTextInput from '../../../components/Input/BaseTextInput';
import BaseSelectInput from '../../../components/Input/BaseSelectInput';
import useUserOption from '../hooks/useUserOption';
import { useEffect, useState } from 'react';
import { useGetUserNonMember } from '../hooks/useGetUserNonMember';
import useQueryAllUsers from '../../../services/user/hooks/useQueryAllUsers';
import { useParams } from 'next/navigation';

interface IDetailMemberParams {
  position?: string;
  phoneNumber?: string;
  gender?: string;
  birthDate?: Date;
  userId?: string;
  user?: {
    firstname?: string;
    lastname?: string;
  };
}

export interface IMemberFormValuesParams {
  position: string;
  phoneNumber: string;
  gender: string;
  birthDate: Date;
  userId: string;
}

interface IMemberFormPropsType {
  initialValues?: IDetailMemberParams;
  isLoading?: boolean;
  options?: any;
  onSubmit: (values: any) => void;
}

const MemberForm = ({
  initialValues,
  options,
  onSubmit,
  isLoading,
}: IMemberFormPropsType) => {
  const params = useParams<{ member_id: string }>();
  const userSelectOption = useGetUserNonMember();
  const users = useQueryAllUsers();

  const form = useForm({
    initialValues: {
      position: initialValues?.position || '',
      birthDate: initialValues?.birthDate || new Date(),
      gender: initialValues?.gender || '',
      phoneNumber: initialValues?.phoneNumber || '',
      userId: initialValues?.userId || '',
    },
  });

  // useEffect(() => {
  //   if (options) {
  //     const userSelectOptions = options.map((op: any) => op);

  //     setUserOptions([
  //       {
  //         label: `${initialValues?.user?.firstname}`,
  //         value: initialValues?.userId,
  //       },
  //       ...userSelectOptions,
  //     ]);
  //   }
  // }, [options, initialValues]);

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Grid gutter={'xl'}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseSelectInput
            label="User"
            placeholder="Pilih User"
            data={
              !params
                ? userSelectOption.data
                : users.data?.map((user) => {
                    return {
                      label: `${user.firstname} ${user.lastname}`,
                      value: user.id,
                    };
                  })
            }
            // data={[
            //   { label: 'Laki-laki', value: 'laki-laki' },
            //   { label: 'Perempuan', value: 'perempuan' },
            // ]}
            searchable
            // disabled={!options.userOptions.data}
            {...form.getInputProps('userId')}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Posisi Member"
            label="Jobdesk / Posisi"
            {...form.getInputProps('position')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseSelectInput
            withAsterisk
            label="Jenis Kelamin"
            placeholder="Pilih Jenis Kelamin"
            data={[
              { label: 'Laki-laki', value: 'laki-laki' },
              { label: 'Perempuan', value: 'perempuan' },
            ]}
            searchable
            {...form.getInputProps('gender')}
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

        {/* <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseSelectInput
            label="Roles"
            placeholder="Pilih Role"
            data={[
              { label: 'Staff', value: 'STAFF' },
              { label: 'Project Manager', value: 'PROJECT_MANAGER' },
            ]}
            {...form.getInputProps('role')}
          />
        </Grid.Col> */}

        <Grid.Col span={12} mt={30}>
          <Group align="left">
            <BaseButton
              type="submit"
              loading={isLoading}
              variant="primary"
              leftSection={<IconPlus />}
            >
              {!initialValues ? 'Tambah Member' : 'Simpan Perubahan'}
            </BaseButton>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default MemberForm;
