'use client';

import { Grid, Group } from '@mantine/core';
import BaseSelectInput from '../../../../../../components/Input/BaseSelectInput';
import BaseTextInput from '../../../../../../components/Input/BaseTextInput';
import { useForm } from '@mantine/form';
import BaseButton from '../../../../../../components/Button/BaseButton';
import { IconPlus } from 'tabler-icons';
import BaseDateInput from '../../../../../../components/Input/BaseDateInput';
import { useQueryAllMembers } from '../../../../../../services/member/hooks/useQueryAllMembers';
import { useParams } from 'next/navigation';
import BaseMultiSelectInput from '../../../../../../components/Input/BaseMultiSelect';

interface IMilestoneInitialValueParams {
  milestoneName?: string;
  startedDate?: Date;
  endDate?: Date;
  member?: any[];
}

interface IMilestoneFormPropsType {
  initialValues?: IMilestoneInitialValueParams;
  isLoading?: boolean;
  onSubmit: (values: any) => void;
}

const MilestoneForm = ({
  initialValues,
  onSubmit,
  isLoading,
}: IMilestoneFormPropsType) => {
  const members = useQueryAllMembers();
  console.log('loading mile : ', isLoading);

  const form = useForm({
    // validate: yupResolver(schema),
    initialValues: {
      milestoneName: initialValues?.milestoneName || '',
      startedDate: !initialValues?.startedDate
        ? new Date()
        : new Date(initialValues?.startedDate) || '',
      endDate: !initialValues?.endDate
        ? new Date()
        : new Date(initialValues?.endDate!) || '',
      member:
        initialValues?.member?.map((member: any) => {
          return member.id;
        }) || [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Grid gutter={'xl'}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseTextInput
            withAsterisk
            placeholder="Masukkan Nama Milestone"
            label="Nama Milestone"
            {...form.getInputProps('milestoneName')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseMultiSelectInput
            withAsterisk
            label="Assign to Member"
            placeholder="Pilih Member"
            data={members.data?.map((m) => {
              return {
                label: `${m.user.firstname} ${m.user.lastname}`,
                value: m.id,
              };
            })}
            // searchable
            {...form.getInputProps('member')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseDateInput
            label="Tanggal Mulai"
            placeholder="Pilih Tanggal Mulai"
            withAsterisk
            {...form.getInputProps('startedDate')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <BaseDateInput
            label="Tanggal Selesai"
            placeholder="Pilih Tanggal Selesai"
            withAsterisk
            {...form.getInputProps('endDate')}
          />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Group align="right" justify="end">
            <BaseButton
              type="submit"
              loading={isLoading}
              variant="primary"
              leftSection={<IconPlus />}
            >
              {!initialValues ? 'Tambah Milestone' : 'Simpan Perubahan'}
            </BaseButton>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default MilestoneForm;
